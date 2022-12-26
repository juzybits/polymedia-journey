import React, { useState } from 'react';

import { Castle } from './Castle';
import { Doors } from './Doors';
import { Home } from './Home';

export function App(props: any)
{
    const [stage, setStage] = useState(1);

    const nextStage = () => {
        setStage(stage+1);
    };

    let view;
    if (stage === 0) {
        view = <Home nextStage={nextStage} />;
    } else if (stage === 1) {
        view = <Doors nextStage={nextStage} />;
    } else if (stage === 2) {
        view = <Castle nextStage={nextStage} />;
    }
    return <>{view}</>;
}
