import styled from "styled-components";
import { useGetMyPage } from "@my/feature/useGetMyPage.ts";
import { useControlModal } from "@my/feature/custom/useControlModal.ts";
import { useLogout } from "@my/feature/mutate/useLogout.ts";
import { useDeleteUser } from "@my/feature/mutate/useDeleteUser.ts";
import { useNavigate } from "react-router";

const UserInfo = () => {
  const { mutate } = useLogout();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetMyPage();
  const { isOpen, openModal, closeModal } = useControlModal();
  const { isOpen: isDeleteModalOpen, openModal: openDeleteModal, closeModal: closeDeleteModal } = useControlModal();
  const { mutate: mutateDeleteUser } = useDeleteUser();
  if (isLoading || !data) {
    return <div>Loading</div>;
  }
  if (isError) {
    return <div>Error loading data</div>;
  }

  const handleLogout = () => {
    mutate();
    closeModal();
  };

  const handleDeleteUser = () => {
    mutateDeleteUser();
    closeDeleteModal();
  }

  const navigateToMyPosts = () => {
    navigate("/my/posts");
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", padding: "24px 16px 80px" }}>
      <UserInfoWrapper>
        <Name>{data.name}</Name>
        <Email>{data.loginId}</Email>
      </UserInfoWrapper>
      <StatsBox>
        <StatItem>
          <Label>진행중 미션</Label>
          <Number>{data.ongoingMissionCount}</Number>
        </StatItem>
        <StatItem>
          <Label>완료한 미션</Label>
          <Number>{data.completedMissionCount}</Number>
        </StatItem>
        <StatItem onClick={navigateToMyPosts}>
          <Label>나의 게시글</Label>
          <Number>{data.myPostCount}</Number>
        </StatItem>
      </StatsBox>
      <ActionList>
        <ActionItem onClick={openModal}>
          <ActionItemText>로그아웃</ActionItemText>
        </ActionItem>
        <ActionItem onClick={openDeleteModal}>
          <ActionItemText>회원탈퇴</ActionItemText>
        </ActionItem>
      </ActionList>

      {isOpen && (
        <ModalOverlay>
          <StyledModalBox>
            <ModalTitle>로그아웃 하시겠습니까?</ModalTitle>
            <ModalButtonGroup>
              <CancelButton onClick={closeModal}>아니요</CancelButton>
              <ConfirmButton onClick={handleLogout}>네</ConfirmButton>
            </ModalButtonGroup>
          </StyledModalBox>
        </ModalOverlay>
      )}

      {isDeleteModalOpen && (
        <ModalOverlay>
          <StyledModalBox>
            <ModalTitle>회원탈퇴 하시겠습니까?</ModalTitle>
            <ModalButtonGroup>
              <CancelButton onClick={closeDeleteModal}>아니요</CancelButton>
              <ConfirmButton onClick={handleDeleteUser}>네</ConfirmButton>
            </ModalButtonGroup>
          </StyledModalBox>
        </ModalOverlay>
      )}
    </div>
  );
};

export default UserInfo;

const UserInfoWrapper = styled.div`
  margin-bottom: 24px;
`;

const Name = styled.h1`
  font-family: 'Pretendard', sans-serif;
  font-weight: 600;
  font-size: 24px;
  line-height: 140%;
  letter-spacing: -0.025em;
  color: #18181B;
`;

const Email = styled.p`
  font-family: 'Pretendard', sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 140%;
  letter-spacing: -0.025em;
  color: #A1A1AA;
`;


const StatsBox = styled.div`
  width: 361px;
  height: 112px;
  background-color: #ffffff;
  border-radius: 30px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.04);
  margin: 8px auto 24px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.span`
  font-family: 'Manrope', sans-serif;
  font-size: 18px;
  font-weight: 500;
  color: #18181B;
  line-height: 140%;
  letter-spacing: -0.025em;
`;

const Number = styled.span`
  font-family: 'Pretendard', sans-serif;
  font-size: 30px;
  font-weight: 600;
  color: #59D9CC;
  line-height: 140%;
  letter-spacing: -0.025em;
  margin-top: 4px;
`;


const ActionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ActionItem = styled.button`
  width: 361px;
  height: 69px;
  border: none;
  border-radius: 30px;
  background: #FFFFFF;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.04);
  font-family: 'Pretendard', sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: #18181B;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  cursor: pointer;

  &::after {
    content: '>';
    font-size: 18px;
    color: #18181B;
  }
`;

const ActionItemText = styled.span`
  font-family: 'Manrope', sans-serif;
  font-size: 18px;
  font-weight: 500;
  color: #18181B;
  line-height: 140%;
  letter-spacing: -0.025em;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const StyledModalBox = styled.div`
  width: 361px;
  height: 230px;
  background: #ffffff;
  border-radius: 15px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.04);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 30px;
`;


const ModalTitle = styled.div`
  font-family: 'Pretendard', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 140%;
  letter-spacing: -0.025em;
  color: #18181B;
  text-align: center;

  margin-top: 10px;
  margin-bottom: 40px;
`;

const ModalButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  position: absolute;
  bottom: 10px;
`;

const CancelButton = styled.button`
  width: 165px;
  height: 60px;
  border: none;
  border-radius: 10px;
  background-color: #A1A1AA;
  color: white;
  font-family: 'Pretendard', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 140%;
  letter-spacing: -0.025em;
  text-align: center;
  cursor: pointer;
`;

const ConfirmButton = styled.button`
  width: 165px;
  height: 60px;
  background-color: #59D9CC;
  border: none;
  border-radius: 10px;
  color: #FFFFFF;
  font-family: 'Pretendard', sans-serif;
  font-size: 18px;
  font-weight: 600;
  line-height: 140%;
  letter-spacing: -0.025em;
  cursor: pointer;
`;
