import { useEffect } from 'react';

import './0_Home.less';

export function Teaser() {

    useEffect(() => {
        document.body.className = 'bg-stars';
    }, []);

    return <div id='page' className='home'>
        <div className='act-stars'>
            <h1 className='mario home-title title fade-in-1'><span className='prefix'>Journey to</span>Mount Sogol</h1>
            <p className='home-description paragraph narrator fade-in-2'>
                Coming soon...
            </p>
        </div>;
    </div>;
}
