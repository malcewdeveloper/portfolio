import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { Client } from "pg";
import { z } from "zod";


async function getUser(email: string) {
    const client = new Client({
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    });

    try {
        client.connect();

        const res = await client.query(`
            SELECT * FROM users
            WHERE email = $1
        `, [email]);

        return res.rows[0];
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    } finally {
        client.end();
    }
}

export const authConfig = {
    pages: {
        signIn: '/login'
    },
    providers: [
        Credentials({
            credentials: {
                email: { label: 'email', type: 'email', required: true },
                password: { label: 'password', type: 'password', required: true }
            },
            async authorize(credentials) {
                const parsedCredentials = z
                .object({ email: z.string().email(), password: z.string().min(6) })
                .safeParse(credentials);
    
                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user = await getUser(email);
                    if (!user) return null;
                    
                    const passwordsMatch = password === user.password;
                    if(passwordsMatch) return user;
                }
    
                console.log('Invalid credentials');
                return null;
            }
        })
    ]
} satisfies NextAuthOptions;