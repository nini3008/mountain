import * as z from 'zod';

export const intakeFormSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  height: z.number().min(50, { message: "Height must be at least 50cm." }),
  weight: z.number().min(20, { message: "Weight must be at least 20kg." }),
  age: z.number().min(18, { message: "Age must be at least 18." }),
  goals: z.array(z.string()).min(1, { message: "Please add at least one goal." }).max(5)
});

export type IntakeFormValues = z.infer<typeof intakeFormSchema>;