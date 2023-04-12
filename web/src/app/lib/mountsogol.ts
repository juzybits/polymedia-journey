import {
    SuiAddress,
    TransactionBlock,
    TransactionEffects,
} from '@mysten/sui.js';

const POLYMEDIA_JOURNEY_PACKAGE_ID_LOCALNET = '0x776f7415d7c3d5a58ca999be752e365f0c0f0085ec60cb959a057c04113f3725';
const POLYMEDIA_JOURNEY_PACKAGE_ID_DEVNET = '0xf90f48550eb2176051d846521de50c43e4a3de203c35c8afbbb80cae7926b7e0';
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
    name,
    imageUrl,
    description,
} : {
    signAndExecuteTransactionBlock: (input: any) => Promise<any>, // TODO: add type
    network: string,
    profileId: SuiAddress,
    name: string,
    imageUrl: string,
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
            tx.pure(Array.from( (new TextEncoder()).encode(imageUrl) )),
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
