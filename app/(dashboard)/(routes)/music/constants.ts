import * as z from "zod";

export const FormSchema = z.object({
  prompt: z.string().min(1, {
    message: "Music is required",
  }),
});
