import { useState } from "react";
import styled from "styled-components";
import NavBar from "@shared/ui/NavBar";
import ArrowLeftIcon from "../../../shared/assets/icon/ic-arrow-left-white.svg";

export const MyPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"default" | "myPosts">("default");
  const [activeTab, setActiveTab] = useState<"자유" | "고민" | "정보">("자유");

  const handleLogout = () => {
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    console.log("로그아웃되었습니다!");
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    console.log("회원탈퇴 진행");
    setIsDeleteModalOpen(false);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <PageWrapper>
      {viewMode === "default" && (
        <>
          <UserInfo>
            <Name>단풍님</Name>
            <Email>fall@naver.com</Email>
          </UserInfo>

          <StatsBox>
            <StatItem>
              <Label>진행중 미션</Label>
              <Number>4</Number>
            </StatItem>
            <StatItem>
              <Label>완료한 미션</Label>
              <Number>12</Number>
            </StatItem>
            <StatItem onClick={() => setViewMode("myPosts")}>
              <Label>나의 게시글</Label>
              <Number>12</Number>
            </StatItem>
          </StatsBox>

          <ActionList>
            <ActionItem onClick={handleLogout}>로그아웃</ActionItem>
            <ActionItem onClick={handleDelete}>회원탈퇴</ActionItem>
          </ActionList>
        </>
      )}

      {viewMode === "myPosts" && (
        <>
          <Header>
            <BackBtn onClick={() => setViewMode("default")}>
              <img src={ArrowLeftIcon} alt="뒤로가기" width="24" height="24" />
            </BackBtn>
            <h2>나의 게시글</h2>
          </Header>

          <TabList>
            {["자유", "고민", "정보"].map((tab) => (
              <Tab
                key={tab}
                $active={activeTab === tab}
                onClick={() => setActiveTab(tab as "자유" | "고민" | "정보")}
              >
                {tab}
              </Tab>
            ))}
            <Underline style={{ transform: `translateX(${["자유", "고민", "정보"].indexOf(activeTab) * 100}%)` }} />
          </TabList>

          <PostList>
            {[1, 2].map((id) => (
              <PostCard key={id}>
                <CardHeader>
                  <span>리피파</span>
                  <span>2024년 5월 17일</span>
                </CardHeader>
                <CardTitle>개발 언어를 배우고 싶어요</CardTitle>
                <CardContent>
                  어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구
                </CardContent>
                <CardFooter>댓글 17개</CardFooter>
              </PostCard>
            ))}
          </PostList>
        </>
      )}

      {isModalOpen && (
        <ModalOverlay>
          <ModalBox>
            <ModalText>로그아웃 하시겠습니까?</ModalText>
            <ModalButtons>
              <ModalButton $cancel onClick={handleCancel}>아니요</ModalButton>
              <ModalButton onClick={handleConfirm}>네</ModalButton>
            </ModalButtons>
          </ModalBox>
        </ModalOverlay>
      )}

      {isDeleteModalOpen && (
        <ModalOverlay>
          <ModalBox>
            <ModalText>회원탈퇴 하시겠습니까?</ModalText>
            <ModalButtons>
              <ModalButton $cancel onClick={handleDeleteCancel}>아니요</ModalButton>
              <ModalButton onClick={handleDeleteConfirm}>네</ModalButton>
            </ModalButtons>
          </ModalBox>
        </ModalOverlay>
      )}

      <NavBar />
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  padding: 24px 16px 80px;
  background-color: #f7f7f7;
  min-height: 100vh;
`;

const UserInfo = styled.div`
  margin-bottom: 24px;
`;
const Name = styled.div`
  font-size: 18px;
  font-weight: bold;
`;
const Email = styled.div`
  font-size: 14px;
  color: gray;
`;

const StatsBox = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: white;
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 24px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`;

const StatItem = styled.div`
  text-align: center;
  flex: 1;
  cursor: pointer;
`;

const Label = styled.div`
  font-size: 14px;
  color: #555;
`;
const Number = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #00c2a6;
`;

const ActionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ActionItem = styled.div`
  background-color: white;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  &::after {
    content: "›";
    color: gray;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

const ModalBox = styled.div`
  background: white;
  border-radius: 16px;
  padding: 32px 24px;
  width: 90%;
  max-width: 360px;
  text-align: center;
`;

const ModalText = styled.div`
  font-weight: bold;
  margin-bottom: 20px;
`;

const ModalButtons = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 20px;
`;

const ModalButton = styled.button<{ $cancel?: boolean }>`
  flex: 1;
  padding: 12px 0;
  border-radius: 10px;
  border: none;
  font-weight: bold;
  color: white;
  font-size: 15px;
  background-color: ${({ $cancel }) => ($cancel ? "#999" : "#00c2a6")};
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 16px;
`;

const BackBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;

const TabList = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
`;

const Tab = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 12px 0;
  font-size: 16px;
  font-weight: ${({ $active }) => ($active ? '700' : '400')};
  color: ${({ $active }) => ($active ? '#111' : '#bbb')};
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  z-index: 1;
`;

const Underline = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: calc(100% / 3); // 탭 3개니까
  height: 2px;
  background-color: #111;
  transition: transform 0.3s ease;
`;


const PostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const PostCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #999;
  margin-bottom: 4px;
`;

const CardTitle = styled.h4`
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 6px;
`;

const CardContent = styled.p`
  font-size: 14px;
  color: #444;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const CardFooter = styled.div`
  text-align: right;
  font-size: 12px;
  color: #999;
  margin-top: 12px;
`;

