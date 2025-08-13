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
        title: 'Directories Information',
        images: [
            `${import.meta.env.BASE_URL}images/system/help/helpDirectoryDesc1.png`,
            `${import.meta.env.BASE_URL}images/system/help/helpDirectoryDesc2.png`,
        ],
        descriptions: [
            '1.	Upload your blog images, videos, and files to the velogit/public/images, velogit/public/videos, and velogit/public/uploads folders. Automation scripts are in the scripts folder. Posts uploaded to Velogit are stored in the posts folder. Do not modify the system folder except for theme changes.',
            '2. Add blog background music to velogit/src/audio/. You may edit the blog header metadata in data/home.ts and the About page in pages/about/AboutPage.tsx. Do not edit other files.',
        ],
    },
    {
        title: 'Blog Header Setting',
        images: [
            `${import.meta.env.BASE_URL}images/system/help/helpBlogHeaderDesc1.png`,
            `${import.meta.env.BASE_URL}images/system/help/helpBlogHeaderDesc2.png`,
        ],
        descriptions: [
            '1. To customize the blog header, go to velogit/src/data/home.ts.',
            '2. In home.ts, edit the values of profileImgPath, blogOwnerDesc, and blogDesc to your preference.',
        ],
    },
    {
        title: 'Theme Customization',
        images: [
            `${import.meta.env.BASE_URL}images/system/help/helpThemeDesc1.png`,
            `${import.meta.env.BASE_URL}images/system/help/helpThemeDesc2.png`,
        ],
        descriptions: [
            '1. To set a custom theme and colors for your blog, replace the files in velogit/public/system/themes with your own images named custom.png and custom-header.png. For the header, a 21:9 ratio is recommended, and it’s best to avoid complex elements in the center of the image.',
            '2. To customize your blog’s colors, edit the .theme-custom section in src/index.css. Do not change the color naming or structure—only modify the color values. We recommend consulting ChatGPT or similar tools for color suggestions.',
        ],
    },
    {
        title: 'Blog Background-Music Setting',
        images: [
            `${import.meta.env.BASE_URL}images/system/help/helpBgMusicDesc1.png`,
            `${import.meta.env.BASE_URL}images/system/help/helpBgMusicDesc2.png`,
        ],
        descriptions: [
            '1. To set background music for your blog, place your audio file(s) in the velogit/src/audio folder.',
            '2. Velogit recommends using legal, licensed, and non-commercial free music. The Velogit developer is not responsible for any copyright violations. If you wish to use music that requires a commercial license, you must first make a legitimate purchase and obtain permission. Then, copy the copyright notice section (<p> tag) from src/components/common/layout/footer.tsx and insert the appropriate attribution text.',
        ],
    },
    {
        title: 'About Page Customization',
        images: [
            `${import.meta.env.BASE_URL}images/system/help/helpAboutPageDesc1.png`,
            `${import.meta.env.BASE_URL}images/system/help/helpAboutPageDesc2.png`,
        ],
        descriptions: [
            '1. The About page is where you can share information about yourself. To edit this page, go to velogit/src/pages/AboutPage.tsx.',
            '2. The current design reflects the creator’s style, but you are free to customize it to your liking. It is recommended not to modify the CSS of the top-level parent <main> tag.',
        ],
    },
    {
        title: 'Footer Features Descriptions',
        images: [
            `${import.meta.env.BASE_URL}images/system/help/helpFooterDesc1.png`,
            `${import.meta.env.BASE_URL}images/system/help/helpFooterDesc2.png`,
        ],
        descriptions: [
            '1. The Footer section contains a light/dark mode toggle button, a theme selection button, a stretching settings button, a blog background music controller, a link to the Velogit GitHub repository, a creator contact function, and a help modal trigger.',
            '2. The Stretching button is designed to help developers—who are prone to poor posture and related issues such as forward head posture, joint pain, and spinal problems—take conscious breaks to stretch. You can set how long to stretch and the time interval for the stretching reminder modal. If “On” is displayed, the feature is active; if “Off” is displayed, the feature is inactive.',
        ],
    },
    {
        title: 'Write&Edit Page Desciptions',
        images: [
            `${import.meta.env.BASE_URL}images/system/help/helpWriteAndEditPageDesc1.png`,
            `${import.meta.env.BASE_URL}images/system/help/helpWriteAndEditPageDesc2.png`,
        ],
        descriptions: [
            '1. When entering Write/Edit mode, you will first be taken to the FrontMatter Data entry page. The post’s title, publish date, and category are required fields. For the thumbnail path, use the placeholder format as a reference. The two buttons at the top right allow you to temporarily save the post’s information, with up to five entries stored in order of most recent.',
            '섹션 7 설명 B',
        ],
    },
];
