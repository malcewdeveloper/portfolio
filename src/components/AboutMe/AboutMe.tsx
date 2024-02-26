import React from "react";
import { IMe } from "@/interfaces";
import { Line } from "@/components";
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
            { me.map(me => (
                <React.Fragment key={ me.name }>
                    <Line tag="name" number={ ++number }>{ me.name }</Line>
                    <Line tag="city" number={ ++number }>{ me.city }</Line>
                    <Line tag="age" number={ ++number }>{ `${me.age} года` }</Line>
                    <Line tag="profession" number={ ++number }>{ me.profession }</Line>
                    <Line number={ ++number } />
                    {me.job.map(job => (
                        <Line key={ job.name } tag={`job ${job.period[0]}-${job.period[1]}`} number={ ++number }>{ job.name }</Line>
                    ))}
                    {me.projects.map(project => (
                        <Line key={ project.name } tag="my project" number={ ++number }>
                            { <Link className="text-[#FEDB31]" href={ project.link }>{ project.name }</Link> }
                        </Line>
                    ))}
                    <Line number={++number} />
                    {me.contacts.map(contact => (
                        <Line key={ contact.name } tag="contact" number={ ++number }>
                            <Link className="text-[#35BAEB]" href={ contact.url }>{ contact.name }</Link>
                        </Line>
                    ))}
                </React.Fragment>
            )) }
        </div>
    )
}

export default AboutMe;