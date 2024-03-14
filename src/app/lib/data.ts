'use server'

import { TagType, CategoryType, ProjectType } from "@/interfaces";
import { unstable_noStore as noStore } from "next/cache";

export async function fetchTags() {
    noStore();
    try {
        const res = await fetch('http://localhost:3000/api/tags', {
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
        const res = await fetch('http://localhost:3000/api/categories', {
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
        const res = await fetch('http://localhost:3000/api/projects', {
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