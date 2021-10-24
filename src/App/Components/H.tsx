import React from 'react';
import scss from './Elements.mod.scss';

interface Props {
    tag: 'h1' | 'h2' | 'h3' | 'h4';
}

export const H: React.FC<Props> = ({tag, children}) => {
    const Tag = tag;
    return <Tag className={scss.H}>{children}</Tag>;
};
