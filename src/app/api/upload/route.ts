import { put } from "@vercel/blob";


export async function POST(req: Request): Promise<Response> {   
    const { searchParams } = new URL(req.url);
    const filename = searchParams.get('filename');

    if(!req.body) return Response.json({ message: 'File missing' });
    if(!filename) return Response.json({ message: 'Invalid file name' });

    try {
        const blob = await put(filename, req.body, {
            access: 'public'
        });
    
        return Response.json({...blob});
    } catch(error) {
        throw Error(`Error upload file: ${error}`);
    }
}