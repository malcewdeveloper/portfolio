import { Metadata } from "next";
import { DashboardTable } from "@/components";


export const metadata: Metadata = {
    title: 'Dashboard'
}

export default async function DashboardPage() {
    return (
        <section className="flex max-w-[1368px] mx-auto w-full h-[calc(100vh-148px-36px)] gap-5">
            <DashboardTable />    
        </section>
    )
}