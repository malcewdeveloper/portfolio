import React from "react";
import classes from './DashboardListItem.module.scss';


interface IDashboardListItem {
    actions?: React.ReactNode;
    icon?: React.ReactNode;
    name?: string;
}

const DashboardListItem: React.FC<IDashboardListItem> = (props) => {
    const { 
        actions, 
        icon, 
        name 
    } = props;

    return (
        <li className={ classes.root }>
            <div className={ classes.body }>
                { icon && <span className={ classes.icon }>{ icon }</span> }
                { name }
            </div>
            { actions && <div className={ classes.actions }>{ actions }</div> } 
        </li>
    )
}

export default DashboardListItem;