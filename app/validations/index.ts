import * as z from 'zod';

const registerSchema = z.object({
	name: z.string().min(2, { message: 'Name must be at least 2 characters long' }),
	email: z.string().email({ message: 'Invalid email address' }),
	password: z
		.string()
		.min(8, { message: 'Password must be at least 8 characters long' })
		.refine((value) => value.match(/[a-zA-Z]/) && value.match(/[0-9]/), {
			message: 'Password must contain both letters and numbers',
		}),
});

export default registerSchema;
