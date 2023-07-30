import React, { useState, useEffect, useRef, MutableRefObject, RefObject, useLayoutEffect } from 'react';
import './Carousel.css';

const Carousel: React.FC<{carouselElements: Array<JSX.Element>, elementsInView: number}> = ({carouselElements, elementsInView}): JSX.Element => {

    const carouselContentContainerRef: RefObject<HTMLDivElement> = React.createRef();
    const carouselContentRef: RefObject<HTMLDivElement> = React.createRef();
    const carouselScrollBarRef: RefObject<HTMLDivElement> = React.createRef();
    const carouselScrollThumbRef: RefObject<HTMLDivElement> = React.createRef();

    const isScrollThumbClicked: MutableRefObject<boolean> = useRef<boolean>(false);

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [currentScrollPos, setCurrentScrollPos] = useState(0);

    const handleWindowResize = () => {
        console.log(window.innerWidth);
        setWindowWidth(window.innerWidth);
    };

    const handleCarouselScroll = (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
        console.log(event);
    }

    const onScrollThumbMouseDown = () => {
        isScrollThumbClicked.current = true;
    }

    const onScrollThumbMouseUp = () => {
        isScrollThumbClicked.current = false;
    }

    const onScrollThumbMouseMove = () => {
        if(isScrollThumbClicked.current) {
            
        }
    }

    useEffect(() => {
        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    useEffect(() => {
        console.log(carouselScrollBarRef.current?.offsetWidth);
    }, [windowWidth]);

    return (
        <div className='cps_carousel_wrapper'>
            <div ref={carouselContentContainerRef} className='cps_carousel_content_container' onScroll={handleCarouselScroll}>
                <div ref={carouselContentRef} className='cps_carousel_content'>
                {
                    carouselElements.map((element) => (
                        <div className='cps_carousel_element_wrapper'>
                            {element}
                        </div>
                    ))
                }
                </div> 
            </div>
            <div className='cps_carousel_scrollbar_container'>
                <div ref={carouselScrollBarRef} className='cps_carousel_scrollbar'>
                    <div ref={carouselScrollThumbRef}
                    onMouseDown={onScrollThumbMouseDown}
                    onMouseUp={onScrollThumbMouseUp}
                    onMouseMove={onScrollThumbMouseMove}
                    className='cps_carousel_scroll_thumb' style={
                        { 
                            width: `${100/carouselElements.length}%`,
                            left: '0px'
                        }
                    }></div>
                </div>
                <div className='cps_scrollbar_controller'>

                </div>
            </div>
        </div>
    )
}

export default Carousel;