import { SuiClient, TransactionEffects } from '@mysten/sui.js/client';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { WalletKitCore } from '@mysten/wallet-kit-core';
import { NetworkName } from '@polymedia/webutils';

const POLYMEDIA_JOURNEY_PACKAGE_ID_LOCALNET = '0x5d44f372b1176bd2e870fc3eefed5e815dc500ce7e3166cdb841607fcf894f96';
const POLYMEDIA_JOURNEY_PACKAGE_ID_DEVNET = '0xaf3ba9e47b2978ffdd4c02d4dc5750f21161a7b7c2ab9185051abef0d8bef132';
const POLYMEDIA_JOURNEY_PACKAGE_ID_TESTNET = '0x5c02213542193c406884e918d0c39051d61a2cd896c887f8dd2d39daf3dee8d8';
const POLYMEDIA_JOURNEY_PACKAGE_ID_MAINNET = '0x7c423c0f1ab19c99155c24e98fdb971453b699c90ab579b23b38103060ea26db';

function getJourneyPackageId(network: NetworkName): string {
    if (network === 'localnet') {
        return POLYMEDIA_JOURNEY_PACKAGE_ID_LOCALNET;
    } else if (network === 'devnet') {
        return POLYMEDIA_JOURNEY_PACKAGE_ID_DEVNET;
    } else if (network === 'testnet') {
        return POLYMEDIA_JOURNEY_PACKAGE_ID_TESTNET;
    } else if (network === 'mainnet') {
        return POLYMEDIA_JOURNEY_PACKAGE_ID_MAINNET;
    } else {
        throw new Error('Network not recognized: ' + network);
    }
}

export async function createQuest({
    suiClient,
    signTransactionBlock,
    network,
    profileId,
    questName,
    imageUrl,
    description,
    data,
} : {
    suiClient: SuiClient,
    signTransactionBlock: WalletKitCore['signTransactionBlock'],
    network: NetworkName,
    profileId: string,
    questName: string,
    imageUrl: string,
    description: string,
    data: string,
}): ReturnType<SuiClient['executeTransactionBlock']>
{
    const tx = new TransactionBlock();
    return await moveCall({
        suiClient,
        signTransactionBlock,
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
    suiClient,
    signTransactionBlock,
    network,
    profileId,
    questName,
} : {
    suiClient: SuiClient,
    signTransactionBlock: WalletKitCore['signTransactionBlock'],
    network: NetworkName,
    profileId: string,
    questName: string,
}): ReturnType<SuiClient['executeTransactionBlock']>
{
    const tx = new TransactionBlock();
    return await moveCall({
        suiClient,
        signTransactionBlock,
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
    suiClient,
    signTransactionBlock,
    tx,
    network,
    moveFunc,
    moveArgs,
} : {
    suiClient: SuiClient,
    signTransactionBlock: WalletKitCore['signTransactionBlock'],
    tx: TransactionBlock,
    network: NetworkName,
    moveFunc: string,
    moveArgs: Array<any>,
}): ReturnType<SuiClient['executeTransactionBlock']>
{
    const packageId = getJourneyPackageId(network);

    tx.moveCall({
        target: `${packageId}::journey::${moveFunc}`,
        typeArguments: undefined,
        arguments: moveArgs,
    });

    const signedTx = await signTransactionBlock({
        transactionBlock: tx,
        chain: `sui:${network}`,
    });
    const resp = await suiClient.executeTransactionBlock({
        transactionBlock: signedTx.transactionBlockBytes,
        signature: signedTx.signature,
        options: {
            showEffects: true,
        },
    });

    const effects = resp.effects as TransactionEffects;
    if (effects.status.status !== 'success') {
        throw new Error(effects.status.error);
    }
    return resp;
}
