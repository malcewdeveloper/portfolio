import { sql } from '@vercel/postgres';
import { ProjectType } from '@/interfaces';


export async function GET() {
    try{
        const res = await sql<ProjectType>`
            SELECT projects.*,
                tags.name AS tag_name,
                categories.name AS category_name
            FROM
                projects
            LEFT JOIN 
                tags ON projects.tag_id = tags.id
            LEFT JOIN
                categories ON projects.category_id = categories.id ;`;

        const data = res.rows;

        return Response.json({
            data
        })
    } catch(error) {
        throw new Error(`Error get projects data: ${ error }`)
    }
}

export async function POST(req: Request) {
    try {
        const { 
            name, 
            tagId,
            categoryId, 
            url, 
            previewImageUrl, 
            imageUrls, 
            description 
        } = await req.json();
        
        await sql`
            INSERT INTO projects (name, tag_id, category_id, url, preview_image_url, image_urls, description)
            VALUES (${name}, ${tagId}, ${categoryId}, ${url}, ${previewImageUrl}, ${imageUrls}, ${description});
        `;

        return Response.json({ status: 200, message: 'OK' });
    } catch (error) {
        throw new Error(`Error create project: ${ error }`)
    }
}

export async function PUT(req: Request) {
    try {
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

        await sql`
            UPDATE projects
            SET name = ${name}, tag_id = ${tagId}, category_id = ${categoryId}, url = ${url}, preview_image_url = ${previewImageUrl}, image_urls = ${imageUrls}, description = ${description}
            WHERE id = ${id};
        `;

        return Response.json({ status: 200, message: 'OK' });
    } catch (error) {
        throw new Error(`Error update project: ${ error }`)
    }
}

export async function DELETE(req: Request) {
    try {
        const { id } = await req.json();

        await sql`
            DELETE FROM projects WHERE id = ${id};
        `

        return Response.json({ status: 200, message: 'OK' });

    } catch (error) {
        throw new Error(`Error update project: ${ error }`)
    }
}