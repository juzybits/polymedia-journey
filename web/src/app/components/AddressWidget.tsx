import { useEffect, FC } from 'react';
import { SuiAddress } from '@mysten/sui.js';
import { ethos, EthosConnectStatus } from 'ethos-connect';

import { shorten } from '../lib/common';

export type AddressWidgetProps = {
    fetchAndSetProfile: (lookupAddress: SuiAddress) => Promise<void>,
}

export const AddressWidget: FC<AddressWidgetProps> = ({ fetchAndSetProfile }) =>
{
    const { status, wallet } = ethos.useWallet();

    const isConnected = status==EthosConnectStatus.Connected && wallet && wallet.address;
    useEffect(() => {
        if (!isConnected) {
            ethos.showSignInModal();
        } else {
            fetchAndSetProfile(wallet.address);
        }
    }, [isConnected]);

    return <div className='address-widget' onClick={isConnected ? wallet.disconnect: ethos.showSignInModal}>
        {isConnected ? shorten(wallet.address) : 'Not connected'}
    </div>;
}
