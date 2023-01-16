import { useEffect, useState } from 'react';
import { ethos, EthosConnectStatus } from 'ethos-connect';

import { getProfileObjectIds } from '@polymedia/profile-sdk';
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
    const [nameError, _setNameError] = useState(''); // TODO validation
    const [imageError, _setImageError] = useState(''); // TODO validation
    const [profileAddr, setProfileAddr] = useState('unknown');
    const { status, wallet } = ethos.useWallet();

    async function fetchProfileObjectId(lookupAddress: string) {
        const result = await getProfileObjectIds({
            packageId: '0x2f3def86663f600902a4f926d11d1c3fea586bd5', // TODO: move to profile.ts
            registryId: '0x27d0b79b91c94597879aeabe7ed76d5961a02a6c',
            lookupAddresses: [ lookupAddress ],
        });
        console.log(JSON.stringify(result));
        console.log(result);
        setProfileAddr('unknown'); // TODO: fetch with getProfileObjectIds()
    };
    const isConnected = status==EthosConnectStatus.Connected && wallet && wallet.address;
    useEffect(() => {
        if (!isConnected) {
            ethos.showSignInModal();
        } else {
            fetchProfileObjectId(wallet.address);
        }
    }, [isConnected]);
    useEffect(() => {
        if (profileAddr != 'unknown' && profileAddr != 'does_not_exist') {
            props.nextStage();
        }
    }, [profileAddr]);

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
