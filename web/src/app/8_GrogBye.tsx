import { useEffect } from 'react';
import { PolymediaProfile } from '@polymedia/profile-sdk';

import imgWizardBrown from '../img/wizard_brown.webp';
import './8_GrogBye.less';

export type GrogByeProps = {
    network: string,
    profile: PolymediaProfile|null|undefined,
}
export const GrogBye: React.FC<GrogByeProps> = ({
    network,
    profile,
}) =>{
    useEffect(() => {
        document.body.className = 'bg-library';
    }, []);

    const tweetText = encodeURIComponent('🤔Yo, what even is Mount Sogol? I have no clue haha, but I just got an Early Adopter NFT by creating my Polymedia Profile!\n\nWho knows, it might be useful later on... (idk tho, could be psyops)\n\nhttps://mountsogol.com | @polymedia_app | #SuiNetwork');
    const tweetHref = `https://twitter.com/share?text=${tweetText}`;
    const profileUrl = profile ? `https://explorer.sui.io/object/${profile.id}?network=${network}` : '#';
    return <div id='page' className='grog-bye'>
        <div className='wizard-wrap'>
            <img src={imgWizardBrown} alt='wizard' />
        </div>
        <div>
            <p className='paragraph dialog fade-in-1'>
                All done! You can find your Early Adopter card inside <a href={profileUrl} target='_blank'>your profile</a>.
            </p>
            <p className='paragraph dialog fade-in-2'>
                Better <a href={tweetHref} target='_blank'>let Polymedia know</a> that you made it this far. They will be happy to hear from you.
            </p>
            <p className='paragraph dialog fade-in-3'>
                Now, why don't you get some rest. There is a guest room ready for you upstairs. We will talk more in the morning, before you continue your Journey to Mount Sogol.
            </p>

            <button className='btn fade-in-4 last' onClick={() => window.open('https://chat.polymedia.app/@sui-fans?network='+network, '_self')}>
                GO TO LOBBY
            </button>

        </div>
    </div>;
}
