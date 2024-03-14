'use server'

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const FormSchema = z.object({
    id: z.number(),
    name: z.string()
});

export type CategoryStateType = {
    errors?: {
        name?: string[];
    };
    message?: string | null;
}

const CreateCategory = FormSchema.omit({ id: true });
const UpdateCategory = FormSchema.omit({ id: true });

export async function createCategory(prevState: CategoryStateType, formData: FormData) {
    const validatedField = CreateCategory.safeParse({
        name: formData.get('name')
    })
    
    console.log(validatedField);

    if(!validatedField.success) {
        return {
            errors: validatedField.error.flatten().fieldErrors,
            message: 'Missing fields. Failed to create category'
        }
    }

    const { name } = validatedField.data;

    try {
        const res = await fetch(`${process.env.BACKEND_API}/categories`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name })
        })
        
    } catch(error) {
        return {
            message: 'Database error. Failed ro create tag'
        }
    }

    revalidatePath('/dashboard');
}

export async function updateCategory(id: number, prevState: CategoryStateType, formData: FormData) {
    const validatedField = UpdateCategory.safeParse({
        name: formData.get('name')
    });

    if(!validatedField.success) {
        return {
            errors: validatedField.error.flatten().fieldErrors,
            message: 'Missing fields. Failed to update category'
        }
    }

    const { name } = validatedField.data;

    try {
        const res = await fetch(`${process.env.BACKEND_API}/categories`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, id })
        })
    } catch (error) {
        return {
            message: 'Database error. Failed ro create tag.'
        }
    }

    revalidatePath('/dashboard');
}

export async function  deleteCategory(id: number) {
    try {
        const res = await fetch(`${process.env.BACKEND_API}/categories`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        })
    } catch (error) {
        return {
            message: 'Database error. Failed ro create tag.'
        }
    }

    revalidatePath('/dashboard');
}