import { useEffect, useState, SyntheticEvent } from 'react';

import { isImageUrl } from './lib/common';
import './4_CreateProfileCard.less';

export function CreateProfileCard(props: any) {

    useEffect(() => {
        document.body.className = 'bg-library dark';
    }, []);

    const [waiting, setWaiting] = useState(false);
    const [loading, setLoading] = useState(true);

    // Inputs
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');

    // Input errors
    const [nameError, setNameError] = useState('');
    const [imageError, setImageError] = useState('');

    useEffect(() => {
        if (props.profile === undefined) { // fetching profile in progress
            setLoading(true);
        } else
        if (props.profile === null) { // no profile was found
            setLoading(false);
        } else { // found profile
            props.nextStage();
        }
    }, [props.profile]);

    const validateForm = async (): Promise<boolean> => {
        let isValid = true;
        if (name.length < 3) {
            setNameError('Too short');
            isValid = false;
        } else if (name.length > 50) {
            setNameError('Too long');
            isValid = false;
        }
        if (image.length > 0 && !await isImageUrl(image)) {
            setImageError('Not an image');
            isValid = false;
        }
        return isValid;
    };

    const onSubmitCreate = async (e: SyntheticEvent) => {
        e.preventDefault();
        setWaiting(true);
        props.setSuiError('');

        if (!await validateForm()) {
            setWaiting(false);
            return;
        }

        console.debug(`[onSubmitCreate] Attempting to create profile: ${name}`);

        try {
            const profileObjectId = await props.profileManager.createProfile({
                wallet: props.wallet,
                name: name,
                image: image,
                description: description,
            });
            console.debug('[onSubmitCreate] New profile object ID:', profileObjectId);
            await props.fetchAndSetProfile(profileObjectId);
        } catch(error: any) {
            props.setSuiError(error.message);
        }
        setWaiting(false);
    };

    const Loading = () => {
        return <div className='loading'>Loading...</div>;
    };

    return <div id='page' className='create-profile-card'>
        {props.addressWidget}
        { loading ? <Loading /> :
        <div className='form-wrap'>
        <form onSubmit={onSubmitCreate}>
            <div className={'field' + (nameError && ' error')}>
                <label className='mario' htmlFor='field-name'>YOUR NAME</label>
                <input type='text' id='field-name'
                    spellCheck='false' autoCorrect='off' autoComplete='off'
                    className={waiting ? 'disabled' : ''}
                    value={name} onChange={e => {
                        props.suiError.length && props.setSuiError('');
                        nameError.length && setNameError('');
                        setName(e.target.value);
                    }}
                />
                <div className='field-error'>{nameError}</div>
            </div>
            <div className={'field' + (imageError && ' error')}>
                <label className='mario' htmlFor='field-image'>PROFILE PICTURE URL</label>
                <input type='text' id='field-image'
                    autoCorrect='off' autoComplete='off'
                    className={waiting ? 'disabled' : ''}
                    value={image} onChange={e => {
                        props.suiError.length && props.setSuiError('');
                        imageError.length && setImageError('');
                        setImage(e.target.value);
                    }}
                />
                <div className='field-error'>{imageError}</div>
            </div>
            <div className='field'>
                <label className='mario' htmlFor='field-description'>DESCRIPTION / SOCIALS</label>
                <textarea id='field-description'
                    value={description} onChange={e => setDescription(e.target.value)}
                    className={waiting ? 'disabled' : ''}
                ></textarea>
            </div>
            <button type='submit'
                className={'btn'+(waiting ? ' disabled' : '')}
                disabled={waiting}
            >
                CREATE PROFILE
            </button>
        </form>
        </div>
        }
        { props.suiError && <div className='sui-error'>⚠️ SUI ERROR:<br/>{props.suiError}</div> }
    </div>;
}
