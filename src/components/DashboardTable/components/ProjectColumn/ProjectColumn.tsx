'use client'

import React from "react";
import { DashboardList, DashboardListItem, ProjectModalForm, ProjectUpdateModalForm, ProjectRemoveModal } from '@/components';
import { FaPen } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { CategoryType, ProjectType, TagType } from "@/interfaces";


interface IProjectColumnProps {
    projects: ProjectType[];
    tags: TagType[];
    categories: CategoryType[];
}

const ProjectColumn: React.FC<IProjectColumnProps> = (props) => {
    const { projects, tags, categories } = props;
    
    const [isOpenModal, setIsOpenModal] = React.useState(false);
    const [isOpenUpdateModal, setIsOpenUpdateModal] = React.useState<boolean[]>(new Array(projects.length).fill(false));
    const [isOpenRemoveModal, setIsOpenRemoveModal] = React.useState<boolean[]>(new Array(projects.length).fill(false));

    const handleEditClick = (index: number) => {
        const updatedState = [...isOpenUpdateModal];
        updatedState[index] = true;
        setIsOpenUpdateModal(updatedState);
    }

    const handleRemoveClick = (index: number) => {
        const updatedState = [...isOpenRemoveModal];
        updatedState[index] = true;
        setIsOpenRemoveModal(updatedState);
    }

    return (
        <DashboardList title={ 
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-[24px]">Проекты</h2>
                <button onClick={ () => setIsOpenModal(true) } className="bg-[#B9C8D4] w-5 h-5 rounded flex items-center justify-center text-[24px]">+</button>
                <ProjectModalForm 
                onClose={ setIsOpenModal } 
                isOpen={ isOpenModal }
                tags={ tags }
                categories={ categories } />
            </div>
        }>
            {projects.map((project, index) => 
                <DashboardListItem 
                key={ project.id }
                name={ project.name }
                actions={
                    <>                           
                        <button onClick={ () => handleEditClick(index) } className="bg-[#B9C8D4] w-5 h-5 rounded flex items-center justify-center mr-2.5">
                            <span>
                                <FaPen size={12} />
                            </span>
                        </button>
                        <ProjectUpdateModalForm 
                        isOpen={ isOpenUpdateModal[index] } 
                        onClose={() => setIsOpenUpdateModal(prevState => prevState.map((prevState, i) => (i === index ? false : prevState)))}
                        project={ project }
                        tags={ tags }
                        categories={ categories } />
                        <button onClick={ () => handleRemoveClick(index) } className="bg-[#B9C8D4] w-5 h-5 rounded flex items-center justify-center">
                            <span>
                                <IoClose />
                            </span>
                        </button>
                        <ProjectRemoveModal 
                        isOpen={ isOpenRemoveModal[index] } 
                        onClose={() => setIsOpenRemoveModal(prevState => prevState.map((prevState, i) => (i === index ? false : prevState)))}
                        projectId={ project.id } />
                    </>
                } />)}
        </DashboardList>
    )
}

export default ProjectColumn;