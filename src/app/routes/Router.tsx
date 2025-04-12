import { createBrowserRouter } from 'react-router';

import { RootLayout } from '@app/layout';
import { HomePage } from "@pages/home";
import { OnboardingPage } from "@pages/onboarding";
import { CommunityPage } from "@pages/community";
import { MyPage } from "@pages/my";
import { MissionCompletePage, MissionPage, MissionRecordWritePage } from "@pages/mission";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <OnboardingPage />,
      },
      {
        path: '/home',
        element: <HomePage />,
      },
      {
        path: '/onboarding',
        element: <OnboardingPage />,
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
        path: '/mission/record',
        element: <MissionRecordWritePage />,
      },
      {
        path: '/community',
        element: <CommunityPage />,
      },
      {
        path: '/my',
        element: <MyPage />,
      },
    ],
  },
]);
