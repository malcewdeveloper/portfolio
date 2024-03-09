export interface IMe {
    name: string;
    city: string;
    age: number;
    profession: string;
    job: JobType[];
    projects: ProjectType[];
    contacts: ContactType[];
}

export type JobType = {
    name: string;
    period: [number, number];
}

export type ProjectType = {
    id: number;
    name: string;
    tagId: number;
    categoryId: number;
    url: string;
    previewImageUrl: string;
    imageUrls: string[];
    description: string;
}

export type ContactType = {
    name: string;
    url: string;
}

export type TagType = {
    id: number;
    name: string;
}

export type CategoryType = {
    id: number;
    name: string;
}