import { useEffect } from 'react';
import imgWizardBrown from '../img/wizard_brown.webp';

export function MeetGrog(props: any) {

    useEffect(() => {
        document.body.className = 'bg-library';
    }, []);

    return <div id='page' className='meet-grog'>
        <div className='wizard-wrap'>
            <img src={imgWizardBrown} alt='wizard' />
        </div>
        <div className='wizard-text'>
            <div className='text-wrap'>
                <p className='paragraph dialog fade-in-1'>
                    Well, well, well...
                    Welcome to the other side.
                    Few people make it this far — it appears you are quite the explorer!
                    You overcame the initiatory trial and found the door to The Invisible.
                </p>
                <p className='paragraph dialog fade-in-2'>
                    I am Grog, the keeper of the Polymedia Registry. What's your name?
                </p>
            </div>
            <button className='btn last fade-in-3' onClick={props.nextStage}>I am...</button>
        </div>
    </div>;
}
