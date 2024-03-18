import { Header, Stack, AboutMe, ProjectMenu } from "@/components";
import { fetchProjects, fetchUsers } from "./lib/data";


export default async function HomePage() {
    const [projects, users] = await Promise.all([fetchProjects(), fetchUsers()]);


    return (
        <div className="overflow-y-scroll pb-[100px]">
            <Header />
            <main className="px-6">
                <section className="mt-[10px] max-w-7xl mx-auto flex items-center justify-between sm:mt-20 lg:mt-[180px]">
                <div>
                    <Stack stacks={ users[0].stack }/>
                    <AboutMe me={ users } />
                </div>
                <div className="hidden group/text -rotate-90 text-center text-2xl justify-end cursor-pointer lg:block">
                    <div className="text-[#6A7273]">
                    Не смотри сюда
                    </div>
                    <div className="text-[#2F3A3B] invisible group-hover/text:visible">
                    Ну зачем ты навел сюда <br></br>теперь придется нанять
                    </div>
                </div>
                </section>
                <ProjectMenu projects={ projects } />
            </main>
        </div>
    );
}
