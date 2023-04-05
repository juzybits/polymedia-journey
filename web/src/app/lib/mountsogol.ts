import {
    Connection,
    JsonRpcProvider,
    SuiAddress,
    TransactionBlock,
    TransactionEffects,
} from '@mysten/sui.js';
import { RPC_CONFIG } from '@polymedia/webutils';

export const POLYMEDIA_JOURNEY_PACKAGE_ID_DEVNET = '0x407c2685b33cf3fdfa129bbb6e44733d09e3f973';
export const POLYMEDIA_JOURNEY_PACKAGE_ID_TESTNET = '0x123';

const RPC_LOCALNET = new JsonRpcProvider(new Connection({
    fullnode: RPC_CONFIG.LOCALNET_FULLNODE,
    faucet: RPC_CONFIG.LOCALNET_FAUCET,
}));

const RPC_DEVNET = new JsonRpcProvider(new Connection({
    // fullnode: 'https://node.shinami.com/api/v1/186668da9c42b69678719e785ed644a2',
    fullnode: RPC_CONFIG.DEVNET_FULLNODE,
    faucet: RPC_CONFIG.DEVNET_FAUCET,
}));

const RPC_TESTNET = new JsonRpcProvider(new Connection({
    fullnode: RPC_CONFIG.TESTNET_FULLNODE,
    faucet: RPC_CONFIG.TESTNET_FAUCET,
}));

export function getRpcProvider(network: string): JsonRpcProvider {
    if (network === 'localnet') {
        return RPC_LOCALNET;
    } else if (network === 'devnet') {
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
    signAndExecuteTransactionBlock,
    network,
    profileId,
    name,
    image,
    description,
} : {
    signAndExecuteTransactionBlock: (input: any) => Promise<any>, // TODO: add type
    network: string,
    profileId: SuiAddress,
    name: string,
    image: string,
    description: string,
}): Promise<any>
{
    const packageId = getJourneyPackageId(network);

    const tx = new TransactionBlock();
    tx.moveCall({
        target: `${packageId}::journey::save_quest`,
        typeArguments: [],
        arguments: [
            tx.object(profileId),
            tx.pure(Array.from( (new TextEncoder()).encode(name) )),
            tx.pure(Array.from( (new TextEncoder()).encode(image) )),
            tx.pure(Array.from( (new TextEncoder()).encode(description) )),
        ],
    });

    const resp = await signAndExecuteTransactionBlock({
        transactionBlock: tx,
        options: {
            showEffects: true,
        },
    })

    // Verify the transaction results
    //                  Sui/Ethos || Suiet
    const effects = (resp.effects || resp.EffectsCert?.effects?.effects) as TransactionEffects;
    if (effects.status.status !== 'success') {
        throw new Error(effects.status.error);
    }
    return resp;
}
