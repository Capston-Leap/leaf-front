import { useState, useEffect } from "react";
import styled from "styled-components";
import NavBar from "@shared/ui/NavBar.tsx";
import ArrowLeftIcon from "../../../shared/assets/icon/ic-arrow-left-white.svg";
import TrashIcon from "../../../shared/assets/icon/trash-icon";
import { logoutUser, deleteUser, fetchUserProfile } from "../../../api/user";
import { fetchMyPosts, deletePost, updatePost } from "../../../api/community";

import { useNavigate } from "react-router-dom";

interface Post {
  postId: number;
  nickname: string;
  createdAt: string;
  title: string;
  content: string;
  commentCount: number;
}

export const MyPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState("default");
  const [activeTab, setActiveTab] = useState("자유");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [showPostDeleteModal, setShowPostDeleteModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [postList, setPostList] = useState<Post[]>([]);

  const navigate = useNavigate();

  const handleLogout = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const handleConfirm = async () => {
    try {
      await logoutUser();
      localStorage.removeItem("token");
      alert("로그아웃되었습니다.");
      navigate("/login");
    } catch (e) {
      console.error(e);
      alert("로그아웃에 실패했습니다.");
    } finally {
      setIsModalOpen(false);
    }
  };

  const handleDelete = () => setIsDeleteModalOpen(true);

  const handleDeleteConfirm = async () => {
    try {
      await deleteUser();
      localStorage.removeItem("token");
      alert("회원탈퇴가 완료되었습니다.");
      navigate("/signup");
    } catch (e) {
      console.error(e);
      alert("회원탈퇴에 실패했습니다.");
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  const handleDeleteCancel = () => setIsDeleteModalOpen(false);

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const userProfile = await fetchUserProfile();
        setCurrentUser({
          name: userProfile.name,
          email: userProfile.loginId,
          missionInProgress: userProfile.ongoingMissionCount,
          missionCompleted: userProfile.completedMissionCount,
        });
      } catch (e) {
        console.error("프로필 조회 실패", e);
      }
    };
    loadUserProfile();
  }, []);

  useEffect(() => {
    const loadMyPosts = async () => {
      if (!currentUser) return;
      try {
        const communityId = 1;
        const data = await fetchMyPosts(communityId, 1, 10);
        setPostList(data.content);
      } catch (e) {
        console.error("게시글 목록 조회 실패", e);
      }
    };
    loadMyPosts();
  }, [currentUser]);

  return (
    <PageWrapper>
      {currentUser && viewMode === "default" && (
        <>
          <UserInfo>
            <Name>{currentUser?.name}</Name>
            <Email>{currentUser?.email}</Email>
          </UserInfo>

          <StatsBox>
            <StatItem>
              <Label>진행중 미션</Label>
              <Number>{currentUser.missionInProgress}</Number>
            </StatItem>
            <StatItem>
              <Label>완료한 미션</Label>
              <Number>{currentUser.missionCompleted}</Number>
            </StatItem>
            <StatItem onClick={() => setViewMode("myPosts")}>
              <Label>나의 게시글</Label>
              <Number>{postList.length}</Number>
            </StatItem>
          </StatsBox>
          <ActionList>
            <ActionItem onClick={handleLogout}>
              <ActionItemText>로그아웃</ActionItemText>
            </ActionItem>
            <ActionItem onClick={handleDelete}>
              <ActionItemText>회원탈퇴</ActionItemText>
            </ActionItem>
          </ActionList>
        </>
      )}

      {currentUser && viewMode === "myPosts" && (
        <>
          <Header>
            <BackBtn onClick={() => setViewMode("default")}>
              <img src={ArrowLeftIcon} alt="뒤로가기" width="24" height="24" />
            </BackBtn>
            <HeaderTitle>나의 게시글</HeaderTitle>
          </Header>

          <TabList>
            {["자유", "고민", "정보"].map((tab) => (
              <Tab
                key={tab}
                $active={activeTab === tab}
                onClick={() => setActiveTab(tab as "자유" | "고민" | "정보")}
              >{tab}</Tab>
            ))}
            <Underline style={{ transform: `translateX(${["자유", "고민", "정보"].indexOf(activeTab) * 100}%)` }} />
          </TabList>

          <PostList>
            {postList.map((post) => (
              <PostCard
                key={post.postId}
                onClick={() => {
                  setSelectedPost(post);
                  setViewMode("postDetail");
                }}
              >
                <CardHeader>
                  <Author>{post.nickname}</Author>
                  <DateText>{post.createdAt}</DateText>
                </CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardContent>{post.content}</CardContent>
                <CardFooter>댓글 {post.commentCount}개</CardFooter>
              </PostCard>
            ))}
          </PostList>
        </>
      )}

      {viewMode === "postDetail" && selectedPost && (
        <>
          <HeaderWrapper>
            <BackBtn onClick={() => setViewMode("myPosts")}>
              <img src={ArrowLeftIcon} alt="뒤로가기" width={24} height={24} />
            </BackBtn>
            <EditButton onClick={() => {
              setTitle(selectedPost.title);
              setContent(selectedPost.content);
              setViewMode('edit');
            }}>
              수정
            </EditButton>
            <TrashButton onClick={() => setShowPostDeleteModal(true)}>
              <TrashIcon color="#111" />
            </TrashButton>
          </HeaderWrapper>

          <PostTitle>{selectedPost.title}</PostTitle>
          <PostSubInfo>{selectedPost.nickname} · {selectedPost.createdAt}</PostSubInfo>
          <PostContent>{selectedPost.content}</PostContent>
          <PostSubInfo>댓글 {selectedPost.commentCount}개</PostSubInfo>
          <Divider />
        </>
      )}

      {showPostDeleteModal && selectedPost && (
        <ModalOverlay>
          <ModalBox>
            <ModalText>게시글을 삭제하시겠습니까?</ModalText>
            <ModalButtons>
              <ModalButton $cancel onClick={() => setShowPostDeleteModal(false)}>아니요</ModalButton>
              <ModalButton onClick={async () => {
                try {
                  const communityId = 1;
                  await deletePost(communityId, selectedPost.postId);
                  alert("게시글이 성공적으로 삭제되었습니다.");
                  setPostList(prev => prev.filter(p => p.postId !== selectedPost.postId));
                  setSelectedPost(null);
                  setShowPostDeleteModal(false);
                  setViewMode("myPosts");
                } catch (err) {
                  console.error("게시글 삭제 실패", err);
                  alert("게시글 삭제에 실패했습니다.");
                }
              }}>네</ModalButton>
            </ModalButtons>
          </ModalBox>
        </ModalOverlay>
      )}

      {isModalOpen && (
        <ModalOverlay>
          <StyledModalBox>
            <ModalTitle>로그아웃 하시겠습니까?</ModalTitle>
            <ModalButtonGroup>
              <CancelButton onClick={handleCancel}>아니요</CancelButton>
              <ConfirmButton onClick={handleConfirm}>네</ConfirmButton>
            </ModalButtonGroup>
          </StyledModalBox>
        </ModalOverlay>
      )}

      {isDeleteModalOpen && (
        <ModalOverlay>
          <ModalBox>
            <ModalTitleText>회원탈퇴 하시겠습니까?</ModalTitleText>
            <ModalButtons>
              <CancelButton onClick={handleDeleteCancel}>아니요</CancelButton>
              <ConfirmButton onClick={handleDeleteConfirm}>네</ConfirmButton>
            </ModalButtons>
          </ModalBox>
        </ModalOverlay>
      )}

      {viewMode === 'edit' && selectedPost && (
        <WriteContainer>
          <EditFormWrapper>
            <HeaderWrapper>
              <BackBtn onClick={() => setViewMode('postDetail')}>
                <img src={ArrowLeftIcon} alt="뒤로가기" width={24} height={24} />
              </BackBtn>
              <HeaderTitle>게시글 수정</HeaderTitle>
            </HeaderWrapper>

            <LabelText>제목</LabelText>
            <Input
              placeholder="제목을 입력하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <LabelText>내용</LabelText>
            <Textarea
              placeholder="내용을 입력하세요"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <ButtonWrapper>
              <SubmitButton
                disabled={!title || !content}
                onClick={async () => {
                  if (!selectedPost) return;
                  try {
                    const communityId = 1;
                    const res = await updatePost(
                      communityId,
                      selectedPost.postId,
                      title,
                      content
                    );

                    setSelectedPost(prev =>
                      prev
                        ? {
                          ...prev,
                          title: res.title,
                          content: res.content,
                        }
                        : null
                    );

                    setPostList(prev =>
                      prev.map(p =>
                        p.postId === selectedPost.postId
                          ? { ...p, title: res.title, content: res.content }
                          : p
                      )
                    );

                    alert("게시글이 성공적으로 수정되었습니다.");
                    setViewMode('postDetail');
                  } catch (err) {
                    console.error("게시글 수정 실패", err);
                    alert("게시글 수정 중 오류가 발생했습니다.");
                  }
                }}
              >
                수정 완료
              </SubmitButton>
            </ButtonWrapper>
          </EditFormWrapper>
        </WriteContainer>
      )}

      <NavBar />
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 24px 16px 80px;
  background-color:#F4F4F5;
  min-height: 100vh;
`;

const UserInfo = styled.div`
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


const ModalTitleText = styled.p`
  font-family: 'Pretendard', sans-serif;
  font-size: 20px;
  font-weight: 600;
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

const ModalBox = styled.div`
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

const ModalText = styled.p`
  font-family: 'Pretendard', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 140%;
  letter-spacing: -0.025em;
  color: #18181B;
  text-align: center;
  margin-bottom: 24px; 
`;

const ModalButtons = styled.div`
  display: flex;
  gap: 16px;
  position: absolute;
  bottom: 10px;
`;

const ModalButton = styled.button<{ $cancel?: boolean }>`
  width: 165px;
  height: 60px;
  border: none;
  border-radius: 10px;
  padding: 0 24px;
  font-family: 'Pretendard', sans-serif;
  font-size: 18px;
  font-weight: 600;
  line-height: 140%;
  letter-spacing: -0.025em;
  white-space: nowrap;
  cursor: pointer;
  
  color: #ffffff;
  background-color: ${({ $cancel }) => ($cancel ? '#A1A1AA' : '#59D9CC')};

  &:hover {
    opacity: 0.9;
  }
`;

const Header = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 56px;
  background-color: #F4F4F5;
`;

const BackBtn = styled.button`
  position: absolute;
  left: 16px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
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
  width: calc(100% / 3);
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
  width: 361px;
  height: 200px;
  background-color: #FFFFFF;
  border-radius: 15px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const Author = styled.span`
  font-family: 'Pretendard', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 140%;
  letter-spacing: -0.025em;
  color: #A1A1AA;
`;

const DateText = styled.span`
  font-family: 'Pretendard', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 140%;
  letter-spacing: -0.025em;
  color: #A1A1AA;
`;


const CardTitle = styled.h4`
  font-family: 'Pretendard', sans-serif;
  font-weight: 600;
  font-size: 18px;
  line-height: 140%;
  letter-spacing: -0.025em;
  color: #18181B;
  margin-bottom: 6px;
`;


const CardContent = styled.p`
  font-family: 'Pretendard', sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: -0.025em;
  color: #18181B;

  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3; 
  -webkit-box-orient: vertical;
`;


const CardFooter = styled.div`
  font-family: 'Pretendard', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 140%;
  letter-spacing: -0.025em;
  color: #A1A1AA;
  text-align: right;
  margin-top: auto;
`;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center; 
  justify-content: center; 
  position: relative;
  height: 56px;
  border-bottom: 1px solid #ccc;
  background-color: #F4F4F5;
`;

const EditButton = styled.button`
  position: absolute;
  right: 52px;
  top: 8px;
  background: #F4F4F5;
  border: none;
  font-size: 14px;
  font-weight: 700;
  color: #000;
  cursor: pointer;
`;

const TrashButton = styled.button`
  position: absolute;
  right: 16px;
  top: 6px;
  background: none;
  border: none;
  cursor: pointer;
`;

const PostTitle = styled.h2`
  font-family: 'Pretendard', sans-serif;
  font-weight: 600;
  font-size: 18px;
  line-height: 140%;
  letter-spacing: -0.025em;
  color: #18181B;
  margin: 16px 0 8px 0; 
`;

const PostSubInfo = styled.div`
  font-family: 'Pretendard', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 140%;
  letter-spacing: -0.025em;
  color: #A1A1AA;
`;

const PostContent = styled.p`
  font-size: 14px;
  color: #333;
  line-height: 1.6;
  margin-bottom: 16px;
`;

const Divider = styled.hr`
  width: 100vw;
  height: 1px;
  background-color: #E4E4E7;
  border: none;
  margin: 24px 0;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  font-size: 14px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  background-color: #fff;
  outline: none;
  margin-bottom: 16px;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 320px;
  padding: 12px;
  font-size: 14px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  resize: none;
  outline: none;
  background-color: #fff;
  line-height: 1.5;
  margin-top: 8px;
`;

const SubmitButton = styled.button`
  width: 361px;
  height: 60px;
  background-color: #59D9CC;
  color: #fff;
  font-family: 'Pretendard', sans-serif;
  font-size: 18px;
  font-weight: 600;
  line-height: 140%;
  letter-spacing: -0.025em;
  border: none;
  border-radius: 18px;

  display: block;
  margin: 32px auto 0 auto;
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const WriteContainer = styled.div`
  padding: 24px 16px;
  background-color: #F4F4F5;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LabelText = styled.label`
  font-family: 'Pretendard', sans-serif;
  font-weight: 600;
  font-size: 18px;
  line-height: 140%;
  letter-spacing: -0.025em;
  color: #18181B;
  margin-bottom: 8px;
  display: block;
`;

const EditFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
`;

const HeaderTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  color: #111;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;