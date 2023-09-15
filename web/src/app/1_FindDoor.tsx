import { useEffect, useState } from 'react';

import { Quest } from './App';
import imgDoorClosed from '../img/door_closed.webp';
import imgDoorClosedDiff from '../img/door_closed_diff.webp';
import imgBgBricks from '../img/bg-bricks.webp';

import './1_FindDoor.less';

export const FindDoor: React.FC<{
    nextStage: () => void,
    quest: Quest,
}> = ({
    nextStage,
    quest,
}) => {
    useEffect(() => {
        document.body.className = 'bg-castle-wall';
        // Preload images
        (new Image()).src = imgDoorClosed;
        (new Image()).src = imgDoorClosedDiff;
        // Preload next background
        (new Image()).src = imgBgBricks;
        // Reset relevant quest data
        quest.findDoorClicks = 0;
        quest.findDoorStart = 0;
        quest.findDoorEnd = 0;
    }, []);

    const [modal, setModal]: any = useState(null);
    const [act, setAct] = useState('0_intro');
    // keep track of which doors the user tried to open
    const [doors, setDoors] = useState([false,false,false,false,false,false,false,false,false,false,false,false]);
    const [correctDoor, _setCorrectDoor] = useState(Math.floor( Math.random() * 12 ));

    useEffect(() => {
        if (act == '1_game') {
            document.body.className = 'bg-bricks';
        }
    }, [act]);

    const onClickStart = () => {
        quest.findDoorStart = Date.now();
        setAct('1_game');
    };

    const onWrong = (idx: number) => {
        quest.findDoorClicks += 1;
        const closeModal = () => {
            setModal(null);
        };
        setDoors(oldDoors => {
            oldDoors[idx] = true; // mark as tried
            return oldDoors;
        });
        setModal(<div className='modal' onClick={closeModal}>
            <h1 className='mario red guess-result'>Wrong!</h1>
            <div className='guess-result-note'>(click anywhere to continue)</div>
        </div>);
    }

    const onCorrect = () => {
        quest.findDoorClicks += 1;
        quest.findDoorEnd = Date.now();
        const closeModal = () => {
            setModal(null);
            nextStage();
        };
        setModal(<div className='modal' onClick={closeModal}>
            <h1 className='mario green guess-result'>Correct!</h1>
            <div className='guess-result-note'>(click anywhere to continue)</div>
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

    const Intro = () => {
        return <div className='intro'>
            <div className='text-wrap'>
                <h1 className='mario title fade-in-1'>ONE</h1>
                <p className='paragraph narrator fade-in-2'>
                    You arrive to the castle wall.
                </p>
                <p className='paragraph narrator fade-in-3'>
                    As it turns out, the door to The Invisible may be visible, but it's not easy to find...
                    Not because you cannot see it, but because it's hiding in plain sight.
                </p>
                <p className='paragraph narrator fade-in-4'>
                    Your first challenge will be to prove your perspicacious mind:
                    pick the door that stands apart from all the other doors you'll find.
                </p>
            </div>
            <button className='btn last fade-in-5' onClick={onClickStart} >I'm ready</button>
        </div>;
    };

    let contents = <></>;
    if (act=='0_intro') {
        contents = <Intro />;
    } else {
        contents = <>{ modal && modal } <DoorsGrid /></>;
    }

    return <div id='page' className='find-door'>
        {contents}
    </div>;

}
