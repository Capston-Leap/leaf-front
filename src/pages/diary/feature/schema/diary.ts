import { z } from "zod";

export const DiaryWriteSchema = z.object({
  daily: z
    .string()
    .min(50, { message: '최소 50자 이상 작성하셔야 합니다.' })
    .max(200, { message: '최대 200자까지 작성 가능합니다.' }),
  memory: z
    .string()
    .min(50, { message: '최소 50자 이상 작성하셔야 합니다.' })
    .max(200, { message: '최대 200자까지 작성 가능합니다.' }),
});


export type DiaryWriteSchemaType = z.infer<typeof DiaryWriteSchema>;
