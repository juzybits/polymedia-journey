import { useEffect, useState, SyntheticEvent } from 'react';
import { useWalletKit, ConnectModal } from '@mysten/wallet-kit';
import { PolymediaProfile, ProfileManager } from '@polymedia/profile-sdk';

import { isImageUrl } from './lib/common';
import './4_CreateProfileCard.less';

export type CreateProfileCardProps = {
    nextStage: () => void,
    addressWidget: React.ReactNode,
    profile: PolymediaProfile|null|undefined,
    setProfile: React.Dispatch<React.SetStateAction<PolymediaProfile|null|undefined>>,
    profileManager: ProfileManager,
    suiError: string,
    setSuiError: React.Dispatch<React.SetStateAction<string>>,
}
export const CreateProfileCard: React.FC<CreateProfileCardProps> = ({
    setProfile,
    nextStage,
    addressWidget,
    profile,
    profileManager,
    setSuiError,
    suiError,
}) => {

    const [waiting, setWaiting] = useState(false);
    const [loading, setLoading] = useState(true);

    // Inputs
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');

    // Input errors
    const [nameError, setNameError] = useState('');
    const [imageError, setImageError] = useState('');

    const { currentAccount, disconnect, signTransactionBlock } = useWalletKit();

    useEffect(() => {
        document.body.className = 'bg-library dark';
    }, []);

    useEffect(() => {
        if (profile === undefined) { // fetching profile in progress
            setLoading(true);
        } else
        if (profile === null) { // no profile was found
            setLoading(false);
        } else { // found profile
            nextStage();
        }
    }, [profile]);

    const validateForm = (): boolean => {
        let isValid = true;
        if (name.length < 3) {
            setNameError('Too short');
            isValid = false;
        } else if (name.length > 50) {
            setNameError('Too long');
            isValid = false;
        }
        return isValid;
    };

    const onSubmitCreate = async (e: SyntheticEvent) => {
        e.preventDefault();
        setWaiting(true);
        setSuiError('');
        if (!validateForm()) {
            setWaiting(false);
            return;
        }
        console.debug(`[onSubmitCreate] Attempting to create profile: ${name}`);
        try {
            const newProfile = await profileManager.createProfile({
                signTransactionBlock,
                name,
                imageUrl: image,
                description,
            });
            console.debug('[onSubmitCreate] New profile:', newProfile);
            setProfile(newProfile);
        } catch(error: any) {
            const errorString = String(error.stack || error.message || error);
            console.warn(errorString);
            setSuiError(errorString); // TODO: don't show error if user rejected the txn
        } finally {
            setWaiting(false);
        }
    };

    const Loading = () => {
        return <div className='loading'>Loading...</div>;
    };

    let view: React.ReactNode;
    if (!currentAccount) {
        view = <ConnectModal open={true} onClose={()=>{}} />;
    }
    else if (loading) {
        view = <Loading />;
    }
    else {
        const hasFormErrors = !!nameError || !!imageError;
        view = <div className='form-wrap'>
        <form onSubmit={onSubmitCreate}>
            <div className={'field' + (nameError && ' error')}>
                <label className='mario' htmlFor='field-name'>YOUR NAME</label>
                <input type='text' id='field-name'
                    spellCheck='false' autoCorrect='off' autoComplete='off'
                    className={waiting ? 'disabled' : ''}
                    value={name}
                    onChange={e => {
                        setSuiError('');
                        setNameError('');
                        setName(e.target.value);
                    }}
                />
                {nameError && <div className='field-error'>{nameError}</div>}
            </div>
            <div className='field'>
                <label className='mario' htmlFor='field-description'>
                    DESCRIPTION
                    <span className='field-optional'>(optional)</span>
                </label>
                <textarea id='field-description'
                    className={waiting ? 'disabled' : ''}
                    value={description}
                    onChange={e => {
                        setSuiError('');
                        setDescription(e.target.value);
                    }}
                ></textarea>
            </div>
            <div className={'field' + (imageError && ' error')}>
                <label className='mario' htmlFor='field-image'>
                    IMAGE URL
                    <span className='field-optional'>(optional)</span>
                </label>
                <input type='text' id='field-image'
                    autoCorrect='off' autoComplete='off'
                    className={waiting ? 'disabled' : ''}
                    value={image}
                    onChange={e => {
                        setSuiError('');
                        setImage(e.target.value);
                        if (!e.target.value) {
                            setImageError('');
                        } else {
                            isImageUrl(e.target.value)
                            .then(isValid => {
                                if (isValid) { setImageError(''); }
                                else { setImageError("That doesn't look like a valid image URL"); }
                            });
                        }
                    }}
                />
                {imageError && <div className='field-error'>{imageError}</div>}
                <div className='field-info'>Right click the image, then 'Copy Image Address'. To use a picture from your device, first upload it to a service like <a href='https://imgur.com/upload' target='_blank' rel='noopener nofollow noreferrer'>imgur.com</a>, then copy the image address.</div>
            </div>
            <button type='submit'
                className={'btn'+(waiting||hasFormErrors ? ' disabled' : '')}
                disabled={waiting||hasFormErrors}
            >
                CREATE PROFILE
            </button>
            <button className='btn last' onClick={e => {
                    e.preventDefault();
                    setName(''); setNameError('');
                    setImage(''); setImageError('');
                    setDescription('');
                    disconnect();
                }
            }>
                CHANGE WALLET
            </button>
        </form>
        </div>;
    }

    return <div id='page' className='create-profile-card'>
        {addressWidget}
        {view}
        { suiError && <div className='sui-error'>⚠️ SUI ERROR:<br/>{suiError}</div> }
    </div>;
}
