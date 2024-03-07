import { Metadata } from "next"
import { HiMiniSquares2X2 } from 'react-icons/hi2';
import { FaPen } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { FiExternalLink } from 'react-icons/fi';
import Link from "next/link";
import { DashboardList, DashboardListItem } from "@/components";


export const metadata: Metadata = {
    title: 'Dashboard'
}

// Mock data
const lists = ['Категории', 'Теги', 'Проекты'];
const categories = [{ name: 'Все' }, { name: 'Frontend' }];
const tags = [{name: 'Frontend'}, {name: 'UX/UI'}];
const projects = [{name: 'sooos.ru', link: '/projects/1'}, {name: 'epataj.ru', link: '/projects/2'}, {name: 'marketplace.ru', link: '/projects/3'}];

export default function DashboardPage() {
    return (
        <section className="flex max-w-[1368px] mx-auto w-full h-[calc(100vh-148px-36px)] gap-5">
            <div className="flex max-w-[50%] w-full gap-5">
                <DashboardList title={ 
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-[24px]">Категории</h2>
                        <button className="bg-[#B9C8D4] w-5 h-5 rounded flex items-center justify-center text-[24px]">+</button>
                    </div>
                 }>
                    {categories.map(category => 
                        <DashboardListItem 
                        key={ category.name }
                        name={ category.name } 
                        icon={ <HiMiniSquares2X2 /> } 
                        actions={
                            <>                           
                                <button className="bg-[#B9C8D4] w-5 h-5 rounded flex items-center justify-center mr-2.5">
                                    <span>
                                        <FaPen size={12} />
                                    </span>
                                </button>
                                <button className="bg-[#B9C8D4] w-5 h-5 rounded flex items-center justify-center">
                                    <span>
                                        <IoClose />
                                    </span>
                                </button>
                            </>
                        } />)}
                </DashboardList>
                <DashboardList title={ 
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-[24px]">Теги</h2>
                        <button className="bg-[#B9C8D4] w-5 h-5 rounded flex items-center justify-center text-[24px]">+</button>
                    </div>
                 }>
                    {tags.map(tag => 
                        <DashboardListItem 
                        key={ tag.name } 
                        name={ tag.name } 
                        actions={
                            <>
                                <button className="bg-[#B9C8D4] w-5 h-5 rounded flex items-center justify-center mr-2.5">
                                    <span>
                                        <FaPen size={12} />
                                    </span>
                                </button>
                                <button className="bg-[#B9C8D4] w-5 h-5 rounded flex items-center justify-center">
                                    <span>
                                        <IoClose />
                                    </span>
                                </button>
                            </>
                        } />)}
                </DashboardList>
            </div>
            <DashboardList title={
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-[24px]">Проекты</h2>
                    <button className="bg-[#B9C8D4] w-5 h-5 rounded flex items-center justify-center text-[24px]">+</button>
                </div>
            }>
                {projects.map(project => 
                    <DashboardListItem 
                    key={ project.name } 
                    name={ project.name } 
                    actions={ 
                        <>                        
                            <Link className="flex items-center mr-6" href={ project.link }>
                                <span className="bg-[#B9C8D4] w-5 h-5 rounded flex items-center justify-center mr-2.5">
                                    <FiExternalLink />
                                </span>
                                Показать на сайте
                            </Link>
                            <button className="bg-[#B9C8D4] w-5 h-5 rounded flex items-center justify-center mr-2.5">
                                <span>
                                    <FaPen size={12} />
                                </span>
                            </button>
                            <button className="bg-[#B9C8D4] w-5 h-5 rounded flex items-center justify-center">
                                <span>
                                    <IoClose />
                                </span>
                            </button>
                        </>
                    } />)}
            </DashboardList>
        </section>
    )
}