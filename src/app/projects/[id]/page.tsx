import Link from "next/link";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa";
import { Tag } from "@/components";


const ProjectPage = () => {
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
                    <h1 className="text-[32px] mb-3">Anithing name</h1>
                    <Tag>Frontend</Tag>
                    <p className="mt-3 mb-12">Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque dolorem nulla, illo illum ex odit odio sapiente quaerat at impedit placeat explicabo, totam deleniti tempore eaque! Omnis repudiandae quia ipsum!
                    Excepturi in molestias, odio pariatur libero provident ratione voluptates? Quae, saepe error? Cumque maxime tempore ratione provident, esse unde ex rem, quibusdam nisi sint inventore veritatis fuga doloremque. Impedit, error!</p>
                </div>
            </div>
            <div>
                <div className="rounded-3xl max-w-7xl overflow-hidden mb-[24px] w-full">
                    <Image style={{ objectFit: 'cover' }} className="max-w-full w-full h-full object-cover" width={1280} height={480} src="/sooos.png" alt="Preview project image" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                    <Image style={{ objectFit: 'cover', height: '480px' }} alt="Preview project image" className="rounded-3xl" src="/sooos.png" width={620} height={480} />
                </div>
            </div>
        </section>
    )
}

export default ProjectPage;