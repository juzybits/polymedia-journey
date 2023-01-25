import { useEffect, useState } from 'react';

import imgDoorClosedDiff from '../img/door_closed_diff.webp';
import imgDoorClosed from '../img/door_closed.webp';

import '../css/1_FindDoor.less';

export function FindDoor(props: any) {
    // MAYBE: record # of attempts and elapsed time
    // MAYBE: add a timer to the UI

    useEffect(() => {
        document.body.className = 'bg-castle-wall';
        // document.body.className = 'bg-bricks';
    }, []);

    const [modal, setModal]: any = useState(null);
    const [act, setAct] = useState('1_intro');
    // keep track of which doors the user tried to open
    const [doors, setDoors] = useState([false,false,false,false,false,false,false,false,false,false,false,false]);
    const [correctDoor, _setCorrectDoor] = useState(Math.floor( Math.random() * 12 ));

    const onWrong = (idx: number) => {
        const closeModal = () => {
            setModal(null);
        };
        setDoors(oldDoors => {
            oldDoors[idx] = true; // mark as tried
            return oldDoors;
        });
        setModal(<div className='modal' onClick={closeModal}>
            <h1 className='mario red guess-result'>Wrong!</h1>
        </div>);
    }

    const onCorrect = () => {
        const closeModal = () => {
            setModal(null);
            props.nextStage();
        };
        setModal(<div className='modal' onClick={closeModal}>
            <h1 className='mario green guess-result'>Correct!</h1>
        </div>);
    }

    const Door = ({ idx, tried }: { idx: number, tried: boolean }) => {
        const imgSrc = idx==correctDoor ? imgDoorClosed : imgDoorClosedDiff;
        const onClick = idx==correctDoor ? onCorrect : () => onWrong(idx);
        return tried
        ? <div className='door-wrap tried'><img src={imgSrc} alt='closed door' /></div>
        : <div className='door-wrap'><img src={imgSrc} alt='closed door' className='hand' onClick={onClick} /></div>;
    }

    const DoorsGrid = () => {
        return (
            <div className='door-grid'>
            { doors.map((tried, idx) => (
                <Door key={idx} idx={idx} tried={tried} />
            )) }
            </div>
        );
    };

    const ModalIntro = () => {
        return <div className='modal'>
            <div className='intro'>
                <h1 className='mario title'>ONE</h1>
                <p className='paragraph'>The door to the invisible may be visible... but it's not easy to find.<br/>That's because the door is hidden in plain sight.</p>
                <p className='paragraph'>Your first challenge will be to prove your perspicacity by finding the door that is different from all the others.</p>
                <button className='btn' onClick={() => setAct('2_game')}>I'm ready</button>
            </div>
        </div>;
    };

    let contents = <></>;
    if (act=='1_intro') {
        contents = <ModalIntro />;
    } else {
        contents = <>{ modal && modal } <DoorsGrid /></>;
    }

    return <div id='page' className='find-door'>
        {contents}
    </div>;

}
