import { useEffect } from 'react';

import imgWizardBrown from '../img/wizard_brown.webp';
import './8_GrogBye.less';

export function GrogBye()
{
    useEffect(() => {
        document.body.className = 'bg-library';
    }, []);

    const tweetText = encodeURIComponent('🤔Yo, what even is Mount Sogol? I have no clue haha, but I just got an Early Adopter NFT by creating my Polymedia Profile!\n\nWho knows, it might be useful later on... (idk tho, might be psyops)\n\nhttps://mountsogol.com | @polymedia_app');
    const tweetHref = `https://twitter.com/share?text=${tweetText}`;

    return <div id='page' className='grog-bye'>
        <div className='wizard-wrap'>
            <img src={imgWizardBrown} alt='wizard' />
        </div>
        <div>
            <p className='paragraph dialog fade-in-1'>
                All done! (for now...)
            </p>
            <p className='paragraph dialog fade-in-2'>
                Better <a href={tweetHref} target='_blank'>let Polymedia know</a> that you made it this far. They will be happy to hear from you.
            </p>
            <p className='paragraph dialog fade-in-3 last'>
                Now, why don't you get some rest. There is a guest room upstairs ready for you. We will talk more in the morning, before you continue your Journey to Mount Sogol.
            </p>
        </div>
    </div>;
}
