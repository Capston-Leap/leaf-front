# React Project Template Repository
리액트 프로젝트 초기 세팅 시간 단축을 위한 템플릿 프로젝트

## Stack
- React, Vitem TypeScript + SWC
- TanstackQuery, Zustand, Styled-components

## Layer
### src
- app
  - App 관련 설정
  - layout - layout 관리
  - providers - App 컴포넌트에 추가할 provider 관리
  - routes - 페이지 라우팅
  - styles - 글로벌 스타일
- pages
  - home, post, profile 등 페이지 라우팅 단위
  - ui 디렉토리 생성 후 페이지 컴포넌트 관리
  - index.ts 파일을 통해 export
- shared
  - assets - icon, image 파일
  - types - type, interface 정의
