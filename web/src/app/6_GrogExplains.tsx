import { useEffect } from 'react';
import { SuiClient, SuiMoveObject, SuiObjectResponse } from '@mysten/sui.js/client';
import { PolymediaProfile } from '@polymedia/profile-sdk';
import { NetworkName } from '@polymedia/webutils';
import imgExampleChat from '../img/profile_example_chat.webp';
import imgExampleGotbeef from '../img/profile_example_gotbeef.webp';
import imgWizardBrown from '../img/wizard_brown.webp';

export type GrogExplainsProps = {
    network: NetworkName,
    suiClient: SuiClient,
    nextStage: () => void,
    prevStage: () => void,
    profile: PolymediaProfile|null|undefined,
    setEarlyAdopterCardId: React.Dispatch<React.SetStateAction<string|null|undefined>>,
    suiError: string,
    setSuiError: React.Dispatch<React.SetStateAction<string>>,
}
export const GrogExplains: React.FC<GrogExplainsProps> = ({
    network,
    suiClient,
    nextStage,
    prevStage,
    profile,
    setEarlyAdopterCardId,
    setSuiError,
    suiError,
}) => {
    useEffect(() => {
        document.body.className = 'bg-library';
        setSuiError('');
        fetchAndSetEarlyAdopterCard();
    }, []);

    useEffect(() => {
        if (!profile) {
            prevStage();
        }
    }, [profile]);

    const fetchAndSetEarlyAdopterCard = () => {
        if (!profile) return;

        suiClient.getDynamicFieldObject({
            parentId: profile.id,
            name: {
                type: '0x1::string::String',
                value: 'Polymedia: Early Adopter',
            }
        }).then((resp: SuiObjectResponse) => {
            const notFound = resp.error && resp.error.code === 'dynamicFieldNotFound';
            if (notFound) {
                return;
            }
            if (resp.error || !resp.data) {
                const errMsg = '[fetchAndSetEarlyAdopterCard] unexpected error: '
                    + JSON.stringify(resp.error || 'missing data');
                console.warn(errMsg);
                setSuiError(errMsg);
                return;
            }
            console.debug('[fetchAndSetEarlyAdopterCard] Found card. Response:', resp);
            const objData = resp.data.content as SuiMoveObject;
            const objFields = objData.fields as any;
            setEarlyAdopterCardId(objFields.id.id); // MAYBE: check the object type is ...::journey::Quest
        })
        .catch( (error: any) => {
            console.warn('[fetchAndSetEarlyAdopterCard] Card not found', error.stack);
        });
    };

    /* HTML */

    if (!profile) {
        return <></>;
    }

    return <div id='page' className='grog-explains'>
        <div className='wizard-wrap'>
            <img src={imgWizardBrown} alt='wizard' />
        </div>
        <div>
            <div className='text-wrap'>
                <p className='paragraph dialog fade-in-1'>
                    It's nice to meet you, <i>{profile.name}</i>.
                </p>
                <p className='paragraph dialog fade-in-2'>
                    I see you already created a <a href='https://profile.polymedia.app'
                        target='_blank' rel='noopener'><i>Polymedia Profile</i></a>. Excellent! Your profile is an <i>object</i> that will accompany you everywhere in the Sui Metaverse:
                </p>
                <div className='paragraph narrator profile-usecases fade-in-3'>
                    <a href={'https://chat.polymedia.app/@sui-fans?network='+network} target='_blank' rel='noopener'>
                        chat.polymedia.app
                        <img src={imgExampleChat} alt='chat.polymedia.app' />
                    </a>
                    <a href={'https://gotbeef.polymedia.app?network='+network} target='_blank' rel='noopener'>
                        gotbeef.polymedia.app
                        <img src={imgExampleGotbeef} alt='gotbeef.polymedia.app' />
                    </a>
                </div>
                <div className='paragraph dialog fade-in-3'>
                    Don't see your favorite app? Ask them to integrate <a href='https://profile.polymedia.app' target='_blank' rel='noopener'>Polymedia Profile</a>, it's really easy!
                </div>
                <p className='paragraph dialog fade-in-3'>
                    But there's more.
                </p>
            </div>
            <button className='btn last fade-in-4' onClick={nextStage}>More?!</button>
        </div>
        { suiError && <div className='sui-error'>⚠️ SUI ERROR:<br/>{suiError}</div> }
    </div>;
}
