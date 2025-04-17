import { useState } from 'react';
import styled from 'styled-components';
import NavBar from '@shared/ui/NavBar.tsx';
import PlusIcon from '../../../shared/assets/icon/plus-icon';
import ArrowLeftIcon from '../../../shared/assets/icon/ic-arrow-left-white.svg';
import SendIcon from '../../../shared/assets/icon/send-icon.svg';
import TrashIcon from '../../../shared/assets/icon/trash-icon';

const categories = ['자유', '고민', '정보'];

const dummyPosts = [
  { id: 1, author: '리피파', title: '개발 언어를 배우고 싶어요', content: '어쩌구저쩌구...', date: '2024년 5월 17일', comments: 17, category: '자유' },
  { id: 2, author: '리피파', title: '개발 언어를 배우고 싶어요', content: '어쩌구저쩌구...', date: '2024년 5월 17일', comments: 17, category: '자유' },
  { id: 3, author: '리피파', title: '개발 언어를 배우고 싶어요', content: '어쩌구저쩌구...', date: '2024년 5월 17일', comments: 17, category: '자유' },
  { id: 4, author: '고민중', title: '자바스크립트가 너무 어렵네요', content: 'JS 너무 어렵습니다 도와주세요...', date: '2024년 5월 16일', comments: 5, category: '고민' },
  { id: 5, author: '고민중', title: '자바스크립트가 너무 어렵네요', content: 'JS 너무 어렵습니다 도와주세요...', date: '2024년 5월 16일', comments: 5, category: '고민' },
  { id: 6, author: '고민중', title: '자바스크립트가 너무 어렵네요', content: 'JS 너무 어렵습니다 도와주세요...', date: '2024년 5월 16일', comments: 5, category: '고민' },
  { id: 7, author: '정보요정', title: '프론트엔드 공부자료 추천', content: '이 자료 추천합니다~', date: '2024년 5월 15일', comments: 3, category: '정보' },
  { id: 8, author: '정보요정', title: '프론트엔드 공부자료 추천', content: '이 자료 추천합니다~', date: '2024년 5월 15일', comments: 3, category: '정보' },
  { id: 9, author: '정보요정', title: '프론트엔드 공부자료 추천', content: '이 자료 추천합니다~', date: '2024년 5월 15일', comments: 3, category: '정보' },
];

