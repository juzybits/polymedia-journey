import { useEffect, useState } from 'react';

import './0_Home.less';

export function Home(props: any) {

    const [act, setAct] = useState('0_stars');

    useEffect(() => {
        document.body.className = 'bg-stars';
    }, []);

    useEffect(() => {
        if (act == '1_castle') {
            document.body.className = 'bg-castle-sunset';
        }
    }, [act]);

    const Stars = () => {
        return <div className='act-stars'>
            <h1 className='mario home-title title fade-in-1'><span className='prefix'>Journey to</span>Mount Sogol</h1>
            <p className='home-description paragraph fade-in-2'>
                Travelers beware: The Journey to Mount Sogol is a peculiar one, because the destination is not a physical place. That is not to say it's not <i>real</i>. However, Mount Sogol is to be found on a different plane of existence, not in the mundane world. But how can it be reached? Well...
            </p>
            <p className='home-description paragraph fade-in-3'>
                <i>"The door to The Invisible must be visible."</i>
            </p>
            <button className='btn fade-in-4' onClick={() => setAct('1_castle')}>
                BEGIN
            </button>
        </div>;
    };

    const Castle = () => {
        return <div className='act-castle'>
            <h1 className='mario title fade-in-1'>THE CASTLE</h1>
            <p className='home-description paragraph fade-in-2'>
                <i>"The door to The Invisible must be visible"</i>, that's what the professor used to say. For a long time i wondered what he meant. He always liked to speak in riddles...
            </p>
            <p className='home-description paragraph fade-in-3'>
                 Eventually, i learned about "Le Château Invisible," a medieval castle in the Alps that the locals had nicknamed "The Invisible Castle", due to its mysterious origins.
            </p>
            <p className='home-description paragraph fade-in-4'>
                The castle's remote location makes it only accessible by foot. It wasn't easy, but i found it, i finally found it! Now i just need to find a way to get up there.
            </p>
            <button className='btn fade-in-5' onClick={props.nextStage}>
                I'M READY 💪
            </button>
            <button className='btn fade-in-5' onClick={() => window.open('https://jobs.mchire.com', '_self')}>
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
