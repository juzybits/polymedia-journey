import { useEffect } from 'react';

import { AddressWidget } from './components/AddressWidget';
import '../css/5_ShowProfileCard.less';

export function ShowProfileCard(props: any)
{
    useEffect(() => {
        document.body.className = 'bg-grass';
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
        <div className='paragraph'>
        </div>
        { props.suiError && <div className='error'>⚠️ SUI ERROR:<br/>{props.suiError}</div> }
    </div>;
}
