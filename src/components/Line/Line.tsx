import React from "react";
import classes from './Line.module.scss';


interface ILineProps {
    children?: React.ReactNode;
    tag?: string;
    number?: number; 
}

const Line: React.FC<ILineProps> = (props) => {
    const { 
        children, 
        tag, 
        number 
    } = props;

    return (
        <div className={ classes.root }>
            <span className={ classes.number }>{ number }</span>
            <div className={ classes.container }>
                {tag && <span className={ classes.tag }>{ `<${ tag }>` }</span>}&nbsp;
                <span>{ children }</span>&nbsp;
                {tag && <span className={ classes.tag }>{ `<${ tag }>` }</span>}
            </div>
        </div>
    )
}

export default Line;