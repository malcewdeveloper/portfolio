import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();


export async function GET(req: Request) {
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
            SELECT 
                users.*, 
                json_agg(projects.*) AS projects_data
            FROM 
                users
            LEFT JOIN 
                unnest(users.projects) AS project_id ON true
            LEFT JOIN 
                projects ON projects.id = project_id
            GROUP BY 
                users.id;
        `);

        if(!res.rows.length) {
            throw new Error(`Users does not exist`);
        }

        const data = res.rows;
        
        return Response.json({ data });


    } catch (error) {
        throw new Error(`Error get users data: ${ error }`)
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
            email, 
            password, 
            stack, 
            city, 
            birthday, 
            profession, 
            jobs, 
            projects, 
            contacts 
        } = await req.json();

        await client.query(`
            INSERT INTO users (name, email, password, stack, city, birthday, profession, jobs, projects, contacts)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);
        `, [name, email, password, stack, city, birthday, profession, jobs, projects, contacts]);

        return Response.json({ status: 200, message: 'OK' });
    } catch(error) {
        throw new Error(`Error create users data: ${ error }`)
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
            name, 
            email, 
            password, 
            stack, 
            city, 
            birthday, 
            profession, 
            jobs, 
            projects, 
            contacts,
            id
        } = await req.json();

        await client.query(`
            UPDATE users
            SET name = $1, email = $2, password = $3, stack = $4, city = $5, birthday = $6, profession = $7, jobs = $8, projects = $9, contacts = $10
            WHERE id = $11;
        `, [name, email, password, stack, city, birthday, profession, jobs, projects, contacts, id]);

        return Response.json({ status: 200, message: 'OK' });
    } catch (error) {
        throw new Error(`Error update user data: ${ error }`);
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

        await client.query(`DELETE FROM users WHERE id = $1;`, [id]);

        return Response.json({ status: 200, message: 'OK' });
    } catch (error) {
        throw new Error(`Error delete user data: ${ error }`);
    } finally {
        client.end();
    }
}