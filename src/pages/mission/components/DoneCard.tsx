import styled from 'styled-components';

interface DoneCardProps {
  label: string;
}

const DoneCard = ({ label }: DoneCardProps) => {
  return <DoneCardContainer $label={label}>{label}</DoneCardContainer>;
};

export default DoneCard;

interface DoneCardContainerProps {
  $label: string;
}

const DoneCardContainer = styled.div<DoneCardContainerProps>`
  display: flex;
  align-content: center;
  text-align: center;
  border: none;
  border-radius: 13px;
  //width: 69px;
  height: 32px;
  padding: 6px 17px;
  background-color: ${({ $label, theme }) =>
  $label === '완료' ? theme.colors.blue50 : theme.colors.orange50};
  color: ${({ $label, theme }) =>
  $label === '완료' ? theme.colors.blue300 : theme.colors.orange300};
  font: ${({ theme }) => theme.fonts.body_m_14px};
`;
