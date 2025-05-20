import styled from 'styled-components';
import { getCalendarCells } from "@diary/feature/utils/date.ts";
import IcLeftArrow from '@icon/ic-arrow-left-bold.svg';
import IcRightArrow from '@icon/ic-arrow-right.svg';
import { useGetDiaryList } from "@diary/feature/hooks/query/useGetDiaryList.ts";
import { useControlDate } from "@diary/feature/hooks/custom/useControlDate.ts";
import { useNavigate } from "react-router";

const Calendar = () => {
  const { data, isLoading, isError } = useGetDiaryList(2025, 5);
  const { year, month, plusOneMonth, minusOneMonth } = useControlDate();
  const navigate = useNavigate();

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  const recordMap: Record<string, string> = {};
  // 📍 날짜 -> diaryId 매핑 추가
  const diaryMap: Record<string, number> = {};
  data.forEach(({ date, diaryId, category }) => {
    recordMap[date] = category;
    diaryMap[new Date(date).getDate()] = diaryId;
  });

  const days = getCalendarCells(year, month, recordMap);

  const written = data.find((item) => (new Date(item.date).getDate() === new Date().getDate()));

  return (
    <Wrapper>
      <Header>
        <img src={IcLeftArrow} alt="" onClick={minusOneMonth} />
        <MonthTitle>{year}년 {month + 1}월</MonthTitle>
        <img src={IcRightArrow} alt="" onClick={plusOneMonth} />
      </Header>
      <Grid>
        {['월', '화', '수', '목', '금', '토', '일'].map(day => (
          <DayName key={day}>{day}</DayName>
        ))}
        {days.map((cell, index) => (
          <Day key={index}>
            {cell.date ? (
              <>
                {cell.image && cell.date ? (
                  <EmojiImg src={cell.image} alt="emotion" onClick={() => navigate(`/diary/${cell.date?.getDate()}`, { state: { year, month, diaryId: diaryMap[cell.date!.getDate()] } })} />
                ) : (
                  <Placeholder />
                )}
                <DayNumber>{cell.date.getDate()}</DayNumber>
              </>
            ) : (
              <EmptyCell />
            )}
          </Day>
        ))}
      </Grid>
      <BottomCard>
        <Title>{`${!written ? "오늘의 일기를 작성하셨나요?" : "오늘의 일기를 작성하셨네요!"}`}</Title>
        <Description>{`${!written ? "일기를 작성하고 하루의 감정을 분석해 보세요" : "오늘 나의 상태를 자세히 확인해 보세요!"}`}</Description>
        <Button onClick={() => written ? navigate(`/diary/${new Date().getDate()}`, { state: { year, month, diaryId: diaryMap[new Date().getDate()] } }) : navigate('/diary/write')}>{`${!written ? "일기 작성하기" : "확인하기"}`}</Button>
      </BottomCard>
    </Wrapper>
  );
};

export default Calendar;

// 🧩 스타일
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  padding: 0 17px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  img {
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
`;

const MonthTitle = styled.h2`
  font: ${({ theme }) => theme.fonts.heading_sb_22px};
  color: ${({ theme }) => theme.colors.gray900};
`;

const EmptyCell = styled.div`
  height: 48px;
`;

const Grid = styled.div`
  padding: 0 17px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 18px;
`;

const DayName = styled.div`
  text-align: center;
  font-size: 12px;
  color: #888;
  margin-top: 10px;
`;

const Day = styled.div`
  text-align: center;
  height: 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const EmojiImg = styled.img`
  width: 32px;
  height: 32px;
`;

const Placeholder = styled.div`
  width: 32px;
  height: 32px;
  background-color: #e0e0e0;
  border-radius: 50%;
`;

const DayNumber = styled.small`
  font-size: 12px;
  margin-top: 4px;
  color: #333;
`;

const BottomCard = styled.div`
  margin-top: auto;
  display: flex;
  height: 20vh;
  flex-direction: column;
  padding: 34px 15px 25px 25px;
  border-top-left-radius: 20px;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
  border-top-right-radius: 20px;
`;

const Title = styled.p`
  font: ${({ theme }) => theme.fonts.body_sb_18px};
  color: #18181B;
`;

const Description = styled.p`
  font: ${({ theme }) => theme.fonts.body_m_14px};
  color: ${({ theme }) => theme.colors.gray400};
  margin-top: 15px;
`;

const Button = styled.button`
  padding: 6px 15px;
  font: ${({ theme }) => theme.fonts.body_m_14px};
  color: white;
  border-radius: 13px;
  border: none;
  background-color: ${({ theme }) => theme.colors.primary};
  margin-top: 26px;
  margin-left: auto;
`;
