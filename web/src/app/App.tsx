import { useEffect, useState } from 'react';
import { Connection, JsonRpcProvider, SuiAddress } from '@mysten/sui.js';
import { WalletKitProvider, useWalletKit } from '@mysten/wallet-kit';
import { NetworkName, NetworkSelector, isLocalhost, loadNetwork, loadRpcConfig } from '@polymedia/webutils';
import { ProfileManager, PolymediaProfile } from '@polymedia/profile-sdk';

import { AddressWidget } from './components/AddressWidget';
import { Home } from './0_Home';
import { FindDoor } from './1_FindDoor';
import { KnockDoor } from './2_KnockDoor';
import { MeetGrog } from './3_MeetGrog';
import { CreateProfileCard } from './4_CreateProfileCard';
import { ShowProfileCard } from './5_ShowProfileCard';
import { GrogExplains } from './6_GrogExplains';
import { MintEarlyAdopterCard } from './7_MintEarlyAdopterCard';
import { GrogBye } from './8_GrogBye';

import './App.less';

// import FingerprintJS from '@fingerprintjs/fingerprintjs';
// const fingerprintPromise = FingerprintJS.load({monitoring: false});

export const AppWrap: React.FC = () =>
    <WalletKitProvider><App /></WalletKitProvider>;

export type Quest = {
    // fingerprint: string;
    cheat: boolean;
    findDoorStart: number;
    findDoorEnd: number;
    findDoorClicks: number;
    knockDoorStart: number;
    knockDoorEnd: number;
    knockDoorClicks: number;
}

const quest: Quest = {
    // fingerprint: '',
    cheat: false,
    findDoorStart: 0,
    findDoorEnd: 0,
    findDoorClicks: 0,
    knockDoorStart: 0,
    knockDoorEnd: 0,
    knockDoorClicks: 0,
};

export function App()
{
    const [stage, setStage] = useState(0);
    const [profile, setProfile] = useState<PolymediaProfile|null|undefined>(undefined);
    const [earlyAdopterCardId, setEarlyAdopterCardId] = useState<string|null|undefined>(undefined);
    const [suiError, setSuiError] = useState('');
    const [network, setNetwork] = useState<NetworkName|null>(null);
    const [rpcProvider, setRpcProvider] = useState<JsonRpcProvider|null>(null);
    const [profileManager, setProfileManager] = useState<ProfileManager|null>(null);
    const [isInitialized, setIsInitialized] = useState(false);
    const { currentAccount  } = useWalletKit();
    const showNetworkSelector = isLocalhost();

    useEffect(() => {
        async function initialize() {
            const network = isLocalhost() ? loadNetwork() : 'mainnet';
            const rpcConfig = await loadRpcConfig({network, noFetch: true});
            const rpcProvider = new JsonRpcProvider(new Connection(rpcConfig));
            setNetwork(network);
            setRpcProvider(rpcProvider);
            setProfileManager( new ProfileManager({network, rpcProvider}) );
            setIsInitialized(true);
        };
        initialize();
        // fingerprintPromise
        // .then(agent => agent.get())
        // .then(result => {
        //     quest.fingerprint = result.visitorId;
        // });
    }, []);

    useEffect(() => {
        setSuiError('');
        if (!isInitialized || !currentAccount) {
            setProfile(undefined);
        } else if (!profile || (profile.owner !== currentAccount.address)) {
            fetchAndSetProfile(currentAccount.address);
        }
    }, [isInitialized, currentAccount]);

    const fetchAndSetProfile = async (lookupAddress: SuiAddress): Promise<PolymediaProfile|null|undefined> =>
    {
        if (!profileManager) {
            setProfile(undefined);
            return undefined;
        }
        try {
            const profiles: Map<SuiAddress, PolymediaProfile|null> = await profileManager.getProfiles({
                lookupAddresses: [lookupAddress],
                useCache: false,
            });
            if (profiles.has(lookupAddress)) {
                const profile = profiles.get(lookupAddress);
                console.debug('[fetchAndSetProfile] Found profile:', profile ? profile.id : null);
                setProfile(profile);
                return profile;
            } else {
                console.debug('[fetchAndSetProfile] Profile not found');
                setProfile(null);
                return null;
            }
        } catch(error: any) {
            setSuiError(error.message);
        }
    };

    if (!isInitialized
        // only checking these so TS doesn't complain
        || !network || !rpcProvider || !profileManager) {
        return <></>;
    }

    const nextStage = () => {
        setStage(stage+1);
        window.scrollTo(0, 0);
    };

    const prevStage = () => {
        setStage(stage-1);
        window.scrollTo(0, 0);
    };

    // HTML

    const addressWidget = <AddressWidget />;
    let view;
    if (stage === 0) {
        view = <Home nextStage={nextStage} />;
    } else if (stage === 1) {
        view = <FindDoor nextStage={nextStage} quest={quest} />;
    } else if (stage === 2) {
        view = <KnockDoor nextStage={nextStage} quest={quest} />;
    } else if (stage === 3) {
        view = <MeetGrog nextStage={nextStage} />;
    } else if (stage === 4) {
        view = <CreateProfileCard
                nextStage={nextStage}
                addressWidget={addressWidget}
                profile={profile}
                setProfile={setProfile}
                profileManager={profileManager}
                suiError={suiError}
                setSuiError={setSuiError}
            />;
    } else if (stage === 5) {
        view = <ShowProfileCard
                network={network}
                nextStage={nextStage}
                prevStage={prevStage}
                addressWidget={addressWidget}
                profile={profile}
                profileManager={profileManager}
                suiError={suiError}
            />;
    } else if (stage === 6) {
        view = <GrogExplains
                network={network}
                rpcProvider={rpcProvider}
                nextStage={nextStage}
                prevStage={prevStage}
                profile={profile}
                setEarlyAdopterCardId={setEarlyAdopterCardId}
                suiError={suiError}
                setSuiError={setSuiError}
            />;
    } else if (stage === 7) {
        view = <MintEarlyAdopterCard
                network={network}
                rpcProvider={rpcProvider}
                nextStage={nextStage}
                prevStage={prevStage}
                profile={profile}
                earlyAdopterCardId={earlyAdopterCardId}
                suiError={suiError}
                setSuiError={setSuiError}
                quest={quest}
            />;
    } else if (stage === 8) {
        view = <GrogBye
                network={network}
                profile={profile}
            />;
    }
    return <>
        {showNetworkSelector && <NetworkSelector currentNetwork={network} />}
        {view}
    </>;
}
