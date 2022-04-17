import React from 'react';
import './TabPane.css';

import { useState, useEffect } from 'react';

import { TabPaneType } from './TabPaneType';

const TabPane : React.FC<{tabList : Array<TabPaneType>}> = ({tabList, ...props}) => {

    const [currentSelected, setCurrentSelected] = useState<number>(() => 0);

    const selectTab = (tabItemIndex : number) => {
        setCurrentSelected(() => tabItemIndex);
    }

    return (
        <div className="cm-tabpane-wrapper">
            <div className="cm-tabpane-header-container">
                {
                    tabList.map((tabItem, index) => (
                        <div className={`cm-tabpane-header-label${ index === currentSelected ? ' active' : ''}`} key={index} onClick={selectTab.bind(this, index)}>{tabItem.tabHeaderLabel}</div>
                    ))
                }
            </div>
            <div className="cm-tabpane-content-container">
                {tabList[currentSelected].tabContent}
            </div>
        </div>
    )
}

export default TabPane;
