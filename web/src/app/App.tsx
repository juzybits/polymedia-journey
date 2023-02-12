import { useState } from 'react';
import { SuiAddress } from '@mysten/sui.js';
import { WalletKitProvider } from '@mysten/wallet-kit';
import { ProfileManager, PolymediaProfile } from '@polymedia/profile-sdk';

import { AddressWidget } from './components/AddressWidget';
import { Home } from './0_Home';
import { FindDoor } from './1_FindDoor';
import { KnockDoor } from './2_KnockDoor';
import { MeetGrog } from './3_MeetGrog';
import { CreateProfileCard } from './4_CreateProfileCard';
import { ShowProfileCard } from './5_ShowProfileCard';
import { GrogExplains } from './6_GrogExplains';
import { MintCardEarlyAdopter } from './7_MintCardEarlyAdopter';
import { GrogBye } from './8_GrogBye';

import './App.less';

export function App()
{
    const [stage, setStage] = useState(4);
    // undefined = we haven't looked for the user profile yet
    // null = the user's address does not have a profile associated to it
    const [profile, setProfile] = useState<PolymediaProfile|null|undefined>(undefined);
    const [suiError, setSuiError] = useState('');
    const networkTmp = getNetwork();
    const [network, setNetwork] = useState(networkTmp);
    const [profileManager] = useState( new ProfileManager(networkTmp) );

    const fetchAndSetProfile = async (lookupAddress: SuiAddress|null) => {
        if (!lookupAddress) {
            setProfile(undefined);
            return;
        }
        try {
            const profiles: Map<SuiAddress, PolymediaProfile|null> = await profileManager.getProfiles({
                lookupAddresses: [lookupAddress],
                useCache: false,
            });
            if (profiles.has(lookupAddress)) {
                const profile = profiles.get(lookupAddress);
                console.log('[fetchAndSetProfile] Found profile:', profile ? profile.id : null);
                setProfile(profile);
            } else {
                console.log('[fetchAndSetProfile] Profile not found');
                setProfile(null);
            }
        } catch(error: any) {
            setSuiError(error.message);
        }
    };

    const unsetProfile = () => {
        setProfile(undefined);
    };

    // Return either 'devnet' or 'testnet'
    function getNetwork(): string {
        // Read 'network' URL parameter
        const params = new URLSearchParams(window.location.search);
        // Delete query string
        window.history.replaceState({}, document.title, window.location.pathname);
        let newNetwork = params.get('network');
        if (newNetwork === 'devnet' || newNetwork === 'testnet') {
            // Update localStorage
            localStorage.setItem('polymedia.network', newNetwork);
            return newNetwork;
        } else {
            return localStorage.getItem('polymedia.network') || 'devnet';
        }
    }
    const toggleNetwork = () => {
        const newNetwork = network==='devnet' ? 'testnet' : 'devnet';
        setNetwork(newNetwork);
        localStorage.setItem('polymedia.network', newNetwork);
        window.location.reload();
    };
    // NOTE: getNetwork and toggleNetwork are duplicated in gotbeef and chat

    const nextStage = () => {
        setStage(stage+1);
        window.scrollTo(0, 0);
    };

    const prevStage = () => {
        setStage(stage-1);
        window.scrollTo(0, 0);
    };

    // HTML

    const addressWidget = <AddressWidget
        fetchAndSetProfile={fetchAndSetProfile}
        unsetProfile={unsetProfile}
        />;

    let view;
    if (stage === 0) {
        view = <Home nextStage={nextStage} />;
    } else if (stage === 1) {
        view = <FindDoor nextStage={nextStage} />;
    } else if (stage === 2) {
        view = <KnockDoor nextStage={nextStage} />;
    } else if (stage === 3) {
        view = <MeetGrog nextStage={nextStage} />;
    } else if (stage === 4) {
        view = <CreateProfileCard
                fetchAndSetProfile={fetchAndSetProfile}
                nextStage={nextStage}
                addressWidget={addressWidget}
                profile={profile}
                profileManager={profileManager}
                suiError={suiError}
                setSuiError={setSuiError}
            />;
    } else if (stage === 5) {
        view = <ShowProfileCard
                nextStage={nextStage}
                prevStage={prevStage}
                addressWidget={addressWidget}
                profile={profile}
                profileManager={profileManager}
                suiError={suiError}
            />;
    } else if (stage === 6) {
        view = <GrogExplains network={network} nextStage={nextStage} />;
    } else if (stage === 7) {
        view = <MintCardEarlyAdopter nextStage={nextStage} />;
    } else if (stage === 8) {
        view = <GrogBye nextStage={nextStage} />;
    }
    return <WalletKitProvider>
        <div id='network-widget'>
            <a className='switch-btn' onClick={toggleNetwork}>{network}</a>
        </div>
        {view}
    </WalletKitProvider>;
}
