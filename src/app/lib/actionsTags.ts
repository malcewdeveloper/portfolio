'use server'

import { z } from 'zod';
import { revalidatePath } from 'next/cache';

const FormSchema = z.object({
    id: z.number(),
    name: z.string().min(2, { message: 'Укажите название тега' })
});

const CreateTag = FormSchema.omit({ id: true });
const UpdateTag = FormSchema.omit({ id: true });

export type TagStateType = {
    errors?: {
        name?: string[];
    };
    message?: string | null;
}

export async function createTag(prevState: TagStateType, formData: FormData) {    
    const validatedField = CreateTag.safeParse({
        name: formData.get('name')
    })

    if(!validatedField.success) {
        return {
            errors: validatedField.error.flatten().fieldErrors,
            message: 'Missing fields. Failed to create tag'
        }
    }

    const { name } = validatedField.data;

    try{
        const res = await fetch(`${process.env.BACKEND_API}/tags`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name })
        });

        revalidatePath('/dashboard');

        return { message: 'Create tag successfully' }
    } catch(error) {
        return {
            message: 'Database error. Failed ro create tag.'
        }
    }   
}

export async function updateTag(id: number, prevState: TagStateType, formData: FormData) {
    const validatedField = UpdateTag.safeParse({
        name: formData.get('name')
    })

    if(!validatedField.success) {
        return {
            errors: validatedField.error.flatten().fieldErrors,
            message: 'Missing fields. Failed to create tag'
        }
    }

    const { name } = validatedField.data;

    try{
        const res = await fetch(`${process.env.BACKEND_API}/tags`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, id })
        });

        revalidatePath('/dashboard');

        return { message: 'Update tag successfully' }
    } catch(error) {
        return {
            message: 'Database error. Failed ro update tag.'
        }
    }   
}

export async function deleteTag(id: number) {
    try{
        const res = await fetch(`${process.env.BACKEND_API}/tags`, {
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