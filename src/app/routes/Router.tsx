import { createBrowserRouter } from 'react-router';

import { RootLayout } from '@app/layout';
import { HomePage } from "@pages/home";
import { LoginPage, InitPage, SignupPage, OnboardingPage } from "@pages/onboarding";
import { CommunityPage } from "@pages/community";
import { MyPage } from "@pages/my";
import {
  GoalSelectConfirmPage,
  GoalSelectPage, MissionCompleteDetailPage,
  MissionCompletePage,
  MissionPage,
  MissionRecordWritePage,
} from "@pages/mission";
import ChatbotPage from "@chat/ui/ChatbotPage.tsx";
import SupportPage from "@support/ui/SupportPage.tsx";
import { DiaryDetailPage, DiaryPage, DiaryWritePage } from "@pages/diary";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <InitPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/signup',
        element: <SignupPage />,
      },
      {
        path: '/onboarding',
        element: <OnboardingPage />,
      },
      {
        path: '/home',
        element: <HomePage />,
      },
      {
        path: '/onboarding',
        element: <InitPage />,
      },
      {
        path: '/mission',
        element: <MissionPage />,
      },
      {
        path: '/mission/complete',
        element: <MissionCompletePage />,
      },
      {
        path: '/mission/record/:missionId',
        element: <MissionRecordWritePage />,
      },
      {
        path: '/goal',
        element: <GoalSelectPage />,
      },
      {
        path: '/goal/confirm',
        element: <GoalSelectConfirmPage />,
      },
      {
        path: '/community',
        element: <CommunityPage />,
      },
      {
        path: '/my',
        element: <MyPage />,
      },
      {
        path: '/chat',
        element: <ChatbotPage />,
      },
      {
        path: '/support',
        element: <SupportPage />,
      },
      {
        path: '/diary',
        element: <DiaryPage />,
      },
      {
        path: '/diary/write',
        element: <DiaryWritePage />,
      },
      {
        path: '/diary/:id',
        element: <DiaryDetailPage />,
      },
      {
        path: 'mission/complete/:missionId',
        element: <MissionCompleteDetailPage />,
      }
    ],
  },
]);
