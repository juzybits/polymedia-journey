import { useEffect, FC } from 'react';
import { SuiAddress } from '@mysten/sui.js';
import { useWalletKit } from '@mysten/wallet-kit';
import { PolymediaProfile } from '@polymedia/profile-sdk';

import { shorten } from '../lib/common';

export type AddressWidgetProps = {
    fetchAndSetProfile: (lookupAddress: SuiAddress|null) => Promise<PolymediaProfile|null|undefined>,
    setSuiError: React.Dispatch<React.SetStateAction<string>>,
}
export const AddressWidget: FC<AddressWidgetProps> = ({
    fetchAndSetProfile,
    setSuiError,
}) => {
    const { currentAccount, disconnect  } = useWalletKit();
    useEffect(() => {
        setSuiError('');
        fetchAndSetProfile(currentAccount);
    }, [currentAccount]);

    return <>
        <div className='address-widget'
             onClick={ currentAccount ? disconnect : undefined }>
            {currentAccount ? shorten(currentAccount) : 'Not connected'}
        </div>

    </>;
}
