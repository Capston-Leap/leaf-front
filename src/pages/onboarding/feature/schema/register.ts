import { z } from "zod";

export const RegisterSchema = z.object({
  loginId: z.string(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
  name: z.string().min(1),
  nickname: z.string(),
  birth: z.string()
})

export type RegisterSchemaType = z.infer<typeof RegisterSchema>
