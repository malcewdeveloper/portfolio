import React from "react";
import Link from "next/link";
import Image from "next/image";
import Tag from "../Tag";
import classes from './Card.module.scss';

interface ICardProps {
    name?: string;
    previewImageUrl: string;
    url: string;
    tag: string;
}

const Card: React.FC<ICardProps> = (props) => {
    const { 
        name, 
        previewImageUrl, 
        url, 
        tag 
    } = props;

    return (
        <div className={ classes.root }>
            <Link className={ classes.link } href={ url }>
                <Image className={ classes.image } src={ previewImageUrl } width={ 400 } height={ 550 } alt="This is preview image" />
                <div className={ classes.description }>
                    { tag && <Tag>{ tag }</Tag> }
                    <div className={ classes.name }>{ name }</div>
                </div>
            </Link>
        </div>
    )
}

export default Card;