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
    name: string;
    link: string;
    category: string[];
    imageUrl: string;
}

export type ContactType = {
    name: string;
    url: string;
}