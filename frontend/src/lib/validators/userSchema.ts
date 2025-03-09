import { z } from 'zod';

export const userSchema = z.object({
    fname: z.string().min(2).max(255),
    lname: z.string().min(2).max(255),
    email: z.string().email(),
    adminId: z.number().min(1).max(10000),
    password: z.string().min(8).max(16),
    profileImage: z.custom<FileList>((file) => file instanceof FileList)
        .refine((file) => file.length === 1, { message: "Profile image is required"})
        .refine((file) => ['image/jpeg', 'image/png', 'image/jpg'].includes(file[0]?.type), { message: "Profile image must be a jpeg, jpg or png" })
})