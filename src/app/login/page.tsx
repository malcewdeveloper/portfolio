import { LoginForm } from "@/components"
import { Metadata } from "next"
import { Suspense } from "react"

export const metadata: Metadata = {
    title: 'Вход в админ панель'
}

export default function LoginPage() {
    return (
        <section className="w-full h-screen flex items-center">
            <Suspense>
                <LoginForm />
            </Suspense>
        </section>
    )
}