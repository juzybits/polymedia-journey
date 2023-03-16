import { useEffect } from 'react';
import {
    GetObjectDataResponse,
    SuiObject,
} from '@mysten/sui.js';
import { PolymediaProfile } from '@polymedia/profile-sdk';

import { getRpcProvider } from './lib/mountsogol';
import imgWizardBrown from '../img/wizard_brown.webp';
import imgExampleChat from '../img/profile_example_chat.webp';
import imgExampleGotbeef from '../img/profile_example_gotbeef.webp';
import './6_GrogExplains.less';

export type GrogExplainsProps = {
    network: string,
    nextStage: () => void,
    prevStage: () => void,
    profile: PolymediaProfile|null|undefined,
    setEarlyAdopterCardId: React.Dispatch<React.SetStateAction<string|null|undefined>>,
    suiError: string,
    setSuiError: React.Dispatch<React.SetStateAction<string>>,
}
export const GrogExplains: React.FC<GrogExplainsProps> = ({
    network,
    nextStage,
    prevStage,
    profile,
    setEarlyAdopterCardId,
    setSuiError,
    suiError,
}) => {
    useEffect(() => {
        document.body.className = 'bg-library';
        setSuiError('');
        fetchAndSetEarlyAdopterCard();
    }, []);

    useEffect(() => {
        if (!profile) {
            prevStage();
        }
    }, [profile]);

    const rpc = getRpcProvider(network);
    const fetchAndSetEarlyAdopterCard = () => {
        if (!profile) return;

        rpc.getDynamicFieldObject(
            profile.id,
            // 'Polymedia: Early Adopter'
            '0x1::string::String {bytes: vector[80u8, 111u8, 108u8, 121u8, 109u8, 101u8, 100u8, 105u8, 97u8, 58u8, 32u8, 69u8, 97u8, 114u8, 108u8, 121u8, 32u8, 65u8, 100u8, 111u8, 112u8, 116u8, 101u8, 114u8]}',
        ).then((resp: GetObjectDataResponse) => {
            console.debug('[fetchAndSetEarlyAdopterCard] Found card. Response:', resp)
            const cardId = (resp.details as SuiObject).reference.objectId;
            setEarlyAdopterCardId(cardId);
        })
        .catch( (error: any) => {
            if (error.message.includes('Cannot find dynamic field')) {
                console.debug('[fetchAndSetEarlyAdopterCard] Card not found')
            } else {
                console.warn('[fetchAndSetEarlyAdopterCard] Error:', error)
                setSuiError(error.message);
            }
        })
    };

    /* HTML */

    if (!profile) {
        return <></>;
    }

    return <div id='page' className='grog-explains'>
        <div className='wizard-wrap'>
            <img src={imgWizardBrown} alt='wizard' />
        </div>
        <div>
            <p className='paragraph dialog fade-in-1'>
                It's nice to meet you, <i>{profile.name}</i>.
            </p>
            <p className='paragraph dialog fade-in-2'>
                I see you already created a Polymedia Profile. Excellent! Your profile is an <i>object</i> that will accompany you everywhere in the Sui Metaverse:
            </p>
            <div className='paragraph narrator profile-usecases fade-in-3'>
                <a href={'https://chat.polymedia.app/@sui-fans?network='+network} target='_blank'>
                    chat.polymedia.app
                    <img src={imgExampleChat} alt='chat.polymedia.app' />
                </a>
                <a href={'https://gotbeef.app?network='+network} target='_blank'>
                    gotbeef.app
                    <img src={imgExampleGotbeef} alt='gotbeef.app' />
                </a>
            </div>
            {/*<div className='paragraph dialog fade-in-3'>
                Don't see your favorite app? Ask them to integrate <a href='https://profile.polymedia.app' target='_blank'>Polymedia Profile</a>, it's really easy!
            </div>*/}
            <p className='paragraph dialog fade-in-3'>
                But there's more.
            </p>
            <button className='btn last fade-in-4' onClick={nextStage}>More?!</button>
        </div>
        { suiError && <div className='sui-error'>⚠️ SUI ERROR:<br/>{suiError}</div> }
    </div>;
}
