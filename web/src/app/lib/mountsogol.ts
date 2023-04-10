import {
    SuiAddress,
    TransactionBlock,
    TransactionEffects,
} from '@mysten/sui.js';

const POLYMEDIA_JOURNEY_PACKAGE_ID_LOCALNET = '0x796ef8a91d7ab4912af9931da6112de995bfe8677133619c921b9a0744d635ab';
const POLYMEDIA_JOURNEY_PACKAGE_ID_DEVNET = '0x123';
const POLYMEDIA_JOURNEY_PACKAGE_ID_TESTNET = '0x123';

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
