import { useEffect } from 'react';

import imgWizardBrown from '../img/wizard_brown.webp';

import './3_MeetGrog.less';

export function MeetGrog(props: any) {

    useEffect(() => {
        document.body.className = 'bg-library';
    }, []);

    return <div id='page' className='meet-grog'>
        <div id='wizard-wrap'>
            <img src={imgWizardBrown} alt='wizard' />
        </div>
        <div id='wizard-text'>
            <p className='paragraph'>
                Well, well, well...
                Welcome to the other side.
                Few people make it this far — it appears you are quite the explorer!
                You overcame the initiatory trial and found the door to The Invisible.
                I'm Grog. What's your name?
            </p>
            <button className='btn' onClick={props.nextStage}>I am...</button>
        </div>
    </div>;
}
