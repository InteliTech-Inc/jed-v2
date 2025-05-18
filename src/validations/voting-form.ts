import * as z from "zod";

export const votingFormSchema = z.object({
  name: z
    .string()
    .nonempty({ message: "Full Name is required" })
    .regex(/^[a-zA-Z\s]+$/, "Full Name must contain only letters and spaces")
    .min(3, { message: "Full Name must be at least 3 characters long" }),
  email: z
    .string()
    .nonempty({ message: "Email Address is required" })
    .email({ message: "Invalid email address" }),
  numberOfVotes: z
    .number({
      required_error: "Number of Votes is required",
      invalid_type_error: "Votes must be a number",
    })
    .min(1, { message: "At least 1 vote is required" }),
});

export type FormSchema = z.infer<typeof votingFormSchema>;
