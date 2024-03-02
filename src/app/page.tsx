import { Header, Stack, AboutMe, ProjectMenu } from "@/components";


export default function HomePage() {
  return (
    <div className="h-[calc(100vh+50px)]">
      <Header />
      <main>
        <section className="mt-[180px] max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <Stack stacks={ ['React', 'UX/UI', 'Test'] }/>
            <AboutMe me={ [{name: 'Maksim', city: 'Moscow', age: 10, profession: 'Frontend', job: [{name: 'Anywhere', period: [2020, 2020]}], projects: [{name: 'Name', link: 'projects/1', category: ['Frontend'], imageUrl: '/sooos.png'}], contacts: [{name: 'Telegram', url: '/'}] }] } />
          </div>
          <div className="group/text -rotate-90 text-center text-2xl justify-end cursor-pointer">
            <div className="text-[#6A7273]">
              Не смотри сюда
            </div>
            <div className="text-[#2F3A3B] invisible group-hover/text:visible">
              Ну зачем ты навел сюда <br></br>теперь придется нанять
            </div>
          </div>
        </section>
        <ProjectMenu projects={ [{name: 'Testing', link: '/projects/1', category: ['Frontend'], imageUrl: '/sooos.png'}] } />
      </main>
    </div>
  );
}
