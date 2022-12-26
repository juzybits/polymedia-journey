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

    const Modal = (props: any) => {
        const styles = {
            height: window.document.body.scrollHeight + 'px',
        };
        return <div className='modal' style={styles}>{props.children}</div>
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
            <div className='door-wrap'><img className='hand' src={imgDoorClosed} onClick={onWrong} alt='closed door' /></div>
            <div className='door-wrap'><img className='hand' src={imgDoorClosed} onClick={onWrong} alt='closed door' /></div>
            <div className='door-wrap'><img className='hand' src={imgDoorClosed} onClick={onWrong} alt='closed door' /></div>
            <div className='door-wrap'><img className='hand' src={imgDoorClosed} onClick={onWrong} alt='closed door' /></div>
        </div>
    };

    return <div id='page' className='doors'>
        { modal && modal }
        <DoorsGrid />
    </div>;
}
