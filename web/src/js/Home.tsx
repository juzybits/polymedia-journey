import React, { useEffect } from 'react';

import imgDoorClosed from '../img/door_closed.webp';
import imgDoorOpen from '../img/door_open.webp';
import imgTorch from '../img/torch.gif';

import '../css/Home.less';

export function Home(props: any) {

    useEffect(() => {
        document.body.className = 'bg-stars';
    }, []);

    return <div id='page' className='home'>
        <h1 className='mario home-title'><span className='prefix'>Journey to</span>Mount Sogol</h1>
        <p className='home-description'>
            Travelers beware: The Journey to Mount Sogol is a peculiar one, because the destination is not a physical place. That is not to say it's not <i>real</i> – many of the most important things in live are not physical either: love, justice, truth, reputation, math, language. What it means, though, is that Mount Sogol must be found in a different plain of existence, not in the mundane world. But how to reach it, then? Well...<br/><br/><i>the door to the invisible must be visible</i>.
        </p>
        <button className='home-button' onClick={props.nextStage}>
            BEGIN
        </button>
    </div>;
}
