import { sql } from "@vercel/postgres";
import { TagType } from '@/interfaces';


export async function GET() {
    try{
        const res = await sql<TagType>`SELECT * FROM tags;`;

        const data = res.rows;

        return Response.json({
            data
        })
    } catch(error) {
        throw new Error(`Error get tags data: ${ error }`)
    }
}

export async function POST(req: Request) {
    try {
        const { name } = await req.json();

        await sql`
            INSERT INTO tags (name)
            VALUES (${name});
        `

        return Response.json({ status: 200, message: 'OK' });
    } catch (error) {
        throw new Error(`Error create tags: ${ error }`)
    }
}

export async function PUT(req: Request) {
    try {
        const { id, name } = await req.json();

        await sql`
            UPDATE tags
            SET name = ${name}
            WHERE id = ${id};
        `

        return Response.json({ status: 200, message: 'OK' });

    } catch (error) {
        throw new Error(`Error update tags: ${ error }`)
    }
}

export async function DELETE(req: Request) {
    try {
        const { id } = await req.json();

        await sql`
            DELETE FROM tags WHERE id = ${id};
        `

        return Response.json({ status: 200, message: 'OK' });

    } catch (error) {
        throw new Error(`Error update tags: ${ error }`)
    }
}