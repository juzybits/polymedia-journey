import { useState } from 'react';
import { EthosConnectProvider } from 'ethos-connect';

import { FindDoor } from './FindDoor';
import { KnockDoor } from './KnockDoor';
import { MeetGrog } from './MeetGrog';
import { CreateProfileCard } from './CreateProfileCard';
import { Home } from './Home';

import imgLogo from '../img/logo.png';

export function App()
{
    const [stage, setStage] = useState(3);

    const nextStage = () => {
        setStage(stage+1);
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
        view = <CreateProfileCard nextStage={nextStage} />;
    }
    return <EthosConnectProvider
        ethosConfiguration={{hideEmailSignIn: true}}
        dappName='Journey to Mount Sogol'
        dappIcon={<img src={imgLogo} alt='Polymedia logo' />}
        connectMessage='Journey to Mount Sogol'
    >{view}</EthosConnectProvider>;
}
