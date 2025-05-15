import styled from 'styled-components';
import SupportCard from './SupportCard.tsx';
import { useInView } from 'react-intersection-observer';
import { useSupportInfoInfinite } from "@support/feature/hooks/query/useSupportInfoInfinite.ts";
import { useEffect } from "react";

interface SupportListProps {
  supportType?: "CAREER" | "ECONOMY" | "HOUSING";
}

const SupportList = ({ supportType }: SupportListProps) => {
  const { data, fetchNextPage, hasNextPage, isLoading } = useSupportInfoInfinite(supportType);

  const { ref, inView } = useInView();


  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView]);

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  return (
    <SupportListContainer>
      {data.pages.map((page) => (
        page?.responseList.map((info) => (
          <SupportCard
            key={info.infoId}
            supportType={info.infoType}
            supportTitle={info.infoTitle}
            supportSubTitle={info.infoContent}
            link={info.infoUrl}
          />
        ))
      ))}
      <div ref={ref} />
    </SupportListContainer>
  );
};

export default SupportList;

const SupportListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100%;
  gap: 16px;
`;
