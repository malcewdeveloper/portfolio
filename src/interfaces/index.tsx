export interface IMe {
    id: number;
    name: string;
    email: string;
    password: string;
    stack: string[];
    city: string;
    birthday: string;
    profession: string;
    jobs: JobType[];
    contacts: ContactType[];
    projects_data: ProjectType[];
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