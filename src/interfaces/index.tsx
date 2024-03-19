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
    tag_id: number;
    category_id: number;
    url: string;
    preview_image_url: string;
    image_urls: string[];
    description: string;
    tag_name: string;
}

export type ContactType = {
    name: string;
    link: string;
}

export type TagType = {
    id: number;
    name: string;
}

export type CategoryType = {
    id: number;
    name: string;
}