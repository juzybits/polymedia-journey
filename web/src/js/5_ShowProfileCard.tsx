import { useEffect, useState } from 'react';

import { getProfileObjects, PolymediaProfile } from '@polymedia/profile-sdk';

import { AddressWidget } from './components/AddressWidget';
import { Card } from './components/Card';
import '../css/5_ShowProfileCard.less';

export function ShowProfileCard(props: any)
{
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
    useEffect(() => {
        document.body.className = 'bg-grass';
        fetchProfileObject();
    }, []);

    useEffect(() => {
        if (props.profileAddress == 'does_not_exist') {
            props.prevStage();
        }
    }, [props.profileAddress]);

    return <div id='page' className='show-profile-card'>
        <AddressWidget
            profileAddress={props.profileAddress}
            setProfileAddress={props.setProfileAddress}
            suiError={props.suiError}
            setSuiError={props.setSuiError}
        />
        profile addy: <a target="_blank" href={`https://explorer.sui.io/object/${props.profileAddress}`}>{props.profileAddress}</a>
        <div>
            <Card
                profile={profileObj}
            />
        </div>
        { props.suiError && <div className='error'>⚠️ SUI ERROR:<br/>{props.suiError}</div> }
    </div>;
}
