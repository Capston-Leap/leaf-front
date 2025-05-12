import styled, { keyframes } from 'styled-components';

const Loader = () => {
  return (
    <LoaderWrapper>
      <svg
        width='101'
        height='101'
        viewBox='0 0 101 101'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        {circles.map((circle, index) => (
          <Circle
            key={index}
            cx={circle.cx}
            cy={circle.cy}
            r='8.04546'
            transform={circle.transform}
            fill={index === 0 ? '#2D2D2D' : '#D9D9D9'}
            $index={index}
          />
        ))}
      </svg>
    </LoaderWrapper>
  );
};

export default Loader;

const circles = [
  { cx: '90.6958', cy: '48.9154', transform: 'rotate(177.742 90.6958 48.9154)' },
  { cx: '10.304', cy: '52.0846', transform: 'rotate(177.742 10.304 52.0846)' },
  { cx: '52.085', cy: '90.6959', transform: 'rotate(177.742 52.085 90.6959)' },
  { cx: '48.9148', cy: '10.3039', transform: 'rotate(177.742 48.9148 10.3039)' },
  { cx: '23.1973', cy: '80.0437', transform: 'rotate(-137.258 23.1973 80.0437)' },
  { cx: '77.8025', cy: '20.9565', transform: 'rotate(-137.258 77.8025 20.9565)' },
  { cx: '20.9566', cy: '23.198', transform: 'rotate(-47.2577 20.9566 23.198)' },
  { cx: '80.0445', cy: '77.8023', transform: 'rotate(-47.2577 80.0445 77.8023)' },
];

const animation = keyframes`
  0%, 100% { fill: #2D2D2D; }
  12.5% { fill: #D9D9D9; }
`;

const Circle = styled.circle<{ $index: number }>`
  animation: ${animation} 1s linear infinite;
  animation-delay: ${({ $index }) => `${$index * 0.125}s`};
`;

const LoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 96px;
  height: 96px;
  margin: auto;
`;
