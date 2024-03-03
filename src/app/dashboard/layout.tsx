import { Metadata } from "next";
import { Header } from "@/components";


export const metadata: Metadata = {
    title: 'Dashboard'
}

export default function ProjectLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <Header />
            <main>
                { children }
            </main>
        </>
    )
}