import { useEffect } from 'react';

import '../css/0_Home.less';

export function Home(props: any) {

    useEffect(() => {
        document.body.className = 'bg-castle-sunset';
    }, []);

    return <div id='page' className='home'>
        <h1 className='mario home-title'><span className='prefix'>Journey to</span>Mount Sogol</h1>
        <p className='home-description paragraph'>
            Travelers beware: The Journey to Mount Sogol is a peculiar one, because the destination is not a physical place. That is not to say it is not <i>real</i>. However, Mount Sogol is to be found on a different plane of existence, not in the mundane world. But how can it be reached? Well...<br/><br/><i>the door to the invisible must be visible</i>.
        </p>
        <button className='btn' onClick={props.nextStage}>
            BEGIN
        </button>
    </div>;
}
