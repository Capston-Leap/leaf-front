import styled from 'styled-components';
import BackToolbar from "@shared/ui/BackToolbar.tsx";
import GoalList from "@mission/components/GoalList.tsx";
import Description from "@mission/components/Description.tsx";


export const GoalSelectPage = () => {
  return (
    <GoalSelectContainer>
      <BackToolbar />
      <ContentContainer>
        <Description />
        <GoalList enabled={true} init={false} />
      </ContentContainer>
    </GoalSelectContainer>
  );
};

const GoalSelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 480px;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.gray100};
  padding-top: 13px;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  padding: 0 17px;
  row-gap: 30px;
`;
