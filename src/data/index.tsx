export const stretchingTips = [
    'Rotate your neck slowly in a full circle to the left and right.',
    'Clasp your hands and stretch your arms forward.',
    'Place your hands on your lower back, open your chest, and lean forward.',
    'Cross your arms and relax your shoulders.',
];

import {
    Archive,
    Code2,
    Contrast,
    Dog,
    Flame,
    Flower,
    Headphones,
    Leaf,
    MoonStar,
    Orbit,
    Paintbrush,
    PawPrint,
    Snowflake,
    Stars,
    TerminalSquare,
    Waves,
} from 'lucide-react';

// ThemeSelectorModal.tsx
export const THEMES = [
    {
        id: 'default',
        name: 'Default',
        icon: <Waves size={16} />,
        color: 'bg-[#2563eb]',
    },
    {
        id: 'sakura',
        name: 'Sakura',
        icon: <Flower size={16} />,
        color: 'bg-pink-300',
    },
    {
        id: 'dragon',
        name: 'Dragon',
        icon: <Flame size={16} />,
        color: 'bg-orange-700',
    },
    {
        id: 'arctic',
        name: 'Arctic',
        icon: <Snowflake size={16} />,
        color: 'bg-sky-400',
    },
    {
        id: 'anime',
        name: 'Anime',
        icon: <Stars size={16} />,
        color: 'bg-purple-400',
    },
    {
        id: 'space',
        name: 'Space',
        icon: <MoonStar size={16} />,
        color: 'bg-indigo-900',
    },
    {
        id: 'mono',
        name: 'Mono',
        icon: <Contrast size={16} />,
        color: 'bg-zinc-800',
    },
    {
        id: 'dev',
        name: 'Dev',
        icon: <Code2 size={16} />,
        color: 'bg-blue-600',
    },
    {
        id: 'cat',
        name: 'Cat',
        icon: <PawPrint size={16} />,
        color: 'bg-pink-400',
    },
    {
        id: 'dog',
        name: 'Dog',
        icon: <Dog size={16} />,
        color: 'bg-lime-500',
    },
    {
        id: 'neonnebula',
        name: 'Neon Nebula',
        icon: <Orbit size={16} />,
        color: 'bg-gradient-to-tr from-[#8f48ff] via-[#ff58a6] to-[#78c8ff]',
    },
    {
        id: 'hacker',
        name: 'Hacker',
        icon: <TerminalSquare size={16} />,
        color: 'bg-green-600',
    },
    {
        id: 'vintage',
        name: 'Vintage',
        icon: <Archive size={16} />,
        color: 'bg-[#d6b88d]',
    },
    {
        id: 'lofi',
        name: 'Lo-fi',
        icon: <Headphones size={16} />,
        color: 'bg-[#d9b8a6]',
    },
    {
        id: 'ghibli',
        name: 'Ghibli',
        icon: <Leaf size={16} />,
        color: 'bg-gradient-to-r from-[#e7dfb0] via-[#d7e8ec] to-[#bcdde6]',
    },
    {
        id: 'custom',
        name: 'Custom',
        icon: <Paintbrush size={16} />,
        color: 'bg-[#d8d5cf]',
    },
];

// LandingIntro.tsx
export const landingBackgroundMap: Record<string, string> = {
    default: `${import.meta.env.BASE_URL}images/system/themes/wave.png`,
    dragon: `${import.meta.env.BASE_URL}images/system/themes/dragon.png`,
    sakura: `${import.meta.env.BASE_URL}images/system/themes/sakura.png`,
    arctic: `${import.meta.env.BASE_URL}images/system/themes/arctic.png`,
    anime: `${import.meta.env.BASE_URL}images/system/themes/anime.png`,
    space: `${import.meta.env.BASE_URL}images/system/themes/space.png`,
    mono: `${import.meta.env.BASE_URL}images/system/themes/mono.png`,
    dev: `${import.meta.env.BASE_URL}images/system/themes/dev.png`,
    cat: `${import.meta.env.BASE_URL}images/system/themes/cat.png`,
    dog: `${import.meta.env.BASE_URL}images/system/themes/dog.png`,
    neonnebula: `${import.meta.env.BASE_URL}images/system/themes/neonnebula.png`,
    hacker: `${import.meta.env.BASE_URL}images/system/themes/hacker.png`,
    vintage: `${import.meta.env.BASE_URL}images/system/themes/vintage.png`,
    lofi: `${import.meta.env.BASE_URL}images/system/themes/lofi.png`,
    ghibli: `${import.meta.env.BASE_URL}images/system/themes/ghibli.png`,
    custom: `${import.meta.env.BASE_URL}images/system/themes/custom.png`, // fill your main Img path in here
};

