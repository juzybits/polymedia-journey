import {
    Connection,
    JsonRpcProvider,
    SignableTransaction,
    SuiAddress,
    TransactionEffects,
} from '@mysten/sui.js';

export const POLYMEDIA_JOURNEY_PACKAGE_ID_DEVNET = '0x407c2685b33cf3fdfa129bbb6e44733d09e3f973';
export const POLYMEDIA_JOURNEY_PACKAGE_ID_TESTNET = '0x123';

const RPC_DEVNET = new JsonRpcProvider(new Connection({
  fullnode: 'https://node.shinami.com/api/v1/186668da9c42b69678719e785ed644a2',
  // fullnode: 'https://fullnode.devnet.sui.io:443/',
  faucet: 'https://faucet.devnet.sui.io/gas',
}));

const RPC_TESTNET = new JsonRpcProvider(new Connection({
  // fullnode: '...',
  fullnode: 'https://fullnode.testnet.sui.io:443/',
  faucet: 'https://faucet.testnet.sui.io/gas',
}));

export function getRpcProvider(network: string): JsonRpcProvider {
    if (network === 'devnet') {
        return RPC_DEVNET;
    } else if (network === 'testnet') {
        return RPC_TESTNET;
    } else {
        throw new Error('Network not recognized: ' + network);
    }
}

function getJourneyPackageId(network: string): string {
    if (network === 'devnet') {
        return POLYMEDIA_JOURNEY_PACKAGE_ID_DEVNET;
    } else if (network === 'testnet') {
        return POLYMEDIA_JOURNEY_PACKAGE_ID_TESTNET;
    } else {
        throw new Error('Network not recognized: ' + network);
    }
}

export async function createQuest({
    signAndExecuteTransaction,
    network,
    profileId,
    name,
    url,
} : {
    signAndExecuteTransaction: (transaction: SignableTransaction) => Promise<any>,
    network: string,
    profileId: SuiAddress,
    name: string,
    url: string,
}): Promise<any>
{
    const packageId = getJourneyPackageId(network);
    const resp = await signAndExecuteTransaction({
        kind: 'moveCall',
        data: {
            packageObjectId: packageId,
            module: 'journey',
            function: 'save_quest',
            typeArguments: [],
            arguments: [
                profileId,
                name,
                url,
            ],
            gasBudget: 10000,
        }
    });

    // Verify the transaction results
    //                  Sui/Ethos || Suiet
    const effects = (resp.effects || resp.EffectsCert?.effects?.effects) as TransactionEffects;
    if (effects.status.status !== 'success') {
        throw new Error(effects.status.error);
    }
    return resp;
}
