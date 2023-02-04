import { useEffect, useState } from 'react';
import { ethos } from 'ethos-connect';
import { PolymediaProfile } from '@polymedia/profile-sdk';

import { AddressWidget } from './components/AddressWidget';
import { Card } from './components/Card';
import './5_ShowProfileCard.less';

export function ShowProfileCard(props: any)
{
    const {wallet} = ethos.useWallet();
    const [profileObj, setProfileObj] = useState<PolymediaProfile|null>(null);

    const fetchProfileObject = () => {
        props.profileManager.getProfileObjects({
            objectIds: [props.profileAddress]
        })
        .then((profiles: PolymediaProfile[]) => {
            setProfileObj(profiles[0]);
        })
        .catch((error: any) => {
            props.setSuiError(error.message);
        });
    };

    const disconnect = async () => {
        wallet && await wallet.disconnect();
        props.setProfileAddress('unknown');
        props.prevStage();
    };

    useEffect(() => {
        document.body.className = 'bg-library';
        fetchProfileObject();
    }, []);

    useEffect(() => {
        if (props.profileAddress == 'does_not_exist') {
            props.prevStage();
            return;
        }
        fetchProfileObject();
    }, [props.profileAddress]);

    return <div id='page' className='show-profile-card'>
        {profileObj && <>
            <AddressWidget
                profileAddress={props.profileAddress}
                setProfileAddress={props.setProfileAddress}
                profileManager={props.profileManager}
                suiError={props.suiError}
                setSuiError={props.setSuiError}
            />
            <Card
                profile={profileObj}
                registryId={props.profileManager.getRegistryId()}
            />
            <div className='action-buttons'>
                <button className='btn' onClick={props.nextStage}>USE THIS PROFILE</button>
                <button className='btn' onClick={disconnect}>CHANGE WALLET</button>
            </div>
        </> }
        { props.suiError && <div className='sui-error'>⚠️ SUI ERROR:<br/>{props.suiError}</div> }
    </div>;
}
