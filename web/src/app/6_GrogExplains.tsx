import { useEffect } from 'react';

import imgWizardBrown from '../img/wizard_brown.webp';
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
            <p className='paragraph fade-in-1'>
                It's nice to meet you TODO. I see you already created your Polymedia Profile. Good. Now we can proceed.
            </p>
            <p className='paragraph fade-in-2'>
                First things first. A Polymedia Profile is an object associated to your address. TODO: explain more.
                You can use it across Sui! TODO: images from integrations
            </p>
            <p className='paragraph fade-in-3'>
                But there's more!
            </p>
            <button className='btn fade-in-4' onClick={props.nextStage}>Giv</button>
        </div>
    </div>;
}
