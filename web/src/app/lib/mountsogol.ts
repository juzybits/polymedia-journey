import {
    SuiAddress,
    TransactionBlock,
    TransactionEffects,
} from '@mysten/sui.js';

const POLYMEDIA_JOURNEY_PACKAGE_ID_LOCALNET = '0x545d5128f17c7e766265893ce594f6cfba0973876ab06d35e805b43aa26caf85';
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
