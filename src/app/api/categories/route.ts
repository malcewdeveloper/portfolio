import { CategoryType } from '@/interfaces';
import { sql } from '@vercel/postgres';

export async function GET() {
    try{
        const res = await sql<CategoryType>`SELECT * FROM categories;`;

        const data = res.rows;

        return Response.json({
            data
        })
    } catch(error) {
        throw new Error(`Error get categories data: ${ error }`)
    }
}

export async function POST(req: Request) {
    try {
        const { name } = await req.json();

        await sql`
            INSERT INTO categories (name)
            VALUES (${name});
        `

        return Response.json({ status: 200, message: 'OK' });
    } catch (error) {
        throw new Error(`Error create category: ${ error }`)
    }
}

export async function PUT(req: Request) {
    try {
        const { id, name } = await req.json();

        await sql`
            UPDATE categories
            SET name = ${name}
            WHERE id = ${id};
        `

        return Response.json({ status: 200, message: 'OK' });

    } catch (error) {
        throw new Error(`Error update category: ${ error }`)
    }
}

export async function DELETE(req: Request) {
    try {
        const { id } = await req.json();

        await sql`
            DELETE FROM categories WHERE id = ${id};
        `;

        return Response.json({ status: 200, message: 'OK' });
    } catch (error) {
        throw new Error(`Error update category: ${ error }`)
    }
}