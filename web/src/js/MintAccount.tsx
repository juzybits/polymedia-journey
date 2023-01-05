import React, { useEffect, useState } from 'react';

import imgWizardBrown from '../img/wizard_brown.webp';

import '../css/MintAccount.less';

export function MintAccount(props: any) {

    useEffect(() => {
        document.body.className = 'bg-stars';
    }, []);

    return <div id='page' className='mint-account'>
        <img id='wizard-brown' src={imgWizardBrown} alt='wizard' />
    </div>;
}