// BlogHeader.tsx
export const headerBackgroundMap: Record<string, string> = {
    default: `${import.meta.env.BASE_URL}images/system/themes/wave-header.png`,
    dragon: `${import.meta.env.BASE_URL}images/system/themes/dragon-header.png`,
    sakura: `${import.meta.env.BASE_URL}images/system/themes/sakura-header.png`,
    arctic: `${import.meta.env.BASE_URL}images/system/themes/arctic-header.png`,
    anime: `${import.meta.env.BASE_URL}images/system/themes/anime-header.png`,
    space: `${import.meta.env.BASE_URL}images/system/themes/space-header.png`,
    mono: `${import.meta.env.BASE_URL}images/system/themes/mono-header.png`,
    dev: `${import.meta.env.BASE_URL}images/system/themes/dev-header.png`,
    cat: `${import.meta.env.BASE_URL}images/system/themes/cat-header.png`,
    dog: `${import.meta.env.BASE_URL}images/system/themes/dog-header.png`,
    neonnebula: `${import.meta.env.BASE_URL}images/system/themes/neonnebula-header.png`,
    hacker: `${import.meta.env.BASE_URL}images/system/themes/hacker-header.png`,
    vintage: `${import.meta.env.BASE_URL}images/system/themes/vintage-header.png`,
    lofi: `${import.meta.env.BASE_URL}images/system/themes/lofi-header.png`,
    ghibli: `${import.meta.env.BASE_URL}images/system/themes/ghibli-header.png`,
    custom: `${import.meta.env.BASE_URL}images/system/themes/custom-header.png`, // fill your blog header Img path in here
};

// BlogHeader.tsx
export const backgroundPositionMap: Record<string, string> = {
    sakura: 'center 80%',
    anime: 'center 80%',
    cat: 'center 80%',
    mono: 'center 80%',
    dev: 'center 70%',
    vintage: 'center 60%',
    lofi: 'center 80%',
    ghibli: 'center 65%',
};

// Footer.tsx
export const helpGuideMetaDataList = [
    {
        title: { ko: '디렉토리 정보', en: 'Directories Information' },
        images: [
            `${import.meta.env.BASE_URL}images/system/help/helpDirectoryDesc1.png`,
            `${import.meta.env.BASE_URL}images/system/help/helpDirectoryDesc2.png`,
        ],
        descriptions: {
            ko: [
                '1. 블로그 이미지, 동영상, 업로드 파일은 velogit/public/images, velogit/public/videos, velogit/public/uploads 폴더에 업로드하세요. 자동화 스크립트는 scripts 폴더에 있습니다. velogit에 업로드되는 포스트는 posts 폴더에 저장됩니다. system 폴더는 테마 변경 외 수정하지 마세요.',
                '2. 블로그 배경음악은 velogit/src/audio/에 추가하세요. 블로그 헤더 메타데이터는 data/home.ts, About 페이지는 pages/about/AboutPage.tsx에서 수정할 수 있습니다. 나머지 파일은 수정하지 마세요.',
            ],
            en: [
                '1. Upload your blog images, videos, and files to velogit/public/images, velogit/public/videos, and velogit/public/uploads. Automation scripts are in the scripts folder. Posts uploaded to Velogit are stored in the posts folder. Do not modify the system folder except for theme changes.',
                '2. Add blog background music to velogit/src/audio/. You may edit the blog header metadata in data/home.ts and the About page in pages/about/AboutPage.tsx. Do not edit other files.',
            ],
        },
    },
    {
        title: { ko: '블로그 헤더 설정', en: 'Blog Header Setting' },
        images: [
            `${import.meta.env.BASE_URL}images/system/help/helpBlogHeaderDesc1.png`,
            `${import.meta.env.BASE_URL}images/system/help/helpBlogHeaderDesc2.png`,
        ],
        descriptions: {
            ko: [
                '1. 블로그 헤더를 커스터마이징하려면 velogit/src/data/home.ts로 이동하세요.',
                '2. home.ts에서 profileImgPath, blogOwnerDesc, blogDesc 값을 원하는 대로 수정하세요.',
            ],
            en: [
                '1. To customize the blog header, go to velogit/src/data/home.ts.',
                '2. In home.ts, edit the values of profileImgPath, blogOwnerDesc, and blogDesc to your preference.',
            ],
        },
    },
    {
        title: { ko: '테마 커스터마이징', en: 'Theme Customization' },
        images: [
            `${import.meta.env.BASE_URL}images/system/help/helpThemeDesc1.png`,
            `${import.meta.env.BASE_URL}images/system/help/helpThemeDesc2.png`,
        ],
        descriptions: {
            ko: [
                '1. 블로그 커스텀 테마와 색상을 설정하려면 velogit/public/system/themes 폴더의 custom.png, custom-header.png 파일을 교체하세요. 헤더 이미지는 21:9 비율을 추천하며, 중앙에는 복잡한 요소가 없는 것이 좋습니다.',
                '2. 블로그 색상을 변경하려면 src/index.css의 .theme-custom 부분을 수정하세요. 색상 네이밍과 구조는 변경하지 말고 값만 수정하세요. 색상 추천은 ChatGPT 등에게 문의하는 것을 권장합니다.',
            ],
            en: [
                '1. To set a custom theme and colors for your blog, replace the files in velogit/public/system/themes with your own images named custom.png and custom-header.png. For the header, a 21:9 ratio is recommended, and it’s best to avoid complex elements in the center of the image.',
                '2. To customize your blog’s colors, edit the .theme-custom section in src/index.css. Do not change the color naming or structure—only modify the color values. We recommend consulting ChatGPT or similar tools for color suggestions.',
            ],
        },
    },
    {
        title: { ko: '블로그 배경음악 설정', en: 'Blog Background-Music Setting' },
        images: [
            `${import.meta.env.BASE_URL}images/system/help/helpBgMusicDesc1.png`,
            `${import.meta.env.BASE_URL}images/system/help/helpBgMusicDesc2.png`,
        ],
        descriptions: {
            ko: [
                '1. 블로그 배경음악을 설정하려면 velogit/src/audio 폴더에 음원 파일을 넣으세요.',
                '2. velogit은 합법적이고 비상업적 무료 음원 사용을 권장하며, 저작권 위반 시 개발자는 책임지지 않습니다. 상업적 허가가 필요한 음원을 사용하려면 정당하게 구매 후 허가를 받아야 하며, src/components/common/layout/footer.tsx의 저작권 표시(<p> 태그)를 복사해 알맞게 수정하세요.',
            ],
            en: [
                '1. To set background music for your blog, place your audio file(s) in the velogit/src/audio folder.',
                '2. Velogit recommends using legal, licensed, and non-commercial free music. The Velogit developer is not responsible for any copyright violations. If you wish to use music that requires a commercial license, you must first make a legitimate purchase and obtain permission. Then, copy the copyright notice section (<p> tag) from src/components/common/layout/footer.tsx and insert the appropriate attribution text.',
            ],
        },
    },
    {
        title: { ko: 'About 페이지 커스터마이징', en: 'About Page Customization' },
        images: [
            `${import.meta.env.BASE_URL}images/system/help/helpAboutPageDesc1.png`,
            `${import.meta.env.BASE_URL}images/system/help/helpAboutPageDesc2.png`,
        ],
        descriptions: {
            ko: [
                '1. About 페이지는 자기소개를 적는 공간입니다. 수정하려면 velogit/src/pages/AboutPage.tsx로 이동하세요.',
                '2. 현재 디자인은 제작자 스타일이지만, 자유롭게 커스터마이징 가능합니다. 최상위 <main> 태그의 CSS는 수정하지 않는 것을 권장합니다.',
            ],
            en: [
                '1. The About page is where you can share information about yourself. To edit this page, go to velogit/src/pages/AboutPage.tsx.',
                '2. The current design reflects the creator’s style, but you are free to customize it to your liking. It is recommended not to modify the CSS of the top-level parent <main> tag.',
            ],
        },
    },
    {
        title: { ko: '홈 페이지 설명', en: 'Home Page Descriptions' },
        images: [
            `${import.meta.env.BASE_URL}images/system/help/helpHomePageDesc1.png`,
            `${import.meta.env.BASE_URL}images/system/help/helpHomePageDesc2.png`,
        ],
        descriptions: {
            ko: [
                '1. 홈 페이지 기능: 상단 우측 정렬 버튼은 날짜 기준 오름차순/내림차순 전환, 카테고리별 및 태그별 필터링, 블로그 헤더의 그래프 모양 버튼 클릭 시 블로그 성장 및 요약 모달 표시.',
                '2. 블로그 성장 모달에서는 아케이드 스타일 GIF로 성장을 확인할 수 있으며, 블로그 레벨, 상위 3개 카테고리, GitHub 잔디 심기 형태의 포스트 수 요약을 제공합니다. 포스트 5개당 1레벨 업.',
            ],
            en: [
                '1. The Home Page includes the following features: Sort button at the top right toggles between ascending and descending order by date, posts can be filtered by category and tags, and clicking the graph-like button in the blog header opens a modal showing blog growth and a summary.',
                '2. In the Blog Growth modal, you can check your growth in a fun way with arcade-style animated GIFs. The modal displays your blog level, the top 3 categories, and a post count summary UI similar to GitHub’s contribution graph. You level up once for every 5 posts published.',
            ],
        },
    },
    {
        title: { ko: '푸터 기능 설명', en: 'Footer Features Descriptions' },
        images: [
            `${import.meta.env.BASE_URL}images/system/help/helpFooterDesc1.png`,
            `${import.meta.env.BASE_URL}images/system/help/helpFooterDesc2.png`,
        ],
        descriptions: {
            ko: [
                '1. 푸터에는 라이트/다크 모드 토글, 테마 선택, 스트레칭 설정, 배경음악 컨트롤러, velogit GitHub 이동, 제작자 연락처, 도움말 모달 열기 기능이 있습니다.',
                '2. 스트레칭 모달은 개발자의 자세 개선을 돕기 위해 스트레칭을 유도합니다. 스트레칭 시간과 알림 간격을 설정할 수 있으며, On 표시 시 활성, Off 표시 시 비활성입니다.',
            ],
            en: [
                '1. The Footer section contains a light/dark mode toggle button, a theme selection button, a stretching settings button, a blog background music controller, a link to the Velogit GitHub repository, a creator contact function, and a help modal trigger.',
                '2. The Stretching modal helps developers improve posture by encouraging regular stretching. You can set the stretch duration and reminder interval. “On” means active; “Off” means inactive.',
            ],
        },
    },
    {
        title: { ko: '작성·수정 페이지 설명', en: 'Write & Edit Page Descriptions' },
        images: [
            `${import.meta.env.BASE_URL}images/system/help/helpWriteAndEditPageDesc1.png`,
            `${import.meta.env.BASE_URL}images/system/help/helpWriteAndEditPageDesc2.png`,
        ],
        descriptions: {
            ko: [
                '1. 작성/수정 모드 진입 시 FrontMatter 데이터 입력 페이지로 이동합니다. 제목, 날짜, 카테고리는 필수이며, 썸네일 경로는 placeholder를 참고하세요. 우측 상단 버튼으로 임시저장이 가능하며 최대 5개 저장됩니다.',
                '2. 다음은 내용 작성 페이지입니다. 툴바에는 마크다운/HTML 삽입 기능이 있으며, 이미지 버튼 2개(마크다운, HTML), <details><summary> 태그, 파일 다운로드 링크 삽입, 표 삽입 기능이 있습니다. 외부 이미지 링크 붙여넣기 지원, 플로팅 툴바, 간단한 맞춤법 교정(베타), User Preview(실제 유저에게 보이는 포맷팅), Publish 버튼을 통한 자동 배포 지원.',
            ],
            en: [
                '1. When entering Write/Edit mode, you will first be taken to the FrontMatter Data entry page. The post’s title, publish date, and category are required fields. For the thumbnail path, use the placeholder format. The two buttons at the top right allow you to temporarily save the post’s information, with up to five entries stored in order of most recent.',
                '2. The next step is the Content Writing page. The toolbar contains Markdown/HTML insertion tools, two image buttons (Markdown, HTML), <details><summary> tags, downloadable file links, and table insertion. Supports pasting external image links, floating toolbar, basic spell-checking (beta), User Preview, and automatic deployment via the Publish button.',
            ],
        },
    },
    {
        title: { ko: '한국어 교정 Docker 세팅', en: 'Docker Setup for Korean Grammar Correction' },
        images: [
            `${import.meta.env.BASE_URL}images/system/help/helpDockerSettingDesc1.png`,
            `${import.meta.env.BASE_URL}images/system/help/helpDockerSettingDesc2.png`,
        ],
        descriptions: {
            ko: [
                '1. 한국어 교정 서비스를 이용하기 위해서는 우선 도커를 설치해주세요. 도커 설치를 위해서 mac 유저는 `brew install --cask docker` 명령어를 터미널에서 실행하는 걸 권장합니다. 윈도우 유저는 공식사이트(https://www.docker.com/get-started/)에서 다운로드받아주세요. 설치가 완료되면 다음 명령어로 Docker가 정상 설치되었는지 확인하세요: `docker -v`, `docker run hello-world`.',
                '2. 포크 후 최초 이용시에는 `docker compose up --build -d server` 해당 명령어를 먼저 실행 후 이미지 빌드가 완료되면, `pnpm run dev` 명령어를 실행하여 velogit을 이용하시면 됩니다. 이미지 빌드시 다소 시간이 소요될 수 있습니다.',
            ],
            en: [
                '1. To use the Korean grammar correction service, please install Docker first. For Mac users, it is recommended to run `brew install --cask docker` in the terminal. For Windows users, please download and install Docker Desktop from the official website (https://www.docker.com/get-started/). After the installation is complete, verify that Docker is installed correctly by running the following commands: `docker -v`, `docker run hello-world`.',
                '2. After forking the project, when running it for the first time, execute `docker compose up --build -d server` to build the image. Once the build is complete, you can run `pnpm run dev` to start Velogit. Note: The image build process may take some time.',
            ],
        },
    },
    {
        title: {
            ko: '메타데이터 오픈그래프 설정',
            en: 'Open Graph Metadata Setup',
        },
        images: [
            `${import.meta.env.BASE_URL}images/system/help/helpMetaDataDesc1.png`,
            `${import.meta.env.BASE_URL}images/system/help/helpMetaDataDesc2.png`,
        ],
        descriptions: {
            ko: [
                '1. Open Graph 설정을 위해 velogit/index.html 파일로 들어가 주세요.',
                '2. https://letyuchan.github.io 가 들어간 부분에서 letyuchan을 여러분의 깃허브 사용자 이름으로 교체해주세요. 나머지 코드는 절대 수정하지 마세요.',
            ],
            en: [
                '1. To configure Open Graph metadata, open the velogit/index.html file.',
                '2. In any URL containing https://letyuchan.github.io, replace "letyuchan" with your own GitHub username. Do not modify any other parts of the code.',
            ],
        },
    },
];
