import { z } from 'zod';

export const userSchema = z.object({
    name: z.string().min(2).optional(),
    email: z.string().email(),
    password: z.string().min(5, "Password should contain min 6 letters")
});

