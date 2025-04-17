import { Outlet } from 'react-router';
import styled from 'styled-components';

export default function RootLayout() {
  return (
    <Wrapper>
      <Outlet />
    </Wrapper>
  );
}
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  max-width: 440px;
  height: 100vh;
  padding-top: env(safe-area-inset-top);
  padding-bottom: 100px;
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
  background-color: #F4F4F5;
`;
