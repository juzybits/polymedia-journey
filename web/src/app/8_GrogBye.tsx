import { useEffect } from 'react';

import imgWizardBrown from '../img/wizard_brown.webp';
import './8_GrogBye.less';

export function GrogBye(props: any)
{
    useEffect(() => {
        document.body.className = 'bg-library';
    }, []);

    return <div id='page' className='grog-bye'>
        <div id='wizard-wrap'>
            <img src={imgWizardBrown} alt='wizard' />
        </div>
        <div id='wizard-text'>
            <p className='paragraph narrator fade-in-1'>
                All done! (for now...)
            </p>
            <p className='paragraph narrator fade-in-2'>
                Better tell Polymedia know that you made it this far, they'll be happy to hear.
                TODO: create tweet link "What the heck is The Journey to Mount Sogol? I have no idea but I just created my Polymedia Profile and collected my early adopter card @polymedia_app."
            </p>
            <p className='paragraph narrator fade-in-3'>
                The Journey to Mount Sogol continues on Sui Mainnet!
            </p>
            <button className='btn last fade-in-4' onClick={props.nextStage}>OUTTRO</button>
        </div>
    </div>;
}
