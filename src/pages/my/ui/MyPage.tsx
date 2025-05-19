import styled from "styled-components";
import NavBar from "@shared/ui/NavBar.tsx";
import UserInfo from "@my/components/UserInfo.tsx";

export const MyPage = () => {
  return (
    <PageWrapper>
      <UserInfo />
      <NavBar />
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #F4F4F5;
`;
