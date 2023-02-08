import { useEffect, FC } from 'react';
import { SuiAddress } from '@mysten/sui.js';
import { useWalletKit } from '@mysten/wallet-kit';

import { shorten } from '../lib/common';

export type AddressWidgetProps = {
    unsetProfile: () => void,
    fetchAndSetProfile: (lookupAddress: SuiAddress|null) => Promise<void>,
}
export const AddressWidget: FC<AddressWidgetProps> = ({
    fetchAndSetProfile,
}) => {
    const { currentAccount, disconnect  } = useWalletKit();
    useEffect(() => {
        fetchAndSetProfile(currentAccount);
    }, [currentAccount]);

    return <>
        <div className='address-widget'
             onClick={ currentAccount ? disconnect : undefined }>
            {currentAccount ? shorten(currentAccount) : 'Not connected'}
        </div>

    </>;
}
