'use client'

import React from "react";
import { Card } from '@/components';
import { ProjectType } from "@/interfaces";
import { Transition } from "@headlessui/react";
import classes from './ProjectMenu.module.scss';


interface IProjectMenuProps {
    projects: ProjectType[];
}

const ProjectMenu: React.FC<IProjectMenuProps> = (props) => {
    const { projects } = props;

    const [showMenu, setShowMenu] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            
            if(scrollTop > 1) {
                setShowMenu(true);
            } else {
                setShowMenu(false);
            }
        }

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [])

    return (
        <Transition
        as="section"
        show={ showMenu }
        enter="transition-opacity duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-500"
        leaveFrom="opacity-100"
        leaveTo="opacity-0">
            <div className={ classes.root }>
                <div className={ classes.container }>
                    <h1 className={ classes.heading }>Проекты</h1>
                    <div className={ classes.wrapper }>
                        {projects.map(project => (
                            <Card 
                            key={ project.id } 
                            name={ project.name } 
                            url={ `/projects/${project.id}` }
                            previewImageUrl={ `/${project.preview_image_url}` }
                            tag={ project.tag_name } />
                        ))}
                    </div>
                </div>
            </div>
        </Transition>
    )
}

export default ProjectMenu;