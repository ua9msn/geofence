import React from 'react';
import scss from './Elements.mod.scss';

interface Props {}

export const Link: React.FC<Props & React.HTMLProps<HTMLAnchorElement>> = ({children, href, ...props}) => {
    return (
        <a href={href} className={scss.A}>
            {children}
        </a>
    );
};
