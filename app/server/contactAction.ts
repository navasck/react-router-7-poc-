import { z } from "zod";

export const ContactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Email is not valid"),
  phone: z.string().regex(/^[0-9]{10}$/, "Phone must be 10 digits").optional(),
  subject: z.string().min(3, "Subject is required"),
  inquiryType: z.enum(["general", "support", "sales"], {
    errorMap: () => ({ message: "Please select an inquiry type" }),
  }),
  message: z.string().min(5, "Message is too short"),
  agree: z.literal("on", {
    errorMap: () => ({ message: "You must accept the terms" }),
  }),
});

export async function contactAction({ request }) {
  const formData = await request.formData();
  const values = Object.fromEntries(formData);

  const result = ContactSchema.safeParse(values);

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
      fields: values,
    };
  }

  return {
    success: true,
    message: "Form submitted successfully!",
    data: result.data,
  };
}
