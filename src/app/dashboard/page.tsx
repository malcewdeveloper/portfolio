import { Metadata } from "next"
import { HiMiniSquares2X2 } from 'react-icons/hi2';
import { FaPen } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { FiExternalLink } from 'react-icons/fi';
import Link from "next/link";


export const metadata: Metadata = {
    title: 'Dashboard'
}

const categories = [{ name: 'Все' }, { name: 'Frontend' }];
const tags = [{name: 'Frontend'}, {name: 'UX/UI'}];
const projects = [{name: 'sooos.ru', link: '/projects/1'}, {name: 'epataj.ru', link: '/projects/2'}, {name: 'marketplace.ru', link: '/projects/3'}];

export default function DashboardPage() {
    return (
        <section className="flex max-w-[1368px] mx-auto w-full h-[calc(100vh-148px-36px)]">
            <div className="flex max-w-[50%] w-full mr-5">
                <ul className="py-6 px-6 bg-[#152324] rounded-3xl h-full max-w-[50%] w-full mr-5">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-[24px]">Категории</h2>
                        <button className="bg-[#B9C8D4] w-5 h-5 rounded flex items-center justify-center text-[24px]">+</button>
                    </div>
                    {categories.map(category => 
                        <li key={ category.name } className="flex justify-between py-2">
                            <div className="flex items-center">
                                <span className="mr-2">
                                    <HiMiniSquares2X2 />
                                </span>
                                { category.name }
                            </div>
                            <div className="flex">
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
                            </div>
                        </li>)}
                </ul>
                <ul className="py-6 px-6 bg-[#152324] rounded-3xl h-full max-w-[50%] w-full">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-[24px]">Теги</h2>
                        <button className="bg-[#B9C8D4] w-5 h-5 rounded flex items-center justify-center text-[24px]">+</button>
                    </div>
                    {tags.map(category => 
                        <li key={ category.name } className="flex justify-between py-2">
                            <div className="flex items-center">
                                {/* <span className="mr-2">
                                    <HiMiniSquares2X2 />
                                </span> */}
                                { category.name }
                            </div>
                            <div className="flex">
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
                            </div>
                        </li>)}
                </ul>
            </div>
            <ul className="py-6 px-6 bg-[#152324] rounded-3xl h-full max-w-[50%] w-full">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-[24px]">Проекты</h2>
                    <button className="bg-[#B9C8D4] w-5 h-5 rounded flex items-center justify-center text-[24px]">+</button>
                </div>
                {projects.map(project => 
                        <li key={ project.name } className="flex justify-between py-2">
                            <div className="flex items-center">
                                {/* <span className="mr-2">
                                    <HiMiniSquares2X2 />
                                </span> */}
                                { project.name }
                            </div>
                            <div className="flex items-center">
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
                            </div>
                        </li>)}
            </ul>
        </section>
    )
}