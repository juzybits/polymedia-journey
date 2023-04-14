import { useWalletKit } from '@mysten/wallet-kit';

import { shorten } from '../lib/common';

export const AddressWidget: React.FC<{}> = ({}) => {
    const { currentAccount, disconnect  } = useWalletKit();

    return <div id='address-widget'
         onClick={ currentAccount ? disconnect : undefined }>
        {currentAccount ? shorten(currentAccount.address) : 'Not connected'}
    </div>;
}
