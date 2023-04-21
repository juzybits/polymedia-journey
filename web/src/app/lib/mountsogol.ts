import {
    SuiAddress,
    TransactionBlock,
    TransactionEffects,
} from '@mysten/sui.js';
import { WalletKitCore } from '@mysten/wallet-kit-core';

const POLYMEDIA_JOURNEY_PACKAGE_ID_LOCALNET = '0x5d44f372b1176bd2e870fc3eefed5e815dc500ce7e3166cdb841607fcf894f96';
const POLYMEDIA_JOURNEY_PACKAGE_ID_DEVNET = '0xe676f10859705bcfdcb3b27ace0d38ba4bafb9d185919c1c545ddb75e24a9afe';
const POLYMEDIA_JOURNEY_PACKAGE_ID_TESTNET = '0x4f05d5706b3982be1715115e795393c6d44feca8b2f2f0a8c0f9631eec9ad027';

function getJourneyPackageId(network: string): string {
    if (network === 'localnet') {
        return POLYMEDIA_JOURNEY_PACKAGE_ID_LOCALNET;
    } else if (network === 'devnet') {
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
    questName,
    imageUrl,
    description,
    data,
} : {
    signAndExecuteTransactionBlock: WalletKitCore['signAndExecuteTransactionBlock'],
    network: string,
    profileId: SuiAddress,
    questName: string,
    imageUrl: string,
    description: string,
    data: string,
}): ReturnType<typeof signAndExecuteTransactionBlock>
{
    const tx = new TransactionBlock();
    return await moveCall({
        signAndExecuteTransactionBlock,
        tx,
        network,
        moveFunc: 'save_quest',
        moveArgs: [
            tx.object(profileId),
            tx.pure(Array.from( (new TextEncoder()).encode(questName) )),
            tx.pure(Array.from( (new TextEncoder()).encode(imageUrl) )),
            tx.pure(Array.from( (new TextEncoder()).encode(description) )),
            tx.pure(Array.from( (new TextEncoder()).encode(data) )),
        ],
    });
}

export async function deleteQuest({
    signAndExecuteTransactionBlock,
    network,
    profileId,
    questName,
} : {
    signAndExecuteTransactionBlock: WalletKitCore['signAndExecuteTransactionBlock'],
    network: string,
    profileId: SuiAddress,
    questName: string,
}): ReturnType<typeof signAndExecuteTransactionBlock>
{
    const tx = new TransactionBlock();
    return await moveCall({
        signAndExecuteTransactionBlock,
        tx,
        network,
        moveFunc: 'delete_quest',
        moveArgs: [
            tx.object(profileId),
            tx.pure(Array.from( (new TextEncoder()).encode(questName) )),
        ],
    });
}

async function moveCall({
    signAndExecuteTransactionBlock,
    tx,
    network,
    moveFunc,
    moveArgs,
} : {
    signAndExecuteTransactionBlock: WalletKitCore['signAndExecuteTransactionBlock'],
    tx: TransactionBlock,
    network: string,
    moveFunc: string,
    moveArgs: Array<any>,
}): ReturnType<typeof signAndExecuteTransactionBlock>
{
    const packageId = getJourneyPackageId(network);

    tx.moveCall({
        target: `${packageId}::journey::${moveFunc}`,
        typeArguments: undefined,
        arguments: moveArgs,
    });

    const resp = await signAndExecuteTransactionBlock({
        transactionBlock: tx,
        options: {
            showEffects: true,
        },
    })

    const effects = resp.effects as TransactionEffects;
    if (effects.status.status !== 'success') {
        throw new Error(effects.status.error);
    }
    return resp;
}