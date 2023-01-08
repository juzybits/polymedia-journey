import React, { useState } from 'react';

import { FindDoor } from './FindDoor';
import { KnockDoor } from './KnockDoor';
import { MeetGrog } from './MeetGrog';
import { MintAccount } from './MintAccount';
import { Home } from './Home';

export function App(props: any)
{
    const [stage, setStage] = useState(0);

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
        view = <MintAccount nextStage={nextStage} />;
    }
    return <>{view}</>;
}
