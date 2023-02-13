import { useEffect, useState } from 'react';

import imgWizardBrown from '../img/wizard_brown.webp';
import imgCardEarlyAdopter from '../img/card_early_adopter.webp';
import './7_MintEarlyAdopterCard.less';

export function MintEarlyAdopterCard(props: any)
{
    useEffect(() => {
        document.body.className = 'bg-library';
    }, []);

    const [act, setAct] = useState('0_intro');

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
    } else {
        contents = <>
            <div className='paragraph dialog fade-in-1 card'>
                <img src={imgCardEarlyAdopter} alt='chat.polymedia.app' />
            </div>
            <button className='btn last fade-in-2' onClick={props.nextStage}>COLLECT</button>
        </>;
    }

    return <div id='page' className='mint-early-adopter-card'>
        {contents}
    </div>;
}
