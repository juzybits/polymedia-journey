import React, { useEffect, useState } from 'react';

import imgDoorClosedDiff from '../img/door_closed_diff.webp';
import imgDoorClosed from '../img/door_closed.webp';
import imgDoorOpen from '../img/door_open.webp';

import '../css/Doors.less';

export function Doors(props: any) {

    useEffect(() => {
        document.body.className = 'bg-bricks';
    }, []);

    const [modal, setModal]: any = useState(null);
    const [act, setAct] = useState('intro');

    const Modal = (props: any) => {
        return <div className='modal'>{props.children}</div>
    };

    const onWrong = () => {
        setModal(<Modal><h1 className='mario red guess-result'>Wrong!</h1></Modal>);
        setTimeout(() => {
            setModal(null);
        }, 1250);
    }

    const onCorrect = () => {
        setModal(<Modal><h1 className='mario green guess-result'>Correct!</h1></Modal>);
        setTimeout(() => {
            setModal(null);
            props.nextStage();
        }, 1250);
    }

    const DoorsGrid = (props: any) => {
        return <div className='door-grid'>
            <div className='door-wrap'><img className='hand' src={imgDoorClosed} onClick={onWrong} alt='closed door' /></div>
            <div className='door-wrap'><img className='hand' src={imgDoorClosed} onClick={onWrong} alt='closed door' /></div>
            <div className='door-wrap'><img className='hand' src={imgDoorClosed} onClick={onWrong} alt='closed door' /></div>
            <div className='door-wrap'><img className='hand' src={imgDoorClosed} onClick={onWrong} alt='closed door' /></div>
            <div className='door-wrap'><img className='hand' src={imgDoorClosed} onClick={onWrong} alt='closed door' /></div>
            <div className='door-wrap'><img className='hand' src={imgDoorClosed} onClick={onWrong} alt='closed door' /></div>
            <div className='door-wrap'><img className='hand' src={imgDoorClosed} onClick={onWrong} alt='closed door' /></div>
            <div className='door-wrap'><img className='hand' src={imgDoorClosed} onClick={onWrong} alt='closed door' /></div>
            <div className='door-wrap'><img className='hand' src={imgDoorClosed} onClick={onWrong} alt='closed door' /></div>
            <div className='door-wrap'><img className='hand' src={imgDoorClosedDiff} onClick={onCorrect} alt='closed door' /></div>
            <div className='door-wrap'><img className='hand' src={imgDoorClosed} onClick={onWrong} alt='closed door' /></div>
            <div className='door-wrap'><img className='hand' src={imgDoorClosed} onClick={onWrong} alt='closed door' /></div>
        </div>
    };

    const Intro = (props: any) => {
        return <Modal>
            <h1 className='mario title'>FIND THE DOOR</h1>
            <p className='paragraph'>The door to the invisible may be visible, but it's not easy to find.<br/>That's because the door is hiding in plain sight.</p>
            <p className='paragraph'>Your first challenge will be to find the door that is different from the others.</p>
            <button className='btn primary' onClick={() => setAct('game')}>Continue</button>
        </Modal>;
    };

    let contents;
    if (act == 'intro') {
        contents = <Intro />;
    } else {
        contents = <> { modal && modal } <DoorsGrid /> </>;
    }
    return <div id='page' className='doors'>
        {contents}
    </div>;

}
