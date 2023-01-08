import React, { useEffect, useState } from 'react';

import imgWizardBrown from '../img/wizard_brown.webp';

import '../css/MintAccount.less';

export function MintAccount(props: any) {

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

    return <div id='page' className='mint-account'>
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
