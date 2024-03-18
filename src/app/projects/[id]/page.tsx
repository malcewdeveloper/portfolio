import Link from "next/link";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa";
import { Tag } from "@/components";
import { fetchProjectById } from "@/app/lib/data";
import { notFound } from "next/navigation";


export default async function ProjectPage({ params }: { params: { id: string } }) {
    const { id } = params;

    const project = await fetchProjectById(Number(id)).catch(() => notFound());

    return (
        <section className="max-w-7xl mx-auto mb-32 px-6">
            <div className="flex flex-wrap gap-6">
                <Link className="flex items-center text-[14px] w-full max-w-[108px] text-black justify-center py-2.5 bg-white self-start rounded-3xl" href="/">
                    <span className="mr-3.5">
                        <FaArrowLeft />
                    </span>
                    Назад
                </Link>
                <div>
                    <h1 className="text-[32px] mb-3">{ project.name }</h1>
                    <Tag>{ project.tag_name }</Tag>
                    <p className="mt-3 mb-12">{ project.description }</p>
                </div>
            </div>
            <div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    { project.image_urls.map((url, index) => (
                        <div key={ index } className="relative w-full h-full pt-[79.5%]">
                            <Image 
                            alt="Preview project image" 
                            className="absolute left-0 top-0 object-cover h-full rounded-3xl" 
                            src={ `/${url}` } 
                            width={ 620 } 
                            height={ 480 } />
                        </div> 
                    )) }
                </div>
            </div>
        </section>
    )
}