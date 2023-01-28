import { useEffect, useState } from 'react';

import { PolymediaProfile } from '@polymedia/profile-sdk';
import { isImageUrl } from '../lib/common';
import './Card.less';
import imgGhostPfp from '../../img/ghost_pfp.webp';

export function Card(props: any)
{
    const profile = props.profile as PolymediaProfile;
    const [pfpUrl, setPfpUrl] = useState('');
    useEffect(() => {
        if (!profile) {
            setPfpUrl('');
        } else if (!profile.image) {
            setPfpUrl(imgGhostPfp);
        } else {
            (async () => {
                const isImage = await isImageUrl(profile.image);
                setPfpUrl(isImage ? profile.image : imgGhostPfp);
            })();
        }
    }, [profile]);

    return <>
<div className='profile-card'>
<div className='flip-container'>
<div className='flipper'>

    <div className='card front'>
        <div className='card-background'>
            <article>
                <div className='card-body'></div>
                <header className='card-name'>
                    <div className='title-wrapper'>
                        <h1>{profile && profile.name}</h1>
                        <i className='grow'></i>
                    </div>
                </header>

                <div className='art'>
                    <img src={pfpUrl} alt='profile picture' width='100%' height='auto' />
                </div>

                <header className='card-type'>
                    <div className='title-wrapper'>
                        <h2>{profile && profile.owner}</h2>
                    </div>
                </header>
                <div className='textBox'>
                    {profile && profile.description}
                </div>
                <header className='powerToughness'>
                    <div className='title-wrapper'>
                        <h2>1/1</h2>
                    </div>
                </header>

                <footer>
                    <p>100/100 C<br />
                    ABC ‧ EN - @juzybits</p>
                    <h6>2023 Polymedia</h6>
                </footer>

            </article>

        </div>
    </div> {/* card front */}

    <div className='card back'>
        <img src='img/Back.jpg' alt='Back' width='100%' height='auto' />
    </div>

</div> {/* flipper */}
</div> {/* flip-container */}
</div> {/* profile-card */}
</>
}
