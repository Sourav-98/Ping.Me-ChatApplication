import './Alert.css';

import { CSSTransition } from 'react-transition-group';


export default function Alert({isVisible, autoClose, delay, closeFunc, success, danger, info, warning, ...props}){

    const defaultDelay = 6500;
    const timeoutDelay = delay ? delay : defaultDelay;

    let delayedCloseTimer;

    const immediateClose = () => {
        if(delayedCloseTimer){
            clearTimeout(delayedCloseTimer);
        }
        closeFunc();
    }

    const onEnterHandler = () => {

    }

    const onEnteredHandler = () => {
        if(autoClose){
            delayedCloseTimer = setTimeout(closeFunc, timeoutDelay);
        }
    }

    const onExitedHandler = () => {

    }

    return(
        <CSSTransition
            in={isVisible}
            onEntered={onEnteredHandler}
            classNames='alert-div'
            timeout={400}
            unmountOnExit
        >
            <div className='alert-div'>
                <button onClick={immediateClose}> X </button>
            </div>
        </CSSTransition>
    )
}
