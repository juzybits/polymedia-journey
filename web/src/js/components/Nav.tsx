import { ethos, EthosConnectStatus } from 'ethos-connect';

import { shorten } from '../lib/common';

export function Nav()
{
    const { status, wallet } = ethos.useWallet();
    const isConnected = status==EthosConnectStatus.Connected && wallet && wallet.address;
    return <div className='address-widget' onClick={isConnected ? wallet.disconnect: ethos.showSignInModal}>
        {isConnected ? shorten(wallet.address) : 'Not connected'}
    </div>;
}