export const CommunityPage = () => {
  const [viewMode, setViewMode] = useState<'list' | 'write' | 'detail'>('list');
  const [selectedCategory, setSelectedCategory] = useState('자유');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedPost, setSelectedPost] = useState<typeof dummyPosts[0] | null>(null);
  const [showPostDeleteModal, setShowPostDeleteModal] = useState(false);
  const [showCommentDeleteModal, setShowCommentDeleteModal] = useState(false);

  const selectedIndex = categories.indexOf(selectedCategory);
  const filteredPosts = dummyPosts.filter(post => post.category === selectedCategory);

  const handlePostDelete = () => {
    setSelectedPost(null);
    setViewMode('list');
    setShowPostDeleteModal(false);
  };

  const handleCommentDelete = () => {
    setShowCommentDeleteModal(false);
    console.log('댓글 삭제됨');
  };

  return (
    <Container>
      {viewMode === 'list' && (
        <>
          <HeaderRow>
            <Title>커뮤니티</Title>
            <WriteButton onClick={() => setViewMode('write')}>
              <PlusIcon color="#111" />
            </WriteButton>
          </HeaderRow>

          <TabContainer>
            {categories.map((cat) => (
              <Tab
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                isSelected={selectedCategory === cat}
              >
                {cat}
              </Tab>
            ))}
            <Underline style={{ transform: `translateX(${selectedIndex * 100}%)` }} />
          </TabContainer>

          <PostList>
            {filteredPosts.map((post) => (
              <PostCard key={post.id} onClick={() => {
                setSelectedPost(post);
                setViewMode('detail');
              }}>
                <PostTitle>{post.title}</PostTitle>
                <PostContent>{post.content}</PostContent>
                <PostFooter>
                  <span>{post.author}</span>
                  <span>{post.date} | 댓글 {post.comments}</span>
                </PostFooter>
              </PostCard>
            ))}
          </PostList>
        </>
      )}

      {viewMode === 'write' && (
        <WriteContainer>
          <HeaderWrapper>
            <BackIconButton onClick={() => setViewMode("list")}> <img src={ArrowLeftIcon} alt="뒤로가기" width={24} height={24} /> </BackIconButton>
            <HeaderTitle>게시글 작성</HeaderTitle>
          </HeaderWrapper>
          <Label>제목</Label>
          <Input placeholder="제목을 작성해 주세요." value={title} onChange={(e) => setTitle(e.target.value)} />
          <Label>내용</Label>
          <Textarea placeholder="내용을 작성해 주세요." value={content} onChange={(e) => setContent(e.target.value)} />
          <SubmitButton disabled={!title || !content} onClick={() => { setTitle(''); setContent(''); setViewMode('list'); }}>작성 완료</SubmitButton>
        </WriteContainer>
      )}

      {viewMode === 'detail' && selectedPost && (
        <>
          <HeaderWrapper>
            <BackIconButton onClick={() => { setSelectedPost(null); setViewMode('list'); }}> <img src={ArrowLeftIcon} alt="뒤로가기" width={24} height={24} /> </BackIconButton>
            <TrashButton onClick={() => setShowPostDeleteModal(true)}> <TrashIcon color="#111" /> </TrashButton>
          </HeaderWrapper>

          <PostTitle>{selectedPost.title}</PostTitle>
          <PostSubInfo>{selectedPost.author} · {selectedPost.date}</PostSubInfo>
          <PostContent>{selectedPost.content}</PostContent>

          <CommentCount>댓글 {selectedPost.comments}개</CommentCount>

          <CommentItem>
            <CommentHeader>
              <CommentMeta><span>리피파</span> <span>2024년 5월 17일</span></CommentMeta>
              <DeleteButton onClick={() => setShowCommentDeleteModal(true)}>삭제</DeleteButton>
            </CommentHeader>
            <CommentText>어쩌구저쩌구어쩌구어쩌구</CommentText>
          </CommentItem>

          <CommentItem>
            <CommentHeader>
              <CommentMeta><span>클클클</span> <span>2024년 5월 17일</span></CommentMeta>
              <DeleteButton onClick={() => setShowCommentDeleteModal(true)}>삭제</DeleteButton>
            </CommentHeader>
            <CommentText>어쩌구저쩌구어쩌구어쩌구</CommentText>
          </CommentItem>

          <CommentInputWrapper>
            <StyledCommentInput placeholder="댓글을 입력하세요." />
            <SendButtonInside><img src={SendIcon} alt="전송" /></SendButtonInside>
          </CommentInputWrapper>

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

          {showCommentDeleteModal && (
            <ModalOverlay>
              <ModalBox>
                <ModalText>댓글을 삭제하시겠습니까?</ModalText>
                <ModalButtons>
                  <ModalButton className="cancel" onClick={() => setShowCommentDeleteModal(false)}>아니요</ModalButton>
                  <ModalButton className="confirm" onClick={handleCommentDelete}>네</ModalButton>
                </ModalButtons>
              </ModalBox>
            </ModalOverlay>
          )}
        </>
      )}

      <NavBar />
    </Container>
  );
};


const Container = styled.div`
  padding: 20px;
  padding-bottom: 100px;
  background-color:#f4f4f4;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
`;

const WriteButton = styled.button`
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
`;

const TabContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  border-bottom: 1px solid #e0e0e0;
`;

const Tab = styled.button<{ isSelected: boolean }>`
  flex: 1;
  padding: 12px 0;
  font-size: 15px;
  font-weight: ${(props) => (props.isSelected ? '700' : '400')};
  color: ${(props) => (props.isSelected ? '#000000' : '#A1A1AA')};
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
  padding: 12px 42px 12px 16px;  // 아이콘 공간 확보
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
