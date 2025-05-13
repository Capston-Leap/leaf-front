import { z } from "zod";

export const LoginSchema = z.object({
  loginId: z.string(),
  password: z
    .string()
    .min(1, '비밀번호는 8자 이상이어야 합니다.')
    .nonempty('비밀번호를 입력해주세요.'),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
