import { FontsTypes } from '@shared/types';

const createFontStyle = (family: string, weight: number, size: number, lineHeight: number) => `
  font-family: "${family}";
  font-weight: ${weight};
  font-size: ${size}px;
  line-height: ${lineHeight}%;
  letter-spacing: 0%;
`;

export const fonts: FontsTypes = {
  sb_30px: createFontStyle('Pretendard', 600, 30, 140),
  heading_sb_24px: createFontStyle('Pretendard', 600, 24, 140),
  heading_sb_22px: createFontStyle('Pretendard', 600, 22, 140),
  heading_sb_20px: createFontStyle('Pretendard', 600, 20, 140),
  heading_b_30px: createFontStyle('Pretendard', 700, 30, 140),
  body_sb_18px: createFontStyle('Pretendard', 600, 18, 140),
  body_bold_16px: createFontStyle('Pretendard', 700, 16, 140),
  body_m_18px: createFontStyle('Pretendard', 500, 18, 140),
  body_m_16px: createFontStyle('Pretendard', 500, 16, 140),
  body_m_14px: createFontStyle('Pretendard', 500, 14, 140),
  body_r_18px: createFontStyle('Pretendard', 400, 18, 140),
  body_m_12px: createFontStyle('Pretendard', 500, 12, 140),
};
