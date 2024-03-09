import { Client, QueryResult } from 'pg';
import dotenv from 'dotenv';
import { CategoryType } from '@/interfaces';

dotenv.config()

export async function GET() {
    const client = new Client({
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    });

    try{
        client.connect();

        const res: QueryResult<CategoryType> = await client.query<CategoryType>(`SELECT * FROM categories;`);

        const data = res.rows;

        return Response.json({
            data
        })
    } catch(error) {
        throw new Error(`Error get categories data: ${ error }`)
    } finally {
        client.end();
    }
}

export async function POST(req: Request) {
    const client = new Client({
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    });

    try {
        client.connect();

        const { name } = await req.json();

        await client.query(`
            INSERT INTO categories (name)
            VALUES ($1);
        `, [name]);

        return Response.json({ status: 200, message: 'OK' });
    } catch (error) {
        throw new Error(`Error create category: ${ error }`)
    } finally {
        client.end();
    }
}

export async function PUT(req: Request) {
    const client = new Client({
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    });

    try {
        client.connect();

        const { id, name } = await req.json();

        await client.query(`
            UPDATE categories
            SET name = $1
            WHERE id = $2;
        `, [name, id]);

        return Response.json({ status: 200, message: 'OK' });

    } catch (error) {
        throw new Error(`Error update category: ${ error }`)
    } finally {
        client.end();
    }
}

export async function DELETE(req: Request) {
    const client = new Client({
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    });

    try {
        client.connect();

        const { id } = await req.json();

        await client.query(`
            DELETE FROM categories WHERE id = $1;
        `, [id]);

        return Response.json({ status: 200, message: 'OK' });

    } catch (error) {
        throw new Error(`Error update category: ${ error }`)
    } finally {
        client.end();
    }
}