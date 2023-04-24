import { useEffect, useState } from 'react';
import { useWalletKit } from '@mysten/wallet-kit';
import { PolymediaProfile } from '@polymedia/profile-sdk';

import { Quest } from './App';
import { createQuest } from './lib/journey';
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
    quest: Quest
}
export const MintEarlyAdopterCard: React.FC<MintEarlyAdopterCardProps> = ({
    network,
    nextStage,
    prevStage,
    profile,
    earlyAdopterCardId,
    setSuiError,
    suiError,
    quest,
}) => {
    useEffect(() => {
        document.body.className = 'bg-library';
    }, []);

    const [act, setAct] = useState('0_intro');
    const { signAndExecuteTransactionBlock } = useWalletKit();

    useEffect(() => {
        if (!profile) {
            prevStage();
        }
    }, [profile]);

    const mintCard = () => {
        const isCheater = (quest: Quest): boolean => {
            const TEN_HOURS_AGO = Date.now() - 10 * 60 * 60 * 1000;
            return (
                quest.findDoorStart < TEN_HOURS_AGO || quest.findDoorEnd < TEN_HOURS_AGO ||
                (quest.findDoorEnd - quest.findDoorStart < 100) ||
                quest.findDoorClicks <= 0 || quest.findDoorClicks > 12 ||
                quest.knockDoorStart < TEN_HOURS_AGO || quest.knockDoorEnd < TEN_HOURS_AGO ||
                (quest.knockDoorEnd - quest.knockDoorStart < 1000) ||
                quest.knockDoorClicks !== 25
            );
        };
        profile && createQuest({
            signAndExecuteTransactionBlock,
            network,
            profileId: profile.id,
            questName: 'Polymedia: Early Adopter',
            imageUrl: 'https://mountsogol.com/img/card_early_adopter.webp',
            description: 'The door to the invisible must be visible',
            data: JSON.stringify({
                // fp: quest.fingerprint,
                ch: Number(isCheater(quest)),
                c1: quest.findDoorClicks,
                t1: quest.findDoorEnd - quest.findDoorStart,
                c2: quest.knockDoorClicks,
                t2: quest.knockDoorEnd - quest.knockDoorStart,
            }),
        })
        .then( (resp: any) => {
            console.debug('[mintCard] Success. Response:', resp);
            nextStage();
        })
        .catch( (error: any) => {
            const errorString = String(error.stack || error.message || error);
            console.warn(errorString);
            setSuiError(errorString);
        })
    };

    let contents = <></>;
    if (act=='0_intro') {
        contents = <>
            <div className='wizard-wrap'>
                <img src={imgWizardBrown} alt='wizard' />
            </div>
            <div>
                <p className='paragraph dialog fade-in-1'>
                    The Professor was here earlier and left something for you. He said it would be useful in your journey...
                </p>
                <button className='btn fade-in-2 last' onClick={() => setAct('1_mint')}>WHAT IS IT?</button>
            </div>
        </>;
    }
    else if (act=='1_mint') {
        const onClick = earlyAdopterCardId ? nextStage : mintCard;
        const button = <button className='btn last fade-in-3' onClick={onClick}>COLLECT</button>;

        contents = <>
            <div className='paragraph dialog fade-in-1 card'>
                <img src={imgCardEarlyAdopter} alt='chat.polymedia.app' />
            </div>
            <p className='paragraph dialog fade-in-2'>
                You can attach this card to your Polymedia Profile as a <a href='https://docs.sui.io/build/programming-with-objects/ch5-dynamic-fields' target='_blank'><i>dynamic field object</i></a>. The Professor didn't explain what it does... but who knows, it sounds like you might need it later on.
            </p>
            {button}
        </>;
    }

    return <div id='page' className='mint-early-adopter-card'>
        {contents}
        { suiError && <div className='sui-error'>⚠️ SUI ERROR:<br/>{suiError}</div> }
    </div>;
}
