import { z } from 'zod';

export const issueSchema = z.object({
    title: z.string().min(2).max(255),
    description: z.string().min(2).max(255),
    employeeId: z.string().min(1),
    issueImage: z.custom<FileList>((file) => file instanceof FileList)
        .refine((file) => file.length === 1, { message: "Profile image is required"})
        .refine((file) => ['image/jpeg', 'image/png', 'image/jpg'].includes(file[0]?.type), { message: "Profile image must be a jpeg, jpg or png" })
})