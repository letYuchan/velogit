# velogit

<img width="256" height="256" alt="logo" src="https://github.com/user-attachments/assets/149afc7b-4711-43db-a87d-88b56840b0ef" />

KO:

GitHub Pages와 Markdown 기반의 **기술/개발 블로그 플랫폼**

velogit은 단순한 블로그 프로젝트가 아니라, **누구나 쉽게 설치하고 운영할 수 있는 개발 블로그 플랫폼**입니다.  
여러분 자신을 소개하고, 습득한 지식과 테크닉을 기록하며 공유하세요.  
정적 서버 기반으로 동작하여 빠르고 안정적이며, 자동화된 기능과 강력한 커스터마이징을 제공합니다.
모바일 환경에서도 완벽한 반응형 대응을 보여줍니다.

EN:

A **tech/development blog platform** based on GitHub Pages and Markdown.

velogit is not just a blog project, but a **developer blog platform that anyone can easily install and operate**.  
Introduce yourself, record your knowledge and techniques, and share them with others.  
It runs on a static server, ensuring speed and stability, while providing automation and powerful customization.  
It provides a fully responsive design on mobile environments as well.

Recommended environment: Chrome
Tested environment: Chrome, Safari

---

<details>
<summary><h2>🎯 소개</h2></summary>

- **플랫폼**: GitHub Pages + React + Markdown
- **특징**: 쉽고 빠른 설치, 자동화된 배포, 강력한 커스터마이징 지원
- **목표**:
    - 기술 블로그 이상의 **개인 브랜딩 도구**
    - 공부 기록, 지식 공유, 자기소개와 포트폴리오까지 한 번에 관리

</details>

---

<details>
<summary><h2>✨ 주요 기능</h2></summary>

### 🖋️ 작성 관련 기능

velogit은 단순히 Markdown을 지원하는 수준을 넘어, **개발자 친화적인 작성 도구**를 제공합니다.

- **16가지 작성 도움 기능**  
  h1~h4 자동삽입, Bold, Italic, StrikeThrough, 인용문, 리스트, 코드 블록, 링크, 이미지/동영상 삽입, keyboard 태그, mark 태그, details-summary, 표 삽입, 파일 업로드 등
- **Floating Toolbar**  
  커서 위치 근처에 툴바를 띄워, 작성 흐름이 끊기지 않도록 도와줍니다.
- **다국어 교정 + 한국어 교정 기능**
    - 영어, 일본어 등 다양한 언어 교정
    - 베타 기능이지만, 한국어 문법 교정도 자동화 가능
- **작성 내용 유실 방지 기능**
    - 최대 5개의 임시글 저장 가능
    - 실수로 뒤로가기 / 새로고침 / 탭 닫기를 했을 때, 작성 중인 내용을 잃지 않도록 확인 메시지를 표시

---

### 🎨 테마 시스템

- **15가지 기본 테마 + 1 커스텀 테마** 제공
- 각 테마는 라이트/다크 모드 지원
- 간단한 설정으로 커스텀 테마 적용 가능
- **나만의 블로그 분위기**를 만들 수 있는 강력한 커스터마이징

---

### 🧘 스트레칭 팝업

개발자라면 누구나 공감하는 문제, 바로 **장시간 앉아서 작업하는 습관**!  
velogit은 단순 블로그 이상으로 **건강까지 챙길 수 있는 스트레칭 알림**을 제공합니다.

- 스트레칭 간격 및 시간 직접 설정 가능
- 작업 중간중간 “일어나서 기지개를 켜라”는 유쾌한 리마인드

---

### 🎶 블로그 배경 음악

개발자 블로그의 딱딱함과 지루함을 없애고자,  
**개인의 취향을 담을 수 있도록 배경 음악 기능**을 제공합니다.

좋아하는 음악을 틀어놓고, 글을 쓰거나 방문자와 플레이리스트를 공유해보세요.
※ 저작권을 꼭 지켜주세요!

---

### 🪪 About 페이지

블로그는 곧 **나 자신을 보여주는 공간**입니다.

- 자기소개 및 포트폴리오 요약 가능
- 자유로운 표현 가능
- 단순 기록용 블로그가 아닌, **나를 알리는 포트폴리오 플랫폼**

---

### 🐉 블로그 성장 시각화

블로그를 운영하는 재미를 더하기 위해, 성장 요소를 게임화했습니다.

- 글 작성 수(Post 개수)에 따라 블로그가 **레벨업**
- 귀여운 아케이드풍 용 캐릭터로 성장 시각화
- **Top 3 카테고리**와 누적 게시글 수도 한눈에 확인 가능

---

### 💬 댓글 기능 (Utterances 기반)

블로그에 **이슈 기반 댓글 시스템**을 추가했습니다.  
이는 [Utterances](https://utteranc.es/)를 활용하며, 사용자는 **GitHub 계정 인증**만으로 댓글을 작성할 수 있습니다.

- **특징**:

    - 댓글은 GitHub Repository의 **Issue**로 관리됩니다.
    - GitHub 계정을 가진 누구나 댓글 작성 가능.
    - 깔끔하고 블로그 스타일에 잘 어울리는 UI 제공.

- **사용 시 주의사항**:
    - 최초 댓글 작성 시 **GitHub 인증 과정**이 필요합니다.
    - 인증 후에는 **블로그 Home 화면으로 리다이렉트**됩니다.  
      → 다시 댓글을 달고 싶다면, 글 상세 페이지로 **재진입**해야 합니다.

👉 인증만 마치면 이후로는 편리하게 댓글을 달 수 있습니다.

</details>

---

<details>
<summary><h2>🚀 이용 방법</h2></summary>

### 1. 사전 준비

- Docker 설치 필요
    - macOS:
        ```bash
        brew install --cask docker
        ```
    - Windows: [Docker 공식 사이트](https://www.docker.com/get-started/)에서 다운로드

설치가 완료되면 아래 명령어로 정상 설치 여부를 확인하세요:

```bash
docker -v
docker run hello-world
```

### 2. 최초 실행

포크 후 첫 실행 시에는 아래 명령어로 Docker 이미지를 빌드하고 서버를 실행합니다:

```bash
docker compose up --build -d server
```

### 3. 개발 서버 실행

프론트엔드를 실행하려면

최초 실행 시 먼저 의존성을 설치합니다:

```bash
pnpm install
```

이후 개발 서버를 실행합니다:

```bash
pnpm run dev
```

### 4. POST 등록/삭제

- 블로그에서 새 글 작성(혹은 수정) 후 **`publish/edit` 버튼**을 누르면,  
  자동으로 **배포 스크립트 실행 코드**가 클립보드에 복사됩니다.
- 해당 코드를 **velogit 루트 폴더에서 붙여넣어 실행**하면,  
  **자동으로 GitHub Pages에 반영**됩니다.

👉 사용자는 글 작성 후 버튼을 누르고 명령어 한 줄 실행으로 `빌드 → 커밋 → 푸시 → 배포`까지 한 번에 진행됩니다.

- 글 삭제는 `velogit/posts`에서 원하는 파일을 삭제하면 됩니다.

### 5. 깃허브 페이지 설정

- 최초 글 등록을 한번 해주세요. 등록 시 gh-pages 브렌치가 자동으로 생성 및 배포됩니다.
- 이후 Settings > Pages에 들어가 아래 사진과 같이 branch를 gh-pages로 페이지를 설정해주세요.
  <img width="1239" height="596" alt="image" src="https://github.com/user-attachments/assets/a065bd1b-6057-4f0f-abc2-ec51f4317264" />
- 일반적인 주소: https://github-name.github.io/velogit

### 6. 추후 플랫폼 업데이트

velogit 원본 저장소의 최신 업데이트를 내 저장소에 반영하려면  
`upstream`을 설정하고, 주기적으로 원본을 가져와 병합해야 합니다.

```bash
git remote add upstream https://github.com/author/velogit.git
```

로 원본 저장소와 원격 설정을 하고 업데이트 내용이 있다면

```bash
	1.	git fetch upstream
	2.	git merge upstream/master
	3.	git push origin master
```

로 반영해주시며 됩니다.

</details>

---

<details>
<summary><h2>⚙️ 블로그 세팅</h2></summary>

아래 설정은 Velogit을 처음 사용할 때 반드시 진행해야 하는 필수 세팅입니다.
이 외의 설정을 임의로 변경한 뒤 배포하여 사용하는 경우, 저작권 침해에 해당할 수 있습니다.

---

### 1. 테마 설정

- 경로: `velogit/public/images/system/themes`
- `custom.png`, `custom-header.png` 파일을 원하는 이미지로 교체하세요.
- **권장사항**:

    - Header 이미지는 **21:9 비율**을 권장합니다.
    - 이미지 중앙에는 복잡한 요소가 없는 것을 추천합니다.

- 추가 설정 (색상):

    - `velogit/index.css` 에서 `.theme-custom` 과 `.theme-custom.dark` 의 색상 값을 기호에 맞게 수정하면  
      **라이트/다크 모드의 색상 테마**를 자유롭게 변경할 수 있습니다.

- 추가 설정 (기본 테마 지정):

    - 기본 진입 시 적용될 테마를 바꾸고 싶다면  
      `velogit/src/components/common/layout/footer/ThemeSelectorModal.tsx` 에서 아래 코드를 수정하세요.

        ```ts
        // before
        const [currentTheme, setCurrentTheme] = useState<string>('default');

        // after (예: 기본 테마를 'sakura'로)
        const [currentTheme, setCurrentTheme] = useState<string>('sakura');
        ```

    - **중요:** 기본 테마는 최초 진입 시 적용되는 초기값일 뿐이며,  
      이후 사용자가 테마를 변경하면 **로컬스토리지의 마지막 테마 값**이 항상 우선됩니다.
      즉, 방문자가 이전에 선택했던 테마가 있다면 그 값이 자동으로 적용됩니다.

---

### 2. 블로그 헤더 설명글

- 경로: `velogit/src/data/home.ts`
- 수정할 항목:
    - `profileImgPath` : 프로필 이미지 경로
    - `blogOwnerDesc` : 블로그 소유자 설명
    - `blogDesc` : 블로그 소개글

➡️ 이 데이터들은 **홈 화면 블로그 대문**을 꾸며줍니다.  
여러분의 프로필 이미지와 간단한 블로그 설명글을 넣어주세요.

---

### 3. 블로그 배경 음악

- 경로: `velogit/src/assets/audio`
- 배경 음악으로 사용할 `mp3` 파일을 추가하세요.
- 여러 개의 파일을 넣으면 **자동으로 랜덤 재생**됩니다. 🎶

---

### 4. About 페이지

- 경로: `velogit/src/pages/AboutPage.tsx`
- **자유롭게 커스터마이징** 가능:
    - 직접 코드를 작성해도 되고
    - 제공된 템플릿의 텍스트만 수정해도 됩니다.
- 자기소개 및 포트폴리오를 소개하는 용도로 꾸며주세요.

---

### 5. 오픈그래프 설정

- 경로: `velogit/index.html`
- `letYuchan` 이라고 적힌 부분을 **여러분의 GitHub 계정 아이디**로 바꿔주세요.

➡️ 블로그 공유 시 썸네일/메타데이터에 반영됩니다.

---

📌 해당 내용을 GitHub Pages에도 반영하려면, 모든 설정을 마친 후 아래 명령어를 실행해주세요:

```bash
pnpm run deploy
```

📌 위 설명은 실제 앱의 **Help 모달**에서도 확인 가능합니다.

</details>

---

<details>
<summary><h2>📦 릴리즈 및 업데이트 내역</h2></summary>

### 📌 현재 릴리즈

- **v1.0.0 (Beta)**  
  velogit의 첫 공식 배포 버전입니다.

### 📝 업데이트 내역

⏳ 앞으로의 업데이트 내역은 이곳에 계속 기록될 예정입니다.

</details>

---

<details>
<summary><h2>🛡️ 라이선스</h2></summary>

© 2025 **Velogit** — Created by **letYuchan**  
Licensed under **CC BY-NC 4.0** (Personal and Non-Commercial Use Only)

</details>

---

<details>
<summary><h2>🤝 기여하기</h2></summary>

- velogit은 더 나은 플랫폼을 지향합니다.
- 버그 제보, 기능 제안, 코드 기여 모두 환영합니다!

</details>

---

## English description ⬇️⬇️⬇️

---

<details>
<summary><h2>🎯 Introduction</h2></summary>

- **Platform**: GitHub Pages + React + Markdown
- **Features**: Easy installation, automated deployment, strong customization support
- **Goals**:
    - More than just a tech blog — a **personal branding tool**
    - Manage study notes, knowledge sharing, self-introduction, and portfolio all in one place

</details>

---

<details>
<summary><h2>✨ Key Features</h2></summary>

### 🖋️ Writing Features

velogit goes beyond basic Markdown support by providing **developer-friendly authoring tools**:

- **16 authoring helpers**  
  h1~h4 auto-insertion, Bold, Italic, StrikeThrough, Blockquotes, Lists, Code blocks, Links, Images/Videos, Keyboard tag, Mark tag, Details-Summary, Tables, File uploads, etc.
- **Floating Toolbar**  
  Appears near your cursor so you don’t break your writing flow.
- **Multilingual + Korean Grammar Correction**
    - Supports multiple languages such as English and Japanese
    - Beta: automatic Korean grammar correction
- **Unsaved Content Protection** - You can keep up to 5 draft posts - Shows a confirmation dialog when the user accidentally navigates back, refreshes, or closes the tab, preventing loss of unsaved content

---

### 🎨 Theme System

- **15 built-in themes + 1 custom theme**
- Light/Dark mode support per theme
- Easy customization to create **your own blog vibe**

---

### 🧘 Stretching Popup

Developers often suffer from sitting too long.  
velogit goes beyond blogging by adding a **health-conscious stretching reminder**.

- Set stretching intervals and duration
- Friendly reminders to keep you moving

---

### 🎶 Blog Background Music

Break the stereotype of stiff developer blogs.  
Add **background music** to personalize your blog. 🎵

_Remember to respect copyright when using music files._

---

### 🪪 About Page

Your blog is also a **portfolio and introduction space**.

- Summarize your portfolio and self-introduction
- Customize with Markdown + HTML freely

---

### 🐉 Blog Growth Visualization

Make blogging fun with gamified growth features:

- Blog levels up based on post count
- Cute arcade-style dragon visualizes progress
- Track **Top 3 categories** and total posts at a glance

---

### 💬 Comment System (Powered by Utterances)

We have added an **issue-based comment system** using [Utterances](https://utteranc.es/).  
This allows users to leave comments with a simple **GitHub account authentication**.

- **Features**:

    - Comments are stored and managed as **GitHub Issues**.
    - Anyone with a GitHub account can post comments.
    - Provides a clean UI that integrates seamlessly with the blog.

- **Important Notes**:
    - When posting a comment for the first time, **GitHub authentication** is required.
    - After authentication, you will be redirected to the **Home page**.  
      → To continue commenting, you need to **re-enter the post detail page**.

👉 Once authenticated, commenting will be smooth and convenient from then on.

</details>

---

<details>
<summary><h2>🚀 Usage</h2></summary>

### 1. Prerequisites

Docker is required.

- macOS:
    ```bash
    brew install --cask docker
    ```
- Windows: [Docker Official Site](https://www.docker.com/get-started/)

Check installation with:

```bash
docker -v
docker run hello-world
```

### 2. First Run

After forking, build and start the Docker image:

```bash
docker compose up --build -d server
```

### 3. Start Dev Server

Run the frontend locally

When running for the first time, install dependencies:

```bash
pnpm install
```

Then, start the development server:

```bash
pnpm run dev
```

### 4. Post Publishing/Delete

- After creating/editing a post, click **`publish/edit` button**.  
  A deployment script command will be copied to your clipboard.
- Paste and execute it in the **velogit root folder** to  
  automatically deploy to GitHub Pages.

👉 With one command, you can handle `build → commit → push → deploy`.

- To delete a post, simply remove the desired file from velogit/posts.

### 5. GitHub Pages Setup

- Please register (publish) at least one post for the first time.
  When you do, the gh-pages branch will be automatically created and deployed.
- Then go to Settings > Pages in your repository and configure it as shown below, by selecting the gh-pages branch as the Pages source.
  <img width="1239" height="596" alt="image" src="https://github.com/user-attachments/assets/a065bd1b-6057-4f0f-abc2-ec51f4317264" />
- The default site address will be: https://github-username.github.io/velogit

### 6. Keeping Updated

To sync with the original repository, set `upstream` and pull updates:

```bash
git remote add upstream https://github.com/author/velogit.git
```

Then apply updates with:

```bash
git fetch upstream
git merge upstream/master
git push origin master
```

</details>

---

<details>
<summary><h2>⚙️ Blog Setup</h2></summary>

Modifying configurations beyond the provided settings and deploying the application may constitute a copyright violation.

### 1. Theme Setup

- Path: `velogit/public/images/system/themes`
- Replace `custom.png` and `custom-header.png` with your own images.
- **Recommendations**:

    - Use **21:9 ratio** for the header.
    - Keep the center area clean/simple.

- Additional (Colors):  
  Edit `velogit/index.css` to change `.theme-custom` and `.theme-custom.dark` color values for Light/Dark theme customization.

- Additional (Default Theme):  
  To change the initial theme, edit:  
  `velogit/src/components/common/layout/footer/ThemeSelectorModal.tsx`

    ```ts
    // default
    const [currentTheme, setCurrentTheme] = useState<string>('default');

    // example (default theme set to 'sakura')
    const [currentTheme, setCurrentTheme] = useState<string>('sakura');
    ```

    ⚠️ Note: After first load, user theme preference is stored in **localStorage**, which always takes priority.

---

### 2. Blog Header Text

- Path: `velogit/src/data/home.ts`
- Update these values:
    - `profileImgPath`: profile image path
    - `blogOwnerDesc`: blog owner description
    - `blogDesc`: blog introduction

---

### 3. Background Music

- Path: `velogit/src/assets/audio`
- Add `.mp3` files for background music.
- Multiple files → **random shuffle playback**. 🎶

---

### 4. About Page

- Path: `velogit/src/pages/AboutPage.tsx`
- Fully customizable:
    - Write your own code
    - Or just edit template text

---

### 5. Open Graph Metadata

- Path: `velogit/index.html`
- Replace all `letYuchan` strings with your GitHub username.

➡️ Affects shared preview metadata (thumbnail/title/desc).

---

📌 To apply these changes to GitHub Pages, please finish all configurations first, then run:

```bash
pnpm run deploy
```

📌 These setup instructions are also available in the app’s **Help modal**.

</details>

---

<details>
<summary><h2>📦 Release & Update Notes</h2></summary>

### 📌 Current Release

- **v1.0.0 (Beta)**  
  The very first official release of velogit.

### 📝 Update History

⏳ Future updates will be continuously documented here.

</details>

---

<details>
<summary><h2>🛡️ License</h2></summary>

© 2025 **velogit** — Created by **letYuchan**  
Licensed under **CC BY-NC 4.0** (Personal and Non-Commercial Use Only)

</details>

---

<details>
<summary><h2>🤝 Contributing</h2></summary>

- velogit aims to evolve into a better platform.
- Bug reports, feature requests, and contributions are welcome!

</details>
