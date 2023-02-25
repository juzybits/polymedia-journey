import {
    devnetConnection,
    JsonRpcProvider,
    SignableTransaction,
    SuiAddress,
    TransactionEffects,
} from '@mysten/sui.js';

const RPC_DEVNET = new JsonRpcProvider(devnetConnection);
export const POLYMEDIA_JOURNEY_PACKAGE_ID_DEVNET = '0x4671ac9d29e51d88bfbde2cd763c350acbd8e9b2';

const RPC_TESTNET = new JsonRpcProvider(devnetConnection);
export const POLYMEDIA_JOURNEY_PACKAGE_ID_TESTNET = '0x123';

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
