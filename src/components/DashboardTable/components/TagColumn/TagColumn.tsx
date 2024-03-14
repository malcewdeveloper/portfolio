'use client'

import React from "react";
import { DashboardList, DashboardListItem, TagModalForm, TagUpdateModalForm, TagRemoveModal } from '@/components';
import { HiMiniSquares2X2 } from "react-icons/hi2"; 
import { FaPen } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { TagType } from "@/interfaces";


interface ITagColumnProps {
    tags: TagType[];
}

const TagColumn: React.FC<ITagColumnProps> = (props) => {
    const { tags } = props;

    const [isOpenModal, setIsOpenModal] = React.useState(false); 
    const [isOpenUpdateModal, setIsOpenUpdateModal] = React.useState<boolean[]>(new Array(tags.length).fill(false));   
    const [isOpenRemoveModal, setIsOpenRemoveModal] = React.useState<boolean[]>(new Array(tags.length).fill(false));

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
                <h2 className="text-[24px]">Теги</h2>
                <button onClick={() => setIsOpenModal(true)} className="bg-[#B9C8D4] w-5 h-5 rounded flex items-center justify-center text-[24px]">+</button>
                <TagModalForm isOpen={ isOpenModal } onClose={ setIsOpenModal } />
            </div>
        }>
            {tags.map((tag, index) => 
                <DashboardListItem 
                key={ tag.id }
                name={ tag.name } 
                icon={ <HiMiniSquares2X2 /> } 
                actions={
                    <>                           
                        <button onClick={() => handleEditClick(index)} className="bg-[#B9C8D4] w-5 h-5 rounded flex items-center justify-center mr-2.5">
                            <span>
                                <FaPen size={12} />
                            </span>
                        </button>
                        <TagUpdateModalForm 
                        isOpen={ isOpenUpdateModal[index] } 
                        onClose={() => setIsOpenUpdateModal(prevState => prevState.map((prevState, i) => (i === index ? false : prevState)))} 
                        tag={ tag } />
                        <button onClick={() => handleRemoveClick(index)} className="bg-[#B9C8D4] w-5 h-5 rounded flex items-center justify-center">
                            <span>
                                <IoClose />
                            </span>
                        </button>
                        <TagRemoveModal 
                        isOpen={ isOpenRemoveModal[index] } 
                        onClose={() => setIsOpenRemoveModal(prevState => prevState.map((prevState, i) => (i === index ? false : prevState)))}
                        tagId={ tag.id } />
                    </>
                } />)}
        </DashboardList>
    )
}

export default TagColumn;