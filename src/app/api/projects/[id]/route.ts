import dotenv from 'dotenv';
import { Client } from 'pg';

dotenv.config();


export async function GET(req: Request) {
    const client = new Client({
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    });

    const splitUrl = req.url.split('/'); //Разбиваем URL по '/'
    const projectId = splitUrl[splitUrl.length - 1]; // Получаем крайний элемент массива или id проекта 

    try {
        client.connect();

        const res = await client.query(`
            SELECT projects.*,
                tags.name AS tag_name,
                categories.name AS category_name
            FROM
                projects
            LEFT JOIN 
                tags ON projects.tag_id = tags.id
            LEFT JOIN
                categories ON projects.category_id = categories.id 
            WHERE projects.id = $1;
        `, [projectId]);

        if(!res.rows.length) { // Проверка, что проект с данным id существует
            throw new Error(`Project with id not found`);
        }

        const data = res.rows[0];

        return Response.json({ data });
    } catch (error) {
        throw new Error(`Error get project data: ${ error }`)
    }
}

