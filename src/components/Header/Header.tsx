import React from 'react';
import Image from 'next/image';
import classes from './Header.module.scss';
import Logo from '../../../public/logo.svg';


const Header: React.FC = (props) => {           
    return (
        <header className={ classes.root }>
            <Image className={ classes.image } src={ Logo } alt="Logo by malcew" />
            <div className={ classes.text }>
                <p>Кот пишу</p>
                <p>Кода кормлю</p>
            </div>
        </header>
    )
}

export default Header;