import { Client, QueryResult } from 'pg';
import dotenv from 'dotenv';
import { TagType } from '@/interfaces';

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

        const res: QueryResult<TagType> = await client.query<TagType>(`SELECT * FROM tags;`);

        const data = res.rows;

        return Response.json({
            data
        })
    } catch(error) {
        throw new Error(`Error get tags data: ${ error }`)
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
            INSERT INTO tags (name)
            VALUES ($1);
        `, [name]);

        return Response.json({ status: 200, message: 'OK' });
    } catch (error) {
        throw new Error(`Error create tags: ${ error }`)
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
            UPDATE tags
            SET name = $1
            WHERE id = $2;
        `, [name, id]);

        return Response.json({ status: 200, message: 'OK' });

    } catch (error) {
        throw new Error(`Error update tags: ${ error }`)
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
            DELETE FROM tags WHERE id = $1;
        `, [id]);

        return Response.json({ status: 200, message: 'OK' });

    } catch (error) {
        throw new Error(`Error update tags: ${ error }`)
    } finally {
        client.end();
    }
}