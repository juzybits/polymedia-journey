import { useEffect } from 'react';
import { useWalletKit } from '@mysten/wallet-kit';
import { PolymediaProfile, ProfileManager } from '@polymedia/profile-sdk';

import { Card } from './components/Card';
import './5_ShowProfileCard.less';

export type ShowProfileCardProps = {
    nextStage: () => void,
    prevStage: () => void,
    addressWidget: React.ReactNode,
    profile: PolymediaProfile|null|undefined,
    profileManager: ProfileManager,
    suiError: string,
}
export const ShowProfileCard: React.FC<ShowProfileCardProps> = ({
    nextStage,
    prevStage,
    addressWidget,
    profile,
    profileManager,
    suiError,
}) => {
    const { disconnect } = useWalletKit();

    useEffect(() => {
        document.body.className = 'bg-library';
    }, []);

    useEffect(() => {
        if (!profile) {
            prevStage();
        }
    }, [profile]);

    return <div id='page' className='show-profile-card'>
        {profile && <>
            {addressWidget}
            <Card
                profile={profile}
                registryId={profileManager.getRegistryId()}
            />
            <div className='action-buttons'>
                <button className='btn' onClick={nextStage}>USE THIS PROFILE</button>
                <button className='btn' onClick={disconnect}>CHANGE WALLET</button>
            </div>
        </> }
        { suiError && <div className='sui-error'>⚠️ SUI ERROR:<br/>{suiError}</div> }
    </div>;
}
