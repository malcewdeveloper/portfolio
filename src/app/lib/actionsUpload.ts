'use server'

import { PutBlobResult } from "@vercel/blob";


export async function imageSingleUploader(file: File): Promise<PutBlobResult> {
    const res = await fetch(`${process.env.BACKEND_API}/upload?filename=${file.name}`, {
        method: 'POST',
        body: file
    });

    const blob = (await res.json()) as PutBlobResult;

    return blob;
}

export async function imageMultiUploader(files: File[]): Promise<PutBlobResult[]> {
    const res = await Promise.all(files.map(async (file) => {
        const res = await fetch(`${process.env.BACKEND_API}/upload?filename=${file.name}`, {
            method: 'POST',
            body: file
        });

        const blobs = (await res.json()) as PutBlobResult;

        return blobs;
    }));

    return res;
}