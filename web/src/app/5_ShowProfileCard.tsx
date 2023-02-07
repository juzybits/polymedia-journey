import { useEffect } from 'react';

import { Card } from './components/Card';
import './5_ShowProfileCard.less';

export function ShowProfileCard(props: any)
{
    const disconnect = async () => {
        props.wallet && await props.wallet.disconnect();
        props.prevStage();
    };

    useEffect(() => {
        document.body.className = 'bg-library';
    }, []);

    useEffect(() => {
        if (!props.profile) {
            props.prevStage();
            return;
        }
    }, [props.profile]);

    return <div id='page' className='show-profile-card'>
        {props.profile && <>
            {props.addressWidget}
            <Card
                profile={props.profile}
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
