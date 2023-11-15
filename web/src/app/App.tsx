import { useEffect, useState } from 'react';
import { SuiClient } from '@mysten/sui.js/client';
import { useWalletKit } from '@mysten/wallet-kit';
import { NetworkSelector } from '@polymedia/react-components';
import { NetworkName, isLocalhost, loadNetwork, getRpcConfig } from '@polymedia/webutils';
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

import { registerSuiSnapWallet } from "@kunalabs-io/sui-snap-wallet";
registerSuiSnapWallet();

export type Quest = {
    cheat: boolean;
    findDoorStart: number;
    findDoorEnd: number;
    findDoorClicks: number;
    knockDoorStart: number;
    knockDoorEnd: number;
    knockDoorClicks: number;
}

const quest: Quest = {
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
    const [suiClient, setSuiClient] = useState<SuiClient|null>(null);
    const [profileManager, setProfileManager] = useState<ProfileManager|null>(null);
    const [isInitialized, setIsInitialized] = useState(false);
    const { currentAccount  } = useWalletKit();
    const showNetworkSelector = isLocalhost();

    useEffect(() => {
        async function initialize() {
            const network = isLocalhost() ? loadNetwork() : 'mainnet';
            const rpcConfig = await getRpcConfig({network, fetch: false});
            const suiClient = new SuiClient({url: rpcConfig.fullnode});
            setNetwork(network);
            setSuiClient(suiClient);
            setProfileManager( new ProfileManager({network, suiClient}) );
            setIsInitialized(true);
        };
        initialize();
    }, []);

    useEffect(() => {
        setSuiError('');
        if (!isInitialized || !currentAccount) {
            setProfile(undefined);
        } else if (!profile || (profile.owner !== currentAccount.address)) {
            fetchAndSetProfile(currentAccount.address);
        }
    }, [isInitialized, currentAccount]);

    const fetchAndSetProfile = async (lookupAddress: string): Promise<void> =>
    {
        if (!profileManager) {
            setProfile(undefined);
            return;
        }
        try {
            const profiles: Map<string, PolymediaProfile|null> = await profileManager.getProfilesByOwner({
                lookupAddresses: [lookupAddress],
                useCache: false,
            });
            if (profiles.has(lookupAddress)) {
                const profile = profiles.get(lookupAddress);
                console.debug('[fetchAndSetProfile] Found profile:', profile ? profile.id : null);
                setProfile(profile);
                return;
            } else {
                console.debug('[fetchAndSetProfile] Profile not found');
                setProfile(null);
                return;
            }
        } catch(error: any) {
            setSuiError(error.message);
        }
    };

    if (!isInitialized
        // only checking these so TS doesn't complain
        || !network || !suiClient || !profileManager) {
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
                suiClient={suiClient}
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
                suiClient={suiClient}
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
