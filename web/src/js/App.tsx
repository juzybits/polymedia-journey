import { useState } from 'react';
import { EthosConnectProvider } from 'ethos-connect';

import { Home } from './0_Home';
import { FindDoor } from './1_FindDoor';
import { KnockDoor } from './2_KnockDoor';
import { MeetGrog } from './3_MeetGrog';
import { CreateProfileCard } from './4_CreateProfileCard';
import { ShowProfileCard } from './5_ShowProfileCard';

import imgLogo from '../img/logo.png';

export function App()
{
    const [stage, setStage] = useState(2);
    const [profileAddress, setProfileAddress] = useState('unknown');
    const [suiError, setSuiError] = useState('');

    const nextStage = () => {
        setStage(stage+1);
    };

    const prevStage = () => {
        setStage(stage-1);
    };

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
        view = <CreateProfileCard nextStage={nextStage}
            profileAddress={profileAddress}
            setProfileAddress={setProfileAddress}
            suiError={suiError}
            setSuiError={setSuiError}
        />;
    } else if (stage === 5) {
        view = <ShowProfileCard nextStage={nextStage} prevStage={prevStage}
            profileAddress={profileAddress}
            setProfileAddress={setProfileAddress}
            suiError={suiError}
            setSuiError={setSuiError}
        />;
    }
    return <EthosConnectProvider
        ethosConfiguration={{hideEmailSignIn: true}}
        dappName='Journey to Mount Sogol'
        dappIcon={<img src={imgLogo} alt='Polymedia logo' />}
        connectMessage='Journey to Mount Sogol'
    >{view}</EthosConnectProvider>;
}
