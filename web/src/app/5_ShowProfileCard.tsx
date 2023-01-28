import { useEffect, useState } from 'react';
import { ethos } from 'ethos-connect';

import { getProfileObjects, PolymediaProfile } from '@polymedia/profile-sdk';

import { AddressWidget } from './components/AddressWidget';
import { Card } from './components/Card';
import './5_ShowProfileCard.less';

export function ShowProfileCard(props: any)
{
    const {wallet} = ethos.useWallet();
    const [profileObj, setProfileObj] = useState<PolymediaProfile|null>(null);

    const fetchProfileObject = () => {
        getProfileObjects({
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
        }
        fetchProfileObject();
    }, [props.profileAddress]);

    return <div id='page' className='show-profile-card'>
        <AddressWidget
            profileAddress={props.profileAddress}
            setProfileAddress={props.setProfileAddress}
            suiError={props.suiError}
            setSuiError={props.setSuiError}
        />
        profile addy: <a target="_blank" href={`https://explorer.sui.io/object/${props.profileAddress}?network=devnet`}>{props.profileAddress}</a>
        <Card
            profile={profileObj}
        />
        <div className='action-buttons'>
            <button className='btn'>USE THIS PROFILE</button>
            <button className='btn' onClick={disconnect}>CHANGE WALLET</button>
        </div>
        { props.suiError && <div className='error'>⚠️ SUI ERROR:<br/>{props.suiError}</div> }
    </div>;
}
