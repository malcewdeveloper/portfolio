import React from "react";
import { IMe } from "@/interfaces";
// import { Line } from "@/components";
import Link from "next/link";
import classes from './AboutMe.module.scss'


interface IAboutMeProps {
    me: IMe[]; 
}

const AboutMe: React.FC<IAboutMeProps> = (props) => {
    const { me } = props;
    let number = 0;

    return (
        <div className={ classes.root }>
            {/* { me.map(me => (
                <>
                    <Line tag="name" number={ number++ }>{ me.name }</Line>
                    <Line tag="city" number={ number++ }>{ me.city }</Line>
                    <Line tag="age" number={ number++ }>{ me.age }</Line>
                    <Line tag="profession" number={ number++ }>{ me.profession }</Line>
                    <Line number={ number++ } />
                    {me.job.map(job => (
                        <Line tag={`job ${job.period[0]}-${job.period[1]}`} number={ number++ }>{ job.name }</Line>
                    ))}
                    {me.projects.map(project => (
                        <Line tag="my project" number={ number++ }>
                            { <Link href={ project.link }>{ project.name }</Link> }
                        </Line>
                    ))}
                    <Line />
                    {me.contacts.map(contact => (
                        <Line tag="contact" number={ number++ }>
                            <Link href={ contact.url }>{ contact.name }</Link>
                        </Line>
                    ))}
                </>
            )) } */}
        </div>
    )
}

export default AboutMe;