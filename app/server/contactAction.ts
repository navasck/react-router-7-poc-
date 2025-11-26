import { z } from "zod";


export const ContactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Email is not valid"),
  phone: z
    .string()
    .regex(/^[0-9]{10}$/, "Phone must be 10 digits")
    .optional(),
  subject: z.string().min(3, "Subject is required"),
  inquiryType: z.enum(["general", "support", "sales"], {
    errorMap: () => ({ message: "Please select an inquiry type" }),
  }),
  message: z.string().min(5, "Message is too short"),
  agree: z.literal("on", {
    errorMap: () => ({ message: "You must accept the terms" }),
  }),
});


export async function contactAction({ request }: { request: Request }) {
  const data = Object.fromEntries(await request.formData());

  const result = ContactSchema.safeParse(data);

  if (!result.success) {
    return new Response(
      JSON.stringify({
        success: false,
        errors: result.error.flatten().fieldErrors,
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  console.log("Received Contact:", result.data);

  return new Response(
    JSON.stringify({
      success: true,
      data: result.data,
      message: "Form submitted successfully!",
    }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
}



