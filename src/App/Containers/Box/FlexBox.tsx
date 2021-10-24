import React from 'react';
import scss from './FlexBox.mod.scss';

export const FlexBox: React.FC = (props) => {
    return <div className={scss.box}>{props.children}</div>;
};
