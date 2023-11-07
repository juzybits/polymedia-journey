import { useWalletKit } from '@mysten/wallet-kit';
import { shortenAddress } from '@polymedia/webutils';

export const AddressWidget: React.FC<{}> = ({}) => {
    const { currentAccount, disconnect  } = useWalletKit();

    return <div id='address-widget'
         onClick={ currentAccount ? disconnect : undefined }>
        {currentAccount ? shortenAddress(currentAccount.address, 4, 4, '0x') : 'Not connected'}
    </div>;
}
