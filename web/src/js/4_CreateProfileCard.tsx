import { useEffect, useState } from 'react';

import { AddressWidget } from './components/AddressWidget';
import '../css/4_CreateProfileCard.less';

export function CreateProfileCard(props: any) {

    useEffect(() => {
        document.body.className = 'bg-library dark';
    }, []);

    // Inputs
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');

    // Input errors
    const [nameError, _setNameError] = useState(''); // TODO validation
    const [imageError, _setImageError] = useState(''); // TODO validation

    useEffect(() => {
        if (props.profileAddress != 'unknown' && props.profileAddress != 'does_not_exist') {
            props.nextStage();
        }
    }, [props.profileAddress]);

    return <div id='page' className='create-profile-card'>
        <AddressWidget
            profileAddress={props.profileAddress}
            setProfileAddress={props.setProfileAddress}
            suiError={props.suiError}
            setSuiError={props.setSuiError}
        />
        <div className='form-wrap'>
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
        { props.suiError && <div className='error'>⚠️ SUI ERROR:<br/>{props.suiError}</div> }
    </div>;
}
