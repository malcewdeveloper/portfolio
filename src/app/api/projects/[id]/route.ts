import { sql } from "@vercel/postgres";


export async function GET(req: Request) {
    const splitUrl = req.url.split('/'); //Разбиваем URL по '/'
    const projectId = splitUrl[splitUrl.length - 1]; // Получаем крайний элемент массива или id проекта 

    try {
        const res = await sql`
            SELECT projects.*,
                tags.name AS tag_name,
                categories.name AS category_name
            FROM
                projects
            LEFT JOIN 
                tags ON projects.tag_id = tags.id
            LEFT JOIN
                categories ON projects.category_id = categories.id 
            WHERE projects.id = ${projectId};
        `;

        if(!res.rows.length) { // Проверка, что проект с данным id существует
            throw new Error(`Project with id not found`);
        }

        const data = res.rows[0];

        return Response.json({ data });
    } catch (error) {
        throw new Error(`Error get project data: ${ error }`)
    }
}

