import { useEffect } from 'react';

import imgWizardBrown from '../img/wizard_brown.webp';
import './6_GrogExplains.less';

export function GrogExplains()
{
    useEffect(() => {
        document.body.className = 'bg-library';
    }, []);

    return <div id='page' className='grog-explains'>
        <div id='wizard-wrap'>
            <img src={imgWizardBrown} alt='wizard' />
        </div>
    </div>;
}
