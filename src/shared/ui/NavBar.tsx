import { useLocation, useNavigate } from "react-router";
import styled from "styled-components";
import HomeIcon from "@icon/home-icon.tsx";
import MissionIcon from "@icon/misson-icon.tsx";
import PolicyIcon from "@icon/policy-icon.tsx";
import MyIcon from "@icon/my-icon.tsx";
import { useEffect } from "react";
import { ActiveIndex, useBottomNavigationStore } from "@shared/store/useBottomNavigationStore.ts";
import { theme } from "@app/styles";


function NavBar() {
  const navigate = useNavigate();
  const { activeIndex, setActiveIndex } = useBottomNavigationStore();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/home') {
      setActiveIndex(ActiveIndex.HOME);
    } else if (location.pathname === '/mission') {
      setActiveIndex(ActiveIndex.MISSION);
    } else if (location.pathname === '/community') {
      setActiveIndex(ActiveIndex.COMMUNITY);
    } else if (location.pathname === '/my') {
      setActiveIndex(ActiveIndex.MY);
    }
  }, [location.pathname]);

  return (
    <Wrapper>
      <Container>
        <MenuBtn
          $active={activeIndex === ActiveIndex.HOME}
          onClick={() => navigate('/home', { replace: true })}
        >
          <HomeIcon
            color={activeIndex === ActiveIndex.HOME ? theme.colors.primary : theme.colors.gray400}
          />
          홈
        </MenuBtn>
        <MenuBtn
          $active={activeIndex === ActiveIndex.MISSION}
          onClick={() => navigate('/mission', { replace: true })}
        >
          <MissionIcon
            color={activeIndex === ActiveIndex.MISSION ? theme.colors.primary : theme.colors.gray400}
          />
          미션
        </MenuBtn>
        <MenuBtn
          $active={activeIndex === ActiveIndex.COMMUNITY}
          onClick={() => navigate('/community', { replace: true })}
        >
          <PolicyIcon
            color={activeIndex === ActiveIndex.COMMUNITY ? theme.colors.primary : theme.colors.gray400}
          />
          커뮤니티
        </MenuBtn>
        <MenuBtn
          $active={activeIndex === ActiveIndex.MY}
          onClick={() => navigate('/my', { replace: true })}
        >
          <MyIcon
            color={activeIndex === ActiveIndex.MY ? theme.colors.primary : theme.colors.gray400}
          />
          마이
        </MenuBtn>
      </Container>
    </Wrapper>
  );
}

export default NavBar;

const Wrapper = styled.nav`
  position: fixed;
  bottom: 10px;
  width: 100vw;
  max-width: 480px;
  padding: 0 48px 15px 48px;
`;
const Container = styled.div`
  width: 100%;
  height: 68px;
  border-radius: 26px;
  background: rgba(255, 255, 255, 0.75);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);

  display: flex;
  padding: 0 30px;
  align-items: center;
  justify-content: space-between;
`;

const MenuBtn = styled.button<{ $active: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: none;
  width: 70px;
  padding: 0;
  font: ${({ theme }) => theme.fonts.body_m_14px};
  color: ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.gray400)};
`;
