import React from 'react';
import { IconType } from 'react-icons';

export interface TabPaneType {
    tabHeaderLabel? : React.ReactChild,
    tabContent : React.ReactChild,
    default ? : boolean,
    isSelected? : boolean
}