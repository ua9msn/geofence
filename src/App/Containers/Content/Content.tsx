import React from 'react';
import scss from './Content.mod.scss';

export const Content: React.FC = (props) => {
    return <div className={scss.content}>{props.children}</div>;
};
