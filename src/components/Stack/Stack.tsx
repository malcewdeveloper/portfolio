import React from "react";
import classes from './Stack.module.scss';


interface IStackProps {
    stacks?: string[];
}

const Stack: React.FC<IStackProps> = (props) => {
    const { stacks } = props;

    return (
        <div className={ classes.root }>
            <h2 className={ classes.title }>Стек:</h2>
            <ul className={ classes.list }>
                { stacks?.map(stack => (
                    <li key={ stack } className={ classes.item }>{ stack }</li>
                )) }
            </ul>
        </div>
    )
}

export default Stack;