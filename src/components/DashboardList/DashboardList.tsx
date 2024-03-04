import React from "react";
import classes from './DashboardList.module.scss';


interface IDashboardListProps {
    children?: React.ReactNode;
    title?: React.ReactNode;
}

const DashboardList: React.FC<IDashboardListProps> = (props) => {
    const { children, title } = props;

    return (
        <ul className={ classes.root }>
            { title && title }
            { children }
        </ul>
    )
}

export default DashboardList;