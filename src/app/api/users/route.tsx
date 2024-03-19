import { sql } from "@vercel/postgres";


export async function GET(req: Request) {
    try {
        const res = await sql`
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
        `;

        if(!res.rows.length) {
            throw new Error(`Users does not exist`);
        }

        const data = res.rows;
        
        return Response.json({ data });


    } catch (error) {
        throw new Error(`Error get users data: ${ error }`)
    }
}

export async function POST(req: Request) {
    try {
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

        await sql`
            INSERT INTO users (name, email, password, stack, city, birthday, profession, jobs, projects, contacts)
            VALUES (${name}, ${email}, ${password}, ${stack}, ${city}, ${birthday}, ${profession}, ${jobs}, ${projects}, ${contacts});
        `

        return Response.json({ status: 200, message: 'OK' });
    } catch(error) {
        throw new Error(`Error create users data: ${ error }`)
    }
}

export async function PUT(req: Request) {
    try {
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

        await sql`
            UPDATE users
            SET name = ${name}, email = ${email}, password = ${password}, stack = ${stack}, city = ${city}, birthday = ${birthday}, profession = ${profession}, jobs = ${jobs}, projects = ${projects}, contacts = ${contacts}
            WHERE id = ${id};
        `

        return Response.json({ status: 200, message: 'OK' });
    } catch (error) {
        throw new Error(`Error update user data: ${ error }`);
    }
}

export async function DELETE(req: Request) {
    try {
        const { id } = await req.json();

        await sql`DELETE FROM users WHERE id = ${id};`;

        return Response.json({ status: 200, message: 'OK' });
    } catch (error) {
        throw new Error(`Error delete user data: ${ error }`);
    }
}