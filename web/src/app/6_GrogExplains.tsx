import { useEffect } from 'react';
import { PolymediaProfile } from '@polymedia/profile-sdk';

import imgWizardBrown from '../img/wizard_brown.webp';
import imgExampleChat from '../img/profile_example_chat.webp';
import imgExampleGotbeef from '../img/profile_example_gotbeef.webp';
import './6_GrogExplains.less';

export type GrogExplainsProps = {
    network: string,
    nextStage: () => void,
    prevStage: () => void,
    profile: PolymediaProfile|null|undefined,
}
export const GrogExplains: React.FC<GrogExplainsProps> = ({
    network,
    nextStage,
    prevStage,
    profile,
}) => {
    useEffect(() => {
        document.body.className = 'bg-library';
    }, []);

    useEffect(() => {
        if (!profile) {
            prevStage();
        }
    }, [profile]);

    if (!profile) {
        return <></>;
    }

    return <div id='page' className='grog-explains'>
        <div id='wizard-wrap'>
            <img src={imgWizardBrown} alt='wizard' />
        </div>
        <div id='wizard-text'>
            <p className='paragraph dialog fade-in-1'>
                It's nice to meet you, <i>{profile.name}</i>.
            </p>
            <p className='paragraph dialog fade-in-2'>
                I see you already have a Polymedia Profile. Excellent. Your profile will travel with you everywhere you go in the Sui Metaverse:
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
            <div className='paragraph dialog fade-in-3'>
                Don't see your favorite app? Ask them to integrate <a href='https://profile.polymedia.app' target='_blank'>Polymedia Profile</a>, it's really easy!
            </div>
            <p className='paragraph dialog fade-in-4'>
                But there's more!
            </p>
            <button className='btn last fade-in-5' onClick={nextStage}>More?!</button>
        </div>
    </div>;
}
