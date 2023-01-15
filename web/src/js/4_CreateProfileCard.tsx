import { useEffect, useState } from 'react';
import { ethos, EthosConnectStatus } from 'ethos-connect';
import { shorten } from './lib/common';

import '../css/4_CreateProfileCard.less';

export function CreateProfileCard(props: any) {

    useEffect(() => {
        document.body.className = 'bg-stars';
    }, []);

    // Inputs
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');

    // Input errors
    const [nameError, _setNameError] = useState('');
    const [imageError, _setImageError] = useState('');
    const { status, wallet } = ethos.useWallet();

    const isConnected = status==EthosConnectStatus.Connected && wallet && wallet.address;
    useEffect(() => {
        if (!isConnected) {
            ethos.showSignInModal();
        }
    }, [isConnected]);

    return <div id='page' className='create-profile-card'>
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
                <label className='mario' htmlFor='field-image'>PROFILE PICTURE URL</label>
                <input type='text' id='field-image' className={imageError ? 'error' : ''}
                    autoCorrect='off' autoComplete='off'
                    value={image} onChange={e => setImage(e.target.value)}
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
