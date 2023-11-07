import { PolymediaProfile } from '@polymedia/profile-sdk';
import { linkToExplorer, shortenAddress } from '@polymedia/webutils';
import { useEffect, useState } from 'react';
import imgGhostPfp from '../../img/ghost_pfp.webp';
import { isImageUrl } from '../lib/common';
import './Card.less';

export function Card(props: any)
{
    const profile = props.profile as PolymediaProfile;
    const [pfpUrl, setPfpUrl] = useState('');
    useEffect(() => {
        if (!profile) {
            setPfpUrl('');
        } else if (!profile.imageUrl) {
            setPfpUrl(imgGhostPfp);
        } else {
            (async () => {
                const isImage = await isImageUrl(profile.imageUrl);
                setPfpUrl(isImage ? profile.imageUrl : imgGhostPfp);
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
                    <img src={pfpUrl} alt='profile picture' />
                </div>

                <header className='card-type'>
                    <div className='title-wrapper'>
                        <h2>{shortenAddress(profile.owner, 12, 14, '0x', '...')}</h2>
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
                    <p>{shortenAddress(profile.id, 4, 4, '0x')}<br />
                    {shortenAddress(props.registryId, 4, 4, '0x')}</p>
                    <h6>2023 Polymedia</h6>
                </footer>

            </article>

        </div>
    </div> {/* card front */}

    <div className='card back'>
        <div className='card-back-frame'>
            <img src='https://assets.polymedia.app/img/all/logo-nomargin-transparent-512x512.webp' className='polymedia-logo' alt='polymedia logo' />
            <div className='card-back-info'>
                &nbsp;&nbsp;&nbsp;Owner: {<a href={linkToExplorer(props.network, 'address', profile.owner)} target='_blank' rel='noopener'>{shortenAddress(profile.owner, 12, 14, '0x', '...')}</a>}<br/>
                &nbsp;Profile: {<a href={linkToExplorer(props.network, 'object', profile.id)} target='_blank' rel='noopener'>{shortenAddress(profile.id, 12, 14, '0x', '...')}</a>}<br/>
                Registry: {<a href={linkToExplorer(props.network, 'object', props.registryId)} target='_blank' rel='noopener'>{shortenAddress(props.registryId, 12, 14, '0x', '...')}</a>}<br/>
            </div>
        </div>
    </div>

</div> {/* flipper */}
</div> {/* flip-container */}
</div> {/* profile-card */}
</>
}
