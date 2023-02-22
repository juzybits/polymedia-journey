import { useEffect, useState, SyntheticEvent } from 'react';
import { SuiAddress } from '@mysten/sui.js';
import { useWalletKit, ConnectModal } from '@mysten/wallet-kit';
import { PolymediaProfile, ProfileManager } from '@polymedia/profile-sdk';

import { isImageUrl } from './lib/common';
import './4_CreateProfileCard.less';

export type CreateProfileCardProps = {
    fetchAndSetProfile: (lookupAddress: SuiAddress|null) => Promise<void>,
    nextStage: () => void,
    addressWidget: React.ReactNode,
    profile: PolymediaProfile|null|undefined,
    profileManager: ProfileManager,
    suiError: string,
    setSuiError: React.Dispatch<React.SetStateAction<string>>,
}
export const CreateProfileCard: React.FC<CreateProfileCardProps> = ({
    fetchAndSetProfile,
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

    const { currentAccount, disconnect, signAndExecuteTransaction } = useWalletKit();

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
        resetErrors();
        if (!await validateForm()) {
            setWaiting(false);
            return;
        }
        console.debug(`[onSubmitCreate] Attempting to create profile: ${name}`);
        try {
            const profileObjectId = await profileManager.createProfile({
                // @ts-ignore
                signAndExecuteTransaction,
                name,
                url: image,
                description,
            });
            console.debug('[onSubmitCreate] New profile object ID:', profileObjectId);
            await fetchAndSetProfile(currentAccount);
        } catch(error: any) {
            const errorString = String(error.stack || error.message || error);
            console.warn(errorString);
            setSuiError(errorString);
        }
        setWaiting(false);
    };

    const resetErrors = () => {
        suiError && setSuiError('');
        nameError && setNameError('');
        imageError && setImageError('');
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
        view = <div className='form-wrap'>
        <form onSubmit={onSubmitCreate}>
            <div className={'field' + (nameError && ' error')}>
                <label className='mario' htmlFor='field-name'>YOUR NAME</label>
                <input type='text' id='field-name'
                    spellCheck='false' autoCorrect='off' autoComplete='off'
                    className={waiting ? 'disabled' : ''}
                    value={name}
                    onChange={e => {
                        resetErrors();
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
                    value={image}
                    onChange={e => {
                        resetErrors();
                        setImage(e.target.value);
                    }}
                />
                <div className='field-error'>{imageError}</div>
            </div>
            <div className='field'>
                <label className='mario' htmlFor='field-description'>DESCRIPTION / SOCIALS</label>
                <textarea id='field-description'
                    className={waiting ? 'disabled' : ''}
                    value={description}
                    onChange={e => {
                        resetErrors();
                        setDescription(e.target.value);
                    }}
                ></textarea>
            </div>
            <button type='submit'
                className={'btn'+(waiting ? ' disabled' : '')}
                disabled={waiting}
            >
                CREATE PROFILE
            </button>
            <button className='btn last' onClick={(e) => { e.preventDefault(); resetErrors(); disconnect(); }}>
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
