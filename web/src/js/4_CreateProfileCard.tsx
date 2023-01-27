import { useEffect, useState, SyntheticEvent } from 'react';
import { ethos, EthosConnectStatus } from 'ethos-connect';

import { createProfile } from '@polymedia/profile-sdk';
import { AddressWidget } from './components/AddressWidget';
import '../css/4_CreateProfileCard.less';

export function CreateProfileCard(props: any) {

    useEffect(() => {
        document.body.className = 'bg-library dark';
    }, []);

    const { status, wallet } = ethos.useWallet();
    const [waiting, setWaiting] = useState(false);

    // Inputs
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');

    // Input errors
    const [nameError, setNameError] = useState(''); // TODO validation
    const [imageError, setImageError] = useState(''); // TODO validation

    useEffect(() => {
        if (props.profileAddress != 'unknown' && props.profileAddress != 'does_not_exist') {
            props.nextStage();
        }
    }, [props.profileAddress]);

    const validateForm = (): boolean => {
        setNameError('TODO - setNameError');
        setImageError('TODO - setImageError');
        return true;
    };
    const onSubmitCreate = async (e: SyntheticEvent) => {
        e.preventDefault();
        props.setSuiError('');

        const isConnected = status==EthosConnectStatus.Connected && wallet && wallet.address;
        if (!isConnected) { // should never happen because AddressWidget show the modal if disconnected
           return;
        }
        if (!validateForm()) {
           return;
        }

        console.debug(`[onSubmitCreate] Attempting to create profile: ${name}`);
        setWaiting(true);

        try {
            const result = await createProfile({
                wallet: wallet,
                name: name,
                image: image,
                description: description,
            });
            console.debug('[onSubmitCreate] New object ID 0:', result[0].reference.objectId);
            console.debug('[onSubmitCreate] New object ID 1:', result[1].reference.objectId);
            // TODO: fetchProfileObjectId and setProfileAddress
        } catch(error: any) {
            props.setSuiError(error.message);
        }
        setWaiting(false);
    };

    return <div id='page' className='create-profile-card'>
        <AddressWidget
            profileAddress={props.profileAddress}
            setProfileAddress={props.setProfileAddress}
            suiError={props.suiError}
            setSuiError={props.setSuiError}
        />
        <div className='form-wrap'>
        <form onSubmit={onSubmitCreate}>
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
            <button type='submit'
                className={'btn'+(waiting ? 'waiting' : '')}
                disabled={waiting}
            >
                CREATE PROFILE
            </button>
        </form>
        </div>
        { props.suiError && <div className='error'>⚠️ SUI ERROR:<br/>{props.suiError}</div> }
    </div>;
}
