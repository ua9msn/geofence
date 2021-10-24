import React from 'react';
import scss from './Layout.mod.scss';

interface Props {}

export const Layout: React.FC<Props> = (props) => {
    return <div className={scss.layout}>{props.children}</div>;
};
