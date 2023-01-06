import React, { useEffect, useState } from 'react';

import imgWizardBrown from '../img/wizard_brown.webp';

import '../css/MintAccount.less';

export function MintAccount(props: any) {

    useEffect(() => {
        document.body.className = 'bg-stars';
    }, []);

    return <div id='page' className='mint-account'>
        <div id='wizard-wrap'>
            <img src={imgWizardBrown} alt='wizard' />
        </div>
        <div id='wizard-text'>
            <p className='paragraph'>
                Well, well, well...
                Welcome to the other side.
                It's been a while since anyone comes around these parts.
                You overcame the initial tests and found the door to the invisible.
                It appears you are quite the explorer.
                I'm Grog. What's your name?
            </p>
            <button className='btn'>I am...</button>
        </div>
    </div>;
}
