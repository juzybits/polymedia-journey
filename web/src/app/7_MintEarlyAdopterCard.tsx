import { useEffect, useState } from 'react';
import {
    SignableTransaction,
    SuiAddress,
    TransactionEffects,
} from '@mysten/sui.js';
import { useWalletKit } from '@mysten/wallet-kit';
import { PolymediaProfile } from '@polymedia/profile-sdk';

import imgWizardBrown from '../img/wizard_brown.webp';
import imgCardEarlyAdopter from '../img/card_early_adopter.webp';
import './7_MintEarlyAdopterCard.less';

const POLYMEDIA_JOURNEY_PACKAGE_ID_DEVNET = '0x12ba3c5ae01b5691fbb9bfea752bcab053779ea0';

async function createQuest({
    signAndExecuteTransaction,
    packageId,
    profileId,
    name,
    url,
} : {
    signAndExecuteTransaction: (transaction: SignableTransaction) => Promise<any>,
    packageId: SuiAddress,
    profileId: SuiAddress,
    name: string,
    url: string,
}): Promise<any>
{
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
            gasBudget: 1000,
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

export type MintEarlyAdopterCardProps = {
    nextStage: () => void,
    prevStage: () => void,
    profile: PolymediaProfile|null|undefined,
    suiError: string,
    setSuiError: React.Dispatch<React.SetStateAction<string>>,
}
export const MintEarlyAdopterCard: React.FC<MintEarlyAdopterCardProps> = ({
    nextStage,
    prevStage,
    profile,
    setSuiError,
    suiError,
}) => {
    useEffect(() => {
        document.body.className = 'bg-library';
    }, []);

    const [act, setAct] = useState('0_intro');

    const { signAndExecuteTransaction } = useWalletKit();

    useEffect(() => {
        if (!profile) {
            prevStage();
        }
    }, [profile]);

    const mintCard = () => {
        profile && createQuest({
            signAndExecuteTransaction,
            packageId: POLYMEDIA_JOURNEY_PACKAGE_ID_DEVNET,
            profileId: profile.id,
            name: 'Early Adopter',
            url: 'https://mountsogol.com/img/card_early_adopter.webp', // TODO: serve this image
        })
        .then( (resp: any) => {
            console.debug('[mintCard] Success. Response:', resp);
            setAct('2_done');
        })
        .catch( (error: any) => setSuiError(error.message) )
    };

    let contents = <></>;
    if (act=='0_intro') {
        contents = <>
            <div className='wizard-wrap'>
                <img src={imgWizardBrown} alt='wizard' />
            </div>
            <div>
                <p className='paragraph dialog fade-in-1'>
                    Yes, more!
                </p>
                <p className='paragraph dialog fade-in-2'>
                    The Professor was here earlier and left something for you. He said you would need it in your journey...
                </p>
                <button className='btn fade-in-3' onClick={() => setAct('1_mint')}>SHOW ME PLS</button>
            </div>
        </>;
    }
    else if (act=='1_mint') {
        contents = <>
            <div className='paragraph dialog fade-in-1 card'>
                <img src={imgCardEarlyAdopter} alt='chat.polymedia.app' />
            </div>
            <button className='btn last fade-in-2' onClick={mintCard}>COLLECT</button>
        </>;
    }
    else {
        <button className='btn last' onClick={nextStage}>CONTINUE</button>
    }

    return <div id='page' className='mint-early-adopter-card'>
        {contents}
        { suiError && <div className='sui-error'>⚠️ SUI ERROR:<br/>{suiError}</div> }
    </div>;
}
