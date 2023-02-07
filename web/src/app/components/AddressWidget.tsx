import { useEffect, FC } from 'react';
import { SuiAddress } from '@mysten/sui.js';
import { useWalletKit, ConnectButton } from '@mysten/wallet-kit';

export type AddressWidgetProps = {
    unsetProfile: () => void,
    fetchAndSetProfile: (lookupAddress: SuiAddress|null) => Promise<void>,
}
export const AddressWidget: FC<AddressWidgetProps> = ({
    fetchAndSetProfile,
}) => {
    const { currentAccount  } = useWalletKit();
    useEffect(() => {
        fetchAndSetProfile(currentAccount);
    }, [currentAccount]);

    return <div className='address-widget'>
        <ConnectButton
            connectText={<>Connect</>}
            size="md"
        />
    </div>;
}
