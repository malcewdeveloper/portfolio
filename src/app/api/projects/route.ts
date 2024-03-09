import { Client, QueryResult } from 'pg';
import dotenv from 'dotenv';
import { ProjectType } from '@/interfaces';

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

        const res: QueryResult<ProjectType> = await client.query<ProjectType>(`SELECT * FROM projects;`);

        const data = res.rows;

        return Response.json({
            data
        })
    } catch(error) {
        throw new Error(`Error get projects data: ${ error }`)
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

        const { 
            name, 
            tagId,
            categoryId, 
            url, 
            previewImageUrl, 
            imageUrls, 
            description 
        } = await req.json();
        
        await client.query(`
            INSERT INTO projects (name, tag_id, category_id, url, preview_image_url, image_urls, description)
            VALUES ($1, $2, $3, $4, $5, $6, $7);
        `, [name, tagId, categoryId, url, previewImageUrl, `{${imageUrls.join(',')}}`, description]);

        return Response.json({ status: 200, message: 'OK' });
    } catch (error) {
        throw new Error(`Error create project: ${ error }`)
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

        const { 
            id, 
            name, 
            tagId,
            categoryId, 
            url, 
            previewImageUrl, 
            imageUrls, 
            description  
        } = await req.json();

        await client.query(`
            UPDATE projects
            SET name = $1, tag_id = $2, category_id = $3, url = $4, preview_image_url = $5, image_urls = $6, description = $7
            WHERE id = $8;
        `, [name, tagId, categoryId, url, previewImageUrl, `{${imageUrls.join(',')}}`, description, id]);

        return Response.json({ status: 200, message: 'OK' });

    } catch (error) {
        throw new Error(`Error update project: ${ error }`)
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
            DELETE FROM projects WHERE id = $1;
        `, [id]);

        return Response.json({ status: 200, message: 'OK' });

    } catch (error) {
        throw new Error(`Error update project: ${ error }`)
    } finally {
        client.end();
    }
}