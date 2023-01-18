import { useEffect, useState } from 'react';
import { ethos, EthosConnectStatus } from 'ethos-connect';

import { findProfileObjectIds } from '@polymedia/profile-sdk';
import { Nav } from './components/Nav';
import '../css/4_CreateProfileCard.less';

export function CreateProfileCard(props: any) {

    useEffect(() => {
        document.body.className = 'bg-stars';
    }, []);

    const [suiError, setSuiError] = useState('');

    // Inputs
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');

    // Input errors
    const [nameError, _setNameError] = useState(''); // TODO validation
    const [imageError, _setImageError] = useState(''); // TODO validation
    const [profileAddr, setProfileAddr] = useState('unknown');
    const { status, wallet } = ethos.useWallet();

    const fetchProfileObjectId = async (lookupAddress: string) => {
        try {
            const objectIds: Map<string,string> = await findProfileObjectIds({
                lookupAddresses: [ lookupAddress ],
            });
            if (objectIds.has(lookupAddress)) {
                const profileAddress = objectIds.get(lookupAddress) as string;
                console.log('[fetchProfileObjectId] Found profile:', profileAddress);
                setProfileAddr(profileAddress);
            } else {
                console.log('[fetchProfileObjectId] Profile not found');
            }
        } catch(error: any) {
            setSuiError(error.message);
        }
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
        <Nav />
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
        { suiError && <div className='error'>⚠️ SUI ERROR:<br/>{suiError}</div> }
    </div>;
}
