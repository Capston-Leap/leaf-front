import { useEffect, useState } from "react";
import ArrowLeftIcon from "@icon/ic-arrow-left-white.svg";
import styled from "styled-components";
import { useNavigate } from "react-router";
import {
  createPost,
  deletePost,
  fetchAllPosts,
  fetchMyPosts,
  getPostDetail,
  updatePost,
} from "@shared/apis/community.ts";
import TrashIcon from "@icon/trash-icon.tsx";
import { createComment, deleteComment } from "@shared/apis/comment.ts";
import SendIcon from "@icon/send-icon.svg";
import NavBar from "@shared/ui/NavBar.tsx";
import { useTokenStore } from "@shared/store/useTokenStore.ts";
import BackToolbar from "@shared/ui/BackToolbar.tsx";
import { useUserInfo } from "@shared/hooks/query/useUserInfo.ts";

const categories = ['자유', '고민', '정보'];

interface Post {
  postId: number;
  nickname: string;
  createdAt: string;
  title: string;
  content: string;
  commentCount: number;
  category?: string;
}

interface Comment {
  commentId: number;
  nickname: string;
  createdAt: string;
  content: string;
}

interface CreatePostResponse {
  message: string;
  postId: number;
  title: string;
  content: string;
}

export const MyPostPage = () => {
  const {data, isLoading, isError} = useUserInfo();
  const navigate = useNavigate();
  const token = useTokenStore((state) => state.token);
  const [viewMode, setViewMode] = useState<'list' | 'write' | 'detail'>('list');
  const [selectedCategory, setSelectedCategory] = useState('자유');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [showPostDeleteModal, setShowPostDeleteModal] = useState(false);
  const [showCommentDeleteModal, setShowCommentDeleteModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState<number | null>(null);
  const [commentList, setCommentList] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [postList, setPostList] = useState<Post[]>([]);

  const [editMode, setEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const selectedIndex = categories.indexOf(selectedCategory);

  useEffect(() => {
    if (!token) {
      alert('로그인이 필요합니다.');
      navigate('/login');
      return;
    }
    const loadPosts = async () => {
      try {
        const communityId = selectedIndex + 1;
        const data = await fetchMyPosts(communityId, 1, 10);
        setPostList(data.content);
      } catch ( error ) {
        console.error("게시글 전체 조회 실패", error);
      }
    };
    loadPosts();
  }, [token, navigate, selectedIndex]);

  const filteredPosts = postList;

  const handlePostDelete = async () => {
    if (!selectedPost) return;
    const communityId = selectedIndex + 1;
    try {
      await deletePost(communityId, selectedPost.postId);
      alert('게시글이 삭제되었습니다.');
      const updatedList = await fetchAllPosts(communityId, 1, 10);
      setPostList(updatedList.content);
      setSelectedPost(null);
      setViewMode('list');
    } catch ( error ) {
      console.error("게시글 삭제 실패", error);
      alert("게시글 삭제 중 오류가 발생했습니다.");
    } finally {
      setShowPostDeleteModal(false);
    }
  };

  const handleCommentDelete = async (commentId: number) => {
    if (!selectedPost) return;
    const communityId = selectedIndex + 1;
    const postId = selectedPost.postId;
    try {
      await deleteComment(communityId, postId, commentId);
      alert('댓글이 삭제되었습니다.');
      setCommentList(prev => prev.filter(c => c.commentId !== commentId));
      setCommentToDelete(null);
      setShowCommentDeleteModal(false);
    } catch ( err ) {
      console.error('댓글 삭제 실패', err);
      alert('댓글 삭제 중 오류가 발생했습니다.');
    }
  };
  /*const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("자유");
  const { data, fetchNextPage, hasNextPage, isLoading } = useMyPostInfoInfinite(1)

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView]);

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }*/

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  return (
    <Container>
      {viewMode === 'list' && (
        <>
          <BackToolbar title={""} />
          <TabContainer>
            {categories.map(cat => (
              <Tab key={cat} onClick={() => setSelectedCategory(cat)} $isSelected={selectedCategory === cat}>
                {cat}
              </Tab>

            ))}
            <Underline style={{ transform: `translateX(${selectedIndex * 100}%)` }} />
          </TabContainer>

          <PostList>
            {filteredPosts.map(post => (
              <PostCard key={post.postId} onClick={async () => {
                const communityId = selectedIndex + 1;
                try {
                  const detailData = await getPostDetail(communityId, post.postId);
                  const {
                    postId,
                    nickname,
                    createdAt,
                    title,
                    content,
                    commentCount,
                    comments,
                  } = detailData;

                  setSelectedPost({
                    postId,
                    nickname,
                    createdAt,
                    title,
                    content,
                    commentCount,
                  });

                  setCommentList(comments.content);
                  setViewMode('detail');
                } catch ( err ) {
                  console.error("게시글 상세 조회 실패", err);
                  alert("게시글 상세 정보를 불러오는 데 실패했습니다.");
                }
              }}>
                <PostTitle>{post.title}</PostTitle>
                <PostContent>{post.content}</PostContent>
                <PostFooter>
                  <span>{post.nickname}</span>
                  <span>{post.createdAt} | 댓글 {post.commentCount}</span>
                </PostFooter>
              </PostCard>
            ))}
          </PostList>
        </>
      )}

      {viewMode === 'write' && (
        <WriteContainer>
          <HeaderWrapper>
            <BackIconButton onClick={() => setViewMode('list')}>
              <img src={ArrowLeftIcon} alt="뒤로가기" width={24} height={24} />
            </BackIconButton>
            <HeaderTitle>게시글 작성</HeaderTitle>
          </HeaderWrapper>
          <Label>제목</Label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="제목을 작성해 주세요." />
          <Label>내용</Label>
          <Textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="내용을 작성해 주세요." />
          <SubmitButton
            disabled={!title || !content}
            onClick={async () => {
              const communityId = selectedIndex + 1;
              console.log(communityId);
              try {
                const newPost: CreatePostResponse = await createPost(communityId, title, content);
                alert(newPost.message || "게시글이 등록되었습니다.");
                const updatedList = await fetchAllPosts(communityId, 1, 10);
                setPostList(updatedList.content);
                setTitle('');
                setContent('');
                setViewMode('list');
              } catch ( err ) {
                console.error("게시글 등록 실패", err);
              }
            }}
          >
            작성 완료
          </SubmitButton>

        </WriteContainer>
      )}

      {viewMode === 'detail' && selectedPost && (
        <>
          <HeaderWrapper>
            <BackIconButton onClick={() => {
              setSelectedPost(null);
              setViewMode('list');
            }}>
              <img src={ArrowLeftIcon} alt="뒤로가기" width={24} height={24} />
            </BackIconButton>
            <TrashButton onClick={() => setShowPostDeleteModal(true)}>
              <TrashIcon color="#111" />
            </TrashButton>

          </HeaderWrapper>
          <div style={{ padding: '16px' }}>
            <PostTitle>{selectedPost.title}</PostTitle>
            <PostSubInfo>{selectedPost.nickname} · {selectedPost.createdAt}</PostSubInfo>
            <PostContent>{selectedPost.content}</PostContent>

            <CommentCount>댓글 {commentList.length}개</CommentCount>

            {commentList.map(comment => (
              <CommentItem key={comment.commentId}>
                <CommentHeader>
                  <CommentMeta><span>{comment.nickname}</span> <span>{comment.createdAt}</span></CommentMeta>
                  {(comment.nickname === data?.nickname) && <DeleteButton onClick={() => {
                    setCommentToDelete(comment.commentId);
                    setShowCommentDeleteModal(true);
                  }}>삭제</DeleteButton>
                  }
                </CommentHeader>
                <CommentText>{comment.content}</CommentText>
              </CommentItem>
            ))}

            <CommentInputWrapper>
              <StyledCommentInput
                placeholder="댓글을 입력하세요."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <SendButtonInside onClick={async () => {
                if (!newComment.trim()) return;
                const communityId = selectedIndex + 1;
                const postId = selectedPost.postId;
                try {
                  const res = await createComment(communityId, postId, newComment);
                  setCommentList(prev => [...prev, res]);
                  setNewComment('');
                } catch ( err ) {
                  console.error('댓글 등록 실패', err);
                  alert('댓글 등록에 실패했습니다.');
                }
              }}>
                <img src={SendIcon} alt="전송" />
              </SendButtonInside>
            </CommentInputWrapper>
          </div>
          {showPostDeleteModal && (
            <ModalOverlay>
              <ModalBox>
                <ModalText>게시글을 삭제하시겠습니까?</ModalText>
                <ModalButtons>
                  <ModalButton className="cancel" onClick={() => setShowPostDeleteModal(false)}>아니요</ModalButton>
                  <ModalButton className="confirm" onClick={handlePostDelete}>네</ModalButton>
                </ModalButtons>
              </ModalBox>
            </ModalOverlay>
          )}

          {showCommentDeleteModal && commentToDelete !== null && (
            <ModalOverlay>
              <ModalBox>
                <ModalText>댓글을 삭제하시겠습니까?</ModalText>
                <ModalButtons>
                  <ModalButton className="cancel" onClick={() => {
                    setShowCommentDeleteModal(false);
                    setCommentToDelete(null);
                  }}>아니요</ModalButton>
                  <ModalButton className="confirm" onClick={() => handleCommentDelete(commentToDelete)}>네</ModalButton>
                </ModalButtons>
              </ModalBox>
            </ModalOverlay>
          )}
        </>
      )}

      {editMode && selectedPost ? (
        <WriteContainer>
          <HeaderWrapper>
            <BackIconButton onClick={() => setEditMode(false)}>
              <img src={ArrowLeftIcon} alt="뒤로가기" width={24} height={24} />
            </BackIconButton>
            <HeaderTitle>게시글 수정</HeaderTitle>
          </HeaderWrapper>

          <Label>제목</Label>
          <Input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="제목을 입력하세요"
          />
          <Label>내용</Label>
          <Textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            placeholder="내용을 입력하세요"
          />
          <SubmitButton
            disabled={!editTitle || !editContent}
            onClick={async () => {
              const communityId = selectedIndex + 1;
              try {
                await updatePost(communityId, selectedPost.postId, editTitle, editContent);
                alert('게시글이 수정되었습니다.');
                const updatedList = await fetchAllPosts(communityId, 1, 10);
                setPostList(updatedList.content);
                setSelectedPost({ ...selectedPost, title: editTitle, content: editContent });
                setEditMode(false);
              } catch ( error ) {
                console.error("게시글 수정 실패", error);
                alert("게시글 수정 중 오류가 발생했습니다.");
              }
            }}
          >
            수정 완료
          </SubmitButton>
        </WriteContainer>
      ) : null}

      <NavBar />
    </Container>
    /*<Container>
      <Header>
        <BackBtn onClick={() => navigate(-1)}>
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
        {data.pages.map((page) =>
          page?.content.map((post: PostResponse) => (
            <PostCard
              key={post.postId}
              onClick={() => navigate(`/post/detail/${post.postId}`)}
            >
              <CardHeader>
                <Author>{post.nickname}</Author>
                <DateText>{post.createdAt}</DateText>
              </CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <CardContent>{post.content}</CardContent>
              <CardFooter>댓글 {post.commentCount}개</CardFooter>
            </PostCard>
          ))
        )}
        <div ref={ref}/>
      </PostList>
    </Container>*/
  );
};

const Container = styled.div`
  padding-bottom: 100px;
  margin-top: 20px;
  background-color: #f4f4f4;
`;

const TabContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  border-bottom: 1px solid #e0e0e0;
`;

const Tab = styled.button<{ $isSelected: boolean }>`
  flex: 1;
  padding: 12px 0;
  font-size: 15px;
  font-weight: ${(props) => (props.$isSelected ? '700' : '400')};
  color: ${(props) => (props.$isSelected ? '#000000' : '#A1A1AA')};
  border: none;
  background: transparent;
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
  background-color: black;
  transition: transform 0.3s ease;
`;

const PostList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 15px;
`;

const PostCard = styled.div`
  background: white;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

const PostTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const PostContent = styled.div`
  font-size: 14px;
  color: #555;
  margin: 8px 0;
`;

const PostFooter = styled.div`
  font-size: 12px;
  color: #999;
  display: flex;
  justify-content: space-between;
`;

const WriteContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 16px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 14px;
`;

const Textarea = styled.textarea`
  min-height: 320px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 10px;
  resize: none;
  font-size: 14px;
  background-color: #fff;
  line-height: 1.6;
`;


const SubmitButton = styled.button<{ disabled: boolean }>`
  width: 100%;
  padding: 14px;
  background-color: ${({ disabled }) => (disabled ? '#ddd' : '#00c2a6')};
  color: white;
  font-weight: bold;
  font-size: 16px;
  border: none;
  border-radius: 10px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;

const HeaderWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 0;
  border-bottom: 1px solid #eee;
`;

const BackIconButton = styled.button`
  position: absolute;
  left: 16px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`;

const HeaderTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  color: #111;
`;

const CommentItem = styled.div`
  background-color: #f4f4f4;
  padding: 12px;
  border-radius: 10px;
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  font-size: 12px;
  color: #999;
`;

const CommentMeta = styled.div`
  display: flex;
  gap: 12px;
`;


const CommentText = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #222;
  margin-top: 4px;
  line-height: 1.6;
`;


const PostSubInfo = styled.div`
  font-size: 12px;
  color: #999;
  margin-top: 4px;
  margin-bottom: 16px;
`;

const CommentCount = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin: 24px 0 12px;
`;

const DeleteButton = styled.button`
  font-size: 12px;
  color: #888;
  background: none;
  border: none;
  cursor: pointer;
  margin-left: auto;
`;

const CommentInputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const StyledCommentInput = styled.input`
  width: 100%;
  padding: 12px 42px 12px 16px; // 아이콘 공간 확보
  background-color: #f4f4f4;
  border: 1px solid #ddd;
  border-radius: 999px;
  font-size: 14px;
  color: #333;
  outline: none;

  &::placeholder {
    color: #999;
  }
`;

const SendButtonInside = styled.button`
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;

  img {
    width: 18px;
    height: 18px;
    opacity: 0.7;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const ModalBox = styled.div`
  background: white;
  padding: 24px;
  border-radius: 20px;
  width: 280px;
  text-align: center;
`;

const ModalText = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ModalButton = styled.button`
  flex: 1;
  padding: 12px 0;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  margin: 0 4px;

  &.cancel {
    background: #d9d9d9;
    color: white;
  }

  &.confirm {
    background: #66d4c3;
    color: white;
  }
`;

const TrashButton = styled.button`
  position: absolute;
  right: 16px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`;

/*const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100%;
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

const HeaderTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  color: #111;
`;*/


