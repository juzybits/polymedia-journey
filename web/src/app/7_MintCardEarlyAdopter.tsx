import { useEffect } from 'react';

import imgWizardBrown from '../img/wizard_brown.webp';
import imgCardEarlyAdopter from '../img/card_early_adopter.webp';
import './7_MintCardEarlyAdopter.less';

export function MintCardEarlyAdopter(props: any)
{
    useEffect(() => {
        document.body.className = 'bg-library';
    }, []);

    return <div id='page' className='mint-card-early-adopter'>
        <div id='wizard-wrap'>
            <img src={imgWizardBrown} alt='wizard' />
        </div>
        <div id='wizard-text'>
            <p className='paragraph dialog fade-in-1'>
                Yes, more!
            </p>
            <p className='paragraph dialog fade-in-2'>
                The Professor was here earlier and left something for you. He said you would need it in your journey...
            </p>
            <button className='btn fade-in-3' onClick={props.nextStage}>SHOW ME PLS</button>
            <div className='paragraph dialog fade-in-4 card'>
                <img src={imgCardEarlyAdopter} alt='chat.polymedia.app' />
            </div>
            <button className='btn last fade-in-4' onClick={props.nextStage}>MINT</button>
        </div>
    </div>;
}
