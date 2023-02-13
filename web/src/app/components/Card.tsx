import { useEffect, useState } from 'react';

import { PolymediaProfile } from '@polymedia/profile-sdk';
import { isImageUrl, shorten } from '../lib/common';
import './Card.less';
import imgGhostPfp from '../../img/ghost_pfp.webp';
import imgLogo from '../../img/logo.png';

export function Card(props: any)
{
    const profile = props.profile as PolymediaProfile;
    const [pfpUrl, setPfpUrl] = useState('');
    useEffect(() => {
        if (!profile) {
            setPfpUrl('');
        } else if (!profile.url) {
            setPfpUrl(imgGhostPfp);
        } else {
            (async () => {
                const isImage = await isImageUrl(profile.url);
                setPfpUrl(isImage ? profile.url : imgGhostPfp);
            })();
        }
    }, [profile]);

    if (!profile) {
        return <></>;
    }

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
                        <h1>{profile.name}</h1>
                        <i className='grow'></i>
                    </div>
                </header>

                <div className='art'>
                    <img src={pfpUrl} alt='profile picture' width='100%' height='auto' />
                </div>

                <header className='card-type'>
                    <div className='title-wrapper'>
                        <h2>{profile.owner}</h2>
                    </div>
                </header>
                <div className='textBox'>
                    {profile.description}
                </div>
                <header className='powerToughness'>
                    <div className='title-wrapper'>
                        <h2>1/1</h2>
                    </div>
                </header>

                <footer>
                    <p>{shorten(profile.id)}<br />
                    {shorten(props.registryId)}</p>
                    <h6>2023 Polymedia</h6>
                </footer>

            </article>

        </div>
    </div> {/* card front */}

    <div className='card back'>
        <div className='card-back-frame'>
            <img src={imgLogo} className="polymedia-logo" alt='polymedia logo' />
            <div className='card-back-info'>
                &nbsp;&nbsp;&nbsp;Owner: {<a target="_blank" href={`https://explorer.sui.io/address/${profile.owner}?network=devnet`}>{profile.owner}</a>}<br/>
                &nbsp;Profile: {<a target="_blank" href={`https://explorer.sui.io/object/${profile.id}?network=devnet`}>{profile.id}</a>}<br/>
                Registry: {<a target="_blank" href={`https://explorer.sui.io/object/${props.registryId}?network=devnet`}>{props.registryId}</a>}<br/>
            </div>
        </div>
    </div>

</div> {/* flipper */}
</div> {/* flip-container */}
</div> {/* profile-card */}
</>
}