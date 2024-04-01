---
date: "2024-04-01"
title: "eslint,prettier 설정, Pre-commit Hook 구현"
imgpath: "/img/eslint/cover.jpeg"
---

# eslint,prettier 설정, Pre-commit Hook 구현

## 1. Intro

eslint, prettier를 사용할 때 직접 설정을 해본 적은 처음인 거 같습니다.
협업할 때 같은 lint로 코드를 짜게 되면 확실히 코드의 통일성 덕분에 읽기 편해졌던 기억이 있습니다. 항상 팀원분들이 설정해 주던 eslint를 제 프로젝트에서 설정해 봤습니다.

프로젝트 스택은 next와 ts를 사용하고 있습니다.

## 2. eslint 설정

ESLint는 개발자들이 프로젝트의 코드 품질을 향상시키고 일관된 코딩 스타일을 유지할 수 있도록 도와줍니다.

밑의 블로그를 참고해서 설정해 주세요

### 참고자료

- [Next.js 프로젝트에 ESLint와 Prettier 설정하기](https://tech.toktokhan.dev/2021/05/14/nextjs-project-setting/)

.eslintignore 파일은 .gitignore처럼 eslint 의 검증 대상 목록에서 제외되는 대상을 적는 파일입니다.

```json
// /.eslintignore
.next
next-env.d.ts
yarn.lock
public
next.config.js
README.md
Dockerfile
.nvmrc
.vscode
.idea
.yarn
.pnp.*
test.tsx
```

## 3. prettier 설정

Prettier는 코드 포맷터로서, 코드의 일관된 스타일을 유지하고 개발자들이 코드를 더 쉽게 읽고 유지할 수 있도록 돕는 도구입니다.

밑의 블로그를 참고해서 설정해 주세요

### 참고자료

- [Next.js 프로젝트에 ESLint와 Prettier 설정하기](https://tech.toktokhan.dev/2021/05/14/nextjs-project-setting/)

## 4. vscode 설정

eslint,prettier 확장자를 다운 받은 뒤

vscode 왼쪽 하단의 설정에서 Editor: Format On Save을 검색한후 체크 해주세요.

## 5. script 추가후 사용 결과

package.json에 두 스크립트를 추가 했습니다.

```json
//package.json
"scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "format": "prettier --check --ignore-path .gitignore .",
    "format:fix": "prettier --write --ignore-path .gitignore .",
  },
```

format은 코드를 실제로 수정하지 않고 단지 현재 포맷팅 상태를 확인합니다.

format:fix은 코드를 실제로 수정하여 포맷팅을 적용합니다.

### 적용 후 결과 중 일부분

![eslint](../img/eslint/1.png)

### 결과 git 커밋

- [프리티어 스크립트 실행후 결과](https://github.com/sheepdog13/joflix/commit/5a1447fc99d3b4edb498f581f57cf7f4826983a3)

## 6. vercel build 오류

vercel에서 build를 할때 lint를 실행하기 때문에 오류가 생겨 배포과정에서 오류가 생겼습니다.

![eslint](../img/eslint/2.png)

커밋전에 lint를 실행시켜 이런 오류가 생기는 걸 방지해야 될거 같아 찾아보니
Husky, Lint-staged를 이용한 Pre-commit Hook 구현이라는 주제에 대해 알게 되었습니다.

## 7. Husky, Lint-staged를 이용한 Pre-commit Hook 구현

Husky, Lint-staged를 이용하면 commit을 하기전에 lint를 실행시켜
잘못된 파일이 git에 올라가는 걸 방지해 줍니다.

### 7.1 Husky 설정

다음의 명령어를 통해 Husky의 초기화를 해줍니다.

```bash
npx husky-init -y && npm install
```

위 명령어를 실행하면 .husky 경로가 생성되고 그 안에 pre-commit 파일이 생성됩니다.

### 7.2 Lint-staged 적용

Lint-staged를 이용하면 현재 staging 상태의 코드들에 대해서만 Lint 체크를 수행할 수 있습니다.

devDependencies에 Lint-staged를 설치해 줍니다.

```bash
npm i -D lint-staged
```

그 후 package.json 내 lint-staged를 추가해줍니다.

```json
// package.json
"...,
  "lint-staged": {
    "*.{ts,tsx,js,jsx}": [
      "eslint",
      "prettier --list-different"
    ]
  },
```

마지막으로, .husky/pre-commit 파일을 다음과 같이 수정해주면 Husky, Lint-staged를 통한 pre-commit 훅 설정이 완료됩니다.

```json
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged
```

### 결과

staging 상태의 코드중 오류가 있는 코드가 있는경우 커밋을 못한다.

![eslint](../img/eslint/3.png)

### 참고자료

- [Husky, Lint-staged를 이용한 Pre-commit Hook 구현](https://one-armed-boy.tistory.com/entry/Husky-Lint-staged%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%9C-Pre-commit-Hook-%EA%B5%AC%ED%98%84)

### git issue

- [test 코드 적용](https://github.com/sheepdog13/joflix/issues/16)

### 참고자료

- [Next.js 프로젝트에 ESLint와 Prettier 설정하기](https://tech.toktokhan.dev/2021/05/14/nextjs-project-setting/)
- [Husky, Lint-staged를 이용한 Pre-commit Hook 구현](https://one-armed-boy.tistory.com/entry/Husky-Lint-staged%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%9C-Pre-commit-Hook-%EA%B5%AC%ED%98%84)
