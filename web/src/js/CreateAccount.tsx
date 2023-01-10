import React, { useEffect, useState } from 'react';
import { ethos, EthosConnectStatus } from 'ethos-connect';
import { shorten } from './lib/common';

import '../css/CreateAccount.less';
import imgWizardBrown from '../img/wizard_brown.webp';

export function CreateAccount(props: any) {

    useEffect(() => {
        document.body.className = 'bg-stars';
    }, []);

    // Inputs
    const [name, setName] = useState('');
    const [pfp, setPfp] = useState('');
    const [description, setDescription] = useState('');

    // Input errors
    const [nameError, setNameError] = useState('');
    const [pfpError, setPfpError] = useState('');
    const { status, wallet } = ethos.useWallet();

    const isConnected = status==EthosConnectStatus.Connected;
    useEffect(() => {
        if (!isConnected) {
            ethos.showSignInModal();
        }
    }, [isConnected]);

    return <div id='page' className='create-account'>
        <div className='address-widget' onClick={isConnected ? wallet.disconnect: ethos.showSignInModal}>
            {isConnected ? shorten(wallet.address) : 'Not connected'}
        </div>
        <div className='form-wrap paragraph'>
        <form>
            <div className='field'>
                <label className='mario' htmlFor='field-name'>YOUR NAME</label>
                <input type='text' id='field-name' className={nameError ? 'error' : ''}
                    spellCheck='false' autoCorrect='off' autoComplete='off'
                    value={name} onChange={e => setName(e.target.value)}
                />
            </div>
            <div className='field'>
                <label className='mario' htmlFor='field-pfp'>PROFILE PICTURE URL</label>
                <input type='text' id='field-pfp' className={pfpError ? 'error' : ''}
                    autoCorrect='off' autoComplete='off'
                    value={pfp} onChange={e => setPfp(e.target.value)}
                />
            </div>
            <div className='field'>
                <label className='mario' htmlFor='field-description'>DESCRIPTION / SOCIALS</label>
                <textarea id='field-description'
                    value={description} onChange={e => setDescription(e.target.value)}
                ></textarea>
            </div>
            <button type='submit' className='btn'>
                CREATE PROFILE
            </button>
        </form>
        </div>
    </div>;
}
