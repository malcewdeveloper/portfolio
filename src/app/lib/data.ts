'use server'

import { TagType, CategoryType, ProjectType, IMe } from "@/interfaces";
import { unstable_noStore as noStore } from "next/cache";

export async function fetchTags() {
    noStore();
    try {
        const res = await fetch(`${process.env.BACKEND_API}/tags`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data: { data: TagType[] } = await res.json();

        return data.data;
        
    } catch (error) {
        console.log('Database error', error);
        throw new Error("Failed to fetch tags");
    }
}

export async function fetchCategories() {
    noStore();
    try {
        const res = await fetch(`${process.env.BACKEND_API}/categories`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data: { data: CategoryType[] } = await res.json();

        return data.data;
    } catch(error) {
        console.log('Database error', error);
        throw new Error("Failed to fetch categories");
    }
}

export async function fetchProjects() {
    noStore();
    try {
        const res = await fetch(`${process.env.BACKEND_API}/projects`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data: { data: ProjectType[] } = await res.json();

        return data.data;
    } catch(error) {
        console.log('Database error', error);
        throw new Error("Failed to fetch projects");
    }
}

export async function fetchProjectById(id: number) {
    noStore();
    try {
        const res = await fetch(`${process.env.BACKEND_API}/projects/${ id }`);

        const data: { data: ProjectType } = await res.json();

        return data.data;
    } catch (error) {
        console.log('Database error', error);
        throw new Error("Failed to fetch project by id");
    }
}


export async function fetchUsers() {
    noStore();
    try {
        const res = await fetch(`${ process.env.BACKEND_API}/users`);

        const data: { data: IMe[] } = await res.json();

        return data.data;
    }catch(error) {
        console.log('Database error', error);
        throw new Error("Failed to fetch users");
    }
}