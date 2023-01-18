import { useEffect, useState } from 'react';
import { ethos, EthosConnectStatus } from 'ethos-connect';

import { findProfileObjectIds } from '@polymedia/profile-sdk';
import { Nav } from './components/Nav';
import '../css/5_ShowProfileCard.less';

export function ShowProfileCard(props: any)
{
    useEffect(() => {
        document.body.className = 'bg-stars';
    }, []);

    const [suiError, setSuiError] = useState('');
    const [profileAddr, setProfileAddr] = useState('unknown');
    const { status, wallet } = ethos.useWallet();

    // TODO: dedup
    const fetchProfileObjectId = async (lookupAddress: string) => {
        try {
            const objectIds: Map<string,string> = await findProfileObjectIds({
                lookupAddresses: [ lookupAddress ],
            });
            if (objectIds.has(lookupAddress)) {
                const profileAddress = objectIds.get(lookupAddress) as string;
                console.log('[fetchProfileObjectId] Found profile:', profileAddress);
                setProfileAddr(profileAddress);
            } else {
                console.log('[fetchProfileObjectId] Profile not found');
                setProfileAddr('does_not_exist');
            }
        } catch(error: any) {
            setSuiError(error.message);
        }
    };

    const isConnected = status==EthosConnectStatus.Connected && wallet && wallet.address;
    useEffect(() => {
        if (!isConnected) {
            ethos.showSignInModal();
        } else {
            fetchProfileObjectId(wallet.address);
        }
    }, [isConnected]);

    useEffect(() => {
        if (profileAddr == 'does_not_exist') {
            props.prevStage();
        }
    }, [profileAddr]);

    return <div id='page' className='show-profile-card'>
        <Nav />
        profile addy: <a target="_blank" href={`https://explorer.sui.io/object/${profileAddr}`}>{profileAddr}</a>
        <div className='paragraph'>
        </div>
        { suiError && <div className='error'>⚠️ SUI ERROR:<br/>{suiError}</div> }
    </div>;
}
