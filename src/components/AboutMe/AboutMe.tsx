import React from "react";
import { IMe } from "@/interfaces";
import { Line } from "@/components";
import Link from "next/link";
import classes from './AboutMe.module.scss'
import { convertDateToAge } from "@/utils";


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
                    <Line tag="age" number={ ++number }>{ convertDateToAge(me.birthday) }</Line>
                    <Line tag="profession" number={ ++number }>{ me.profession }</Line>
                    <Line number={ ++number } />
                    {me.jobs.map(job => (
                        <Line key={ job.name } tag={`job ${job.period[0]}-${job.period[1]}`} number={ ++number }>{ job.name }</Line>
                    ))}
                    {me.projects_data.map(project => (
                        <Line key={ project.name } tag="my project" number={ ++number }>
                            { <Link className="text-[#FEDB31]" href={`/projects/${ project.id }`}>{ project.name }</Link> }
                        </Line>
                    ))}
                    <Line number={++number} />
                    {me.contacts.map(contact => (
                        <Line key={ contact.name } tag="contact" number={ ++number }>
                            <Link className="text-[#35BAEB]" href={ contact.link }>{ contact.name }</Link>
                        </Line>
                    ))}
                </React.Fragment>
            )) }
        </div>
    )
}

export default AboutMe;