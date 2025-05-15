import styled from "styled-components";

interface DescriptionProps {
  boldText: string;
  mediumText: string;
}

const Description = ({ boldText, mediumText }: DescriptionProps) => {
  return (
    <DescriptionContainer>
      <p>{boldText}</p>
      <p>{mediumText}</p>
    </DescriptionContainer>
  );
};

export default Description;

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  
  p:first-child {
    font: ${({ theme }) => theme.fonts.heading_sb_24px};
    color: ${({ theme }) => theme.colors.gray900};
    white-space: pre-line; /* 줄바꿈을 반영 */
  }
  
  p:last-child {
    font: ${({ theme }) => theme.fonts.body_m_16px};
    color: ${({ theme }) => theme.colors.gray500};
    white-space: pre-line; /* 줄바꿈을 반영 */
  }
`
