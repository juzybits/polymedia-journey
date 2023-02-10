import { useEffect } from 'react';

import imgWizardBrown from '../img/wizard_brown.webp';
import './8_GrogBye.less';

export function GrogBye(props: any)
{
    useEffect(() => {
        document.body.className = 'bg-library';
    }, []);

    const tweetText = encodeURIComponent('What is Mount Sogol? No idea. But I just created my Polymedia Profile and collected my early adopter card.\n\nhttps://mountsogol.com | @polymedia_app');
    const tweetHref = `https://twitter.com/share?text=${tweetText}`;

    return <div id='page' className='grog-bye'>
        <div id='wizard-wrap'>
            <img src={imgWizardBrown} alt='wizard' />
        </div>
        <div id='wizard-text'>
            <p className='paragraph dialog fade-in-1'>
                All done! (for now...)
            </p>
            <p className='paragraph dialog fade-in-2'>
                Better <a href={tweetHref} target='_blank'>let Polymedia know</a> that you made it this far. They will be happy to hear from you.
            </p>
            <p className='paragraph dialog fade-in-3'>
                The Journey to Mount Sogol continues on Sui Mainnet!
            </p>
            <button className='btn last fade-in-4' onClick={props.nextStage}>OUTTRO</button>
        </div>
    </div>;
}
