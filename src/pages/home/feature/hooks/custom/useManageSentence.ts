import { useState } from "react";

export const useManageSentence = () => {
  const [sentenceIndex, setSentenceIndex] = useState(0); // 현재 문장 인덱스 관리

  const SentenceSet = [
    '오늘은 무슨 일 없었어?',
    '안녕! 오늘 기분은 어때?',
    '넌 정말 잘하고 있어!',
    '오늘 뭔가 재밌는 일이 있었을까?',
    '어떤 하루를 보냈는지 들려줄래?',
  ];

  const handleNextSentence = () => {
    setSentenceIndex((prevIndex) => (prevIndex + 1) % SentenceSet.length); // 다음 문장으로 이동, 마지막 문장 후 처음으로
  };

  return { sentenceIndex, SentenceSet, handleNextSentence };
}
