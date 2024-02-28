import React from "react";
import classes from './Tag.module.scss';


interface ITagProps {
    children?: React.ReactNode;
}

const Tag: React.FC<ITagProps> = ({ children }) => {
    return (
        <span className={ classes.root }>{ children }</span>
    )
}

export default Tag;