import { useEffect } from 'react';

import imgWizardBrown from '../img/wizard_brown.webp';
import imgExampleChat from '../img/profile_example_chat.webp';
import imgExampleGotbeef from '../img/profile_example_gotbeef.webp';
import './6_GrogExplains.less';

export function GrogExplains(props: any)
{
    useEffect(() => {
        document.body.className = 'bg-library';
    }, []);

    return <div id='page' className='grog-explains'>
        <div id='wizard-wrap'>
            <img src={imgWizardBrown} alt='wizard' />
        </div>
        <div id='wizard-text'>
            <p className='paragraph dialog fade-in-1'>
                It's nice to meet you TODO. I see you already have a Polymedia Profile. Good. Now we can proceed.
            </p>
            <p className='paragraph dialog fade-in-2'>
                First things first. A Polymedia Profile is an object associated to your address across the Sui Metaverse. Your profile will travel with you everywhere you go:
            </p>
            <div className='paragraph dialog profile-usecases fade-in-3'>
                <a href={'https://chat.polymedia.app/@sui-fans?network='+props.network} target='_blank'>
                    chat.polymedia.app
                    <img src={imgExampleChat} alt='chat.polymedia.app' />
                </a>
                <a href={'https://gotbeef.app?network='+props.network} target='_blank'>
                    gotbeef.app
                    <img src={imgExampleGotbeef} alt='gotbeef.app' />
                </a>
            </div>
            <div className='paragraph dialog fade-in-3'>
                Don't see your favorite app? Ask them to integrate <a href='TODO' target='_blank'>Polymedia Profile</a>, it's really easy!
            </div>
            <p className='paragraph dialog fade-in-4'>
                But there's more!
            </p>
            <button className='btn last fade-in-5' onClick={props.nextStage}>More??</button>
        </div>
    </div>;
}
