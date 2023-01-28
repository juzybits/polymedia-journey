import { useEffect } from 'react';
import { ethos, EthosConnectStatus } from 'ethos-connect';
import { findProfileObjectIds } from '@polymedia/profile-sdk';

import { shorten } from '../lib/common';

export function AddressWidget(props: any)
{
    const { status, wallet } = ethos.useWallet();

    const fetchProfileObjectId = async (lookupAddress: string) => {
        try {
            const objectIds: Map<string,string> = await findProfileObjectIds({
                lookupAddresses: [ lookupAddress ],
            });
            if (objectIds.has(lookupAddress)) {
                const profileAddress = objectIds.get(lookupAddress) as string;
                console.log('[fetchProfileObjectId] Found profile:', profileAddress);
                props.setProfileAddress(profileAddress);
            } else {
                console.log('[fetchProfileObjectId] Profile not found');
                props.setProfileAddress('does_not_exist');
            }
        } catch(error: any) {
            props.setSuiError(error.message);
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

    return <div className='address-widget' onClick={isConnected ? wallet.disconnect: ethos.showSignInModal}>
        {isConnected ? shorten(wallet.address) : 'Not connected'}
    </div>;
}
