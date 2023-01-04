import React, { useState } from 'react';

import { KnockDoor } from './KnockDoor';
import { FindDoor } from './FindDoor';
import { Home } from './Home';

export function App(props: any)
{
    const [stage, setStage] = useState(2);

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
    }
    return <>{view}</>;
}
