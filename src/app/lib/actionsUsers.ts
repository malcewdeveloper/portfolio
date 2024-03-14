'use server'

import { z } from 'zod';

const FormSchema = z.object({
    id: z.number(),
    name: z.string(),
    tagId: z.array(z.string()),
    url: z.string(),
    description: z.string(),
    previewImageUrl: z.string(),
    imageUrls: z.array(z.string())
});