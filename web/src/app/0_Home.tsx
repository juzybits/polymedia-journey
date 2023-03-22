import { useEffect, useState } from 'react';

import imgBgCastleSunset from '../img/bg-castle-sunset.webp';
import imgBgCastleWall from '../img/bg-castle-wall.webp';
import './0_Home.less';

export function Home(props: any) {

    const [act, setAct] = useState('0_stars');

    useEffect(() => {
        document.body.className = 'bg-stars';
        // Preload next background
        (new Image()).src = imgBgCastleSunset;
    }, []);

    useEffect(() => {
        if (act == '1_castle') {
            document.body.className = 'bg-castle-sunset';
            // Preload next background
            (new Image()).src = imgBgCastleWall;
        }
    }, [act]);

    const Stars = () => {
        return <div className='act-stars'>
            <h1 className='mario home-title title fade-in-1'><span className='prefix'>Journey to</span>Mount Sogol</h1>
            <p className='home-description paragraph narrator fade-in-2'>
                Explorers beware: The Journey to Mount Sogol is a peculiar one, because the destination is not a geographical place. That is not to say it's not <i>real</i>.
            </p>
            <p className='home-description paragraph narrator fade-in-3'>
                In fact, Mount Sogol is to be found on a different plane of existence, not in the physical world. But how can it be reached? Well...
            </p>
            <p className='home-description paragraph narrator fade-in-4'>
                <i>“The door to The Invisible must be visible”</i>
            </p>
            <button className='btn last fade-in-5' onClick={() => { setAct('1_castle'); window.scrollTo(0, 0); }}>
                BEGIN
            </button>
        </div>;
    };

    const Castle = () => {
        return <div className='act-castle'>
            <h1 className='mario title fade-in-1'>THE CASTLE</h1>
            <p className='home-description paragraph dialog fade-in-2'>
                <i>“The door to The Invisible must be visible”</i>, that's what the Professor used to say. For a long time I wondered what he meant...
            </p>
            <p className='home-description paragraph dialog fade-in-3'>
                Eventually I learned about “Le Château Invisible”, a medieval castle deep in the Alps that the locals had nicknamed “The Invisible Castle”, due to its unexplained origins.
            </p>
            <p className='home-description paragraph dialog fade-in-4'>
                The castle's remote location makes it only accessible by foot, and it took me a <i>looong</i> time to get here. But I found it, I finally found it!
            </p>
            <button className='btn fade-in-5' onClick={props.nextStage}>
                LET'S GO! 💪
            </button>
            <button className='btn last fade-in-5' onClick={() => window.open('https://jobs.mchire.com', '_self')}>
                I'M SCARED 😭
            </button>
        </div>;
    };


    let contents = <></>;
    if (act=='0_stars') {
        contents = <Stars />;
    } else {
        contents = <Castle />
    }

    return <div id='page' className='home'>
        {contents}
    </div>;
}
