import React from 'react';
import scss from './SiteHeader.mod.scss';

interface Props {}

export const SiteHeader: React.FC<Props> = (props) => {
    return <div className={scss.header}>{props.children}</div>;
};
