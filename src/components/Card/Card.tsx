import React from "react";
import Link from "next/link";
import Image from "next/image";
import classes from './Card.module.scss';

interface ICardProps {
    name?: string;
    imageUrl: string;
    url: string;
    tags?: string[];
}

const Card: React.FC<ICardProps> = (props) => {
    const { name, imageUrl, url, tags } = props;

    return (
        <div className={ classes.root }>
            <Link className={ classes.link } href={ url }>
                <Image className={ classes.image } src={ imageUrl } width={ 400 } height={ 550 } alt="This is preview image" />
                <div className={ classes.description }>
                    {/* { tags && tags.map(tag => <Tag>{ tag }</Tag>) } */}
                    <div>{ name }</div>
                </div>
            </Link>
        </div>
    )
}

export default Card;