import React, { useState } from 'react';

import { FindDoor } from './FindDoor';
import { KnockDoor } from './KnockDoor';
import { MeetGrog } from './MeetGrog';
import { CreateAccount } from './CreateAccount';
import { Home } from './Home';

export function App(props: any)
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
        view = <CreateAccount nextStage={nextStage} />;
    }
    return <>{view}</>;
}
