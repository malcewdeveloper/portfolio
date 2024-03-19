'use server'

import { z } from 'zod';
import { revalidatePath } from 'next/cache';


const FileSchema = z.instanceof(File);

const FormSchema = z.object({
    id: z.number(),
    name: z.string(),
    tagId: z.string(),
    categoryId: z.string(),
    url: z.string().optional(),
    description: z.string(),
    previewImageUrl: FileSchema,
    imageUrls: z.array(FileSchema)
});

const CreateProject = FormSchema.omit({ id: true });
const UpdateProject = FormSchema.omit({ id: true });

export type ProjectStateType = {
    errors?: {
        name?: string[];
        tagId?: string[];
        categoryId?: string[];
        url?: string[];
        description?: string[];
        previewImageUrl?: string[];
        imageUrls?: string[];
    };
    message?: string | null;
}

export async function createProject(prevState: ProjectStateType, formData: FormData) {
    const validatedField = CreateProject.safeParse({
        name: formData.get('name'),
        tagId: formData.get('tag_id'),
        categoryId: formData.get('category_id'),
        description: formData.get('description'),
        previewImageUrl: formData.get('preview_image_url'),
        imageUrls: formData.getAll('image_urls')
    })
    

    if(!validatedField.success) {
        return {
            errors: validatedField.error.flatten().fieldErrors,
            message: 'Missing fields. Failed to create tag'
        }
    }

    const { 
        name, 
        tagId, 
        categoryId,
        description, 
        previewImageUrl, 
        imageUrls 
    } = validatedField.data;

    const prepareImageUrls = imageUrls.map(url => url.name);
    const preparePreviewImageUrl = previewImageUrl.name;
    

    try{
        const res = await fetch(`${process.env.BACKEND_API}/projects`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, tagId, categoryId, description, imageUrls: prepareImageUrls, previewImageUrl: preparePreviewImageUrl })
        });

        revalidatePath('/dashboard');

        return { message: 'Create project successfully' };
    } catch(error) {
        return {
            message: 'Database error. Failed ro create tag.'
        }
    }   
}

export async function updateProject(id: number, prevState: ProjectStateType, formData: FormData) {
    const validatedField = UpdateProject.safeParse({
        name: formData.get('name'),
        tagId: formData.get('tag_id'),
        categoryId: formData.get('category_id'),
        description: formData.get('description'),
        previewImageUrl: formData.get('preview_image_url'),
        imageUrls: formData.getAll('image_urls')
    })

    if(!validatedField.success) {
        return {
            errors: validatedField.error.flatten().fieldErrors,
            message: 'Missing fields. Failed to create tag'
        }
    }

    const { 
        name, 
        tagId, 
        categoryId,
        description, 
        previewImageUrl, 
        imageUrls 
    } = validatedField.data;

    const prepareImageUrls = imageUrls.map(url => url.name);
    const preparePreviewImageUrl = previewImageUrl.name;

    try{
        const res = await fetch(`${process.env.BACKEND_API}/projects`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, id, tagId, categoryId, description, previewImageUrl: preparePreviewImageUrl, imageUrls: prepareImageUrls })
        });

        revalidatePath('/dashboard');

        return { message: 'Update project successfully' };
    } catch(error) {
        return {
            message: 'Database error. Failed ro create tag.'
        }
    }   
}

export async function deleteProject(id: number) {
    try{
        const res = await fetch(`${process.env.BACKEND_API}/projects`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        });
        revalidatePath('/dashboard/invoices');
        return { message: 'Deleted Invoice.' };
    } catch(error) {
        return {
            message: 'Database error. Failed ro delete tag.'
        }
    }   
}