import { useEffect, useState } from 'react';
import { useWalletKit } from '@mysten/wallet-kit';
import { PolymediaProfile } from '@polymedia/profile-sdk';

import { createQuest } from './lib/sui_client';
import imgWizardBrown from '../img/wizard_brown.webp';
import imgCardEarlyAdopter from '../img/card_early_adopter.webp';
import './7_MintEarlyAdopterCard.less';

export type MintEarlyAdopterCardProps = {
    network: string,
    nextStage: () => void,
    prevStage: () => void,
    profile: PolymediaProfile|null|undefined,
    earlyAdopterCardId: string|null|undefined,
    suiError: string,
    setSuiError: React.Dispatch<React.SetStateAction<string>>,
}
export const MintEarlyAdopterCard: React.FC<MintEarlyAdopterCardProps> = ({
    network,
    nextStage,
    prevStage,
    profile,
    earlyAdopterCardId,
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
            network,
            profileId: profile.id,
            name: 'Early Adopter',
            url: 'https://mountsogol.com/img/card_early_adopter.webp',
        })
        .then( (resp: any) => {
            console.debug('[mintCard] Success. Response:', resp);
            nextStage();
        })
        .catch( (error: any) => setSuiError(error.message) )
    };

    const ButtonCollect: React.FC = () => {
        return <button className='btn last fade-in-3' onClick={mintCard}>COLLECT</button>;
    };

    const ButtonContinue: React.FC = () => {
        return <button className='btn last fade-in-3' onClick={nextStage}>CONTINUE</button>;
    };

    let contents = <></>;
    if (act=='0_intro') {
        contents = <>
            <div className='wizard-wrap'>
                <img src={imgWizardBrown} alt='wizard' />
            </div>
            <div>
                <p className='paragraph dialog fade-in-1'>
                    The Professor was here earlier and left something for you. He said you would need it in your journey...
                </p>
                <button className='btn fade-in-2 last' onClick={() => setAct('1_mint')}>WHAT IS IT?</button>
            </div>
        </>;
    }
    else if (act=='1_mint') {
        const button = earlyAdopterCardId ? <ButtonContinue /> : <ButtonCollect />;

        contents = <>
            <div className='paragraph dialog fade-in-1 card'>
                <img src={imgCardEarlyAdopter} alt='chat.polymedia.app' />
            </div>
            <p className='paragraph dialog fade-in-2'>
                You can attach this card to your Polymedia Profile as a <i>dynamic object field</i>. The Professor didn't explain what it does... but who knows, it sounds like you might need it later.
            </p>
            {button}
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
