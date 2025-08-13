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
    default: `${import.meta.env.BASE_URL}images/wave.png`,
    dragon: `${import.meta.env.BASE_URL}images/dragon.png`,
    sakura: `${import.meta.env.BASE_URL}images/sakura.png`,
    arctic: `${import.meta.env.BASE_URL}images/arctic.png`,
    anime: `${import.meta.env.BASE_URL}images/anime.png`,
    space: `${import.meta.env.BASE_URL}images/space.png`,
    mono: `${import.meta.env.BASE_URL}images/mono.png`,
    dev: `${import.meta.env.BASE_URL}images/dev.png`,
    cat: `${import.meta.env.BASE_URL}images/cat.png`,
    dog: `${import.meta.env.BASE_URL}images/dog.png`,
    neonnebula: `${import.meta.env.BASE_URL}images/neonnebula.png`,
    hacker: `${import.meta.env.BASE_URL}images/hacker.png`,
    vintage: `${import.meta.env.BASE_URL}images/vintage.png`,
    lofi: `${import.meta.env.BASE_URL}images/lofi.png`,
    ghibli: `${import.meta.env.BASE_URL}images/ghibli.png`,
    custom: `${import.meta.env.BASE_URL}images/custom.png`, // fill your main Img path in here
};

// BlogHeader.tsx
export const headerBackgroundMap: Record<string, string> = {
    default: `${import.meta.env.BASE_URL}images/wave-header.png`,
    dragon: `${import.meta.env.BASE_URL}images/dragon-header.png`,
    sakura: `${import.meta.env.BASE_URL}images/sakura-header.png`,
    arctic: `${import.meta.env.BASE_URL}images/arctic-header.png`,
    anime: `${import.meta.env.BASE_URL}images/anime-header.png`,
    space: `${import.meta.env.BASE_URL}images/space-header.png`,
    mono: `${import.meta.env.BASE_URL}images/mono-header.png`,
    dev: `${import.meta.env.BASE_URL}images/dev-header.png`,
    cat: `${import.meta.env.BASE_URL}images/cat-header.png`,
    dog: `${import.meta.env.BASE_URL}images/dog-header.png`,
    neonnebula: `${import.meta.env.BASE_URL}images/neonnebula-header.png`,
    hacker: `${import.meta.env.BASE_URL}images/hacker-header.png`,
    vintage: `${import.meta.env.BASE_URL}images/vintage-header.png`,
    lofi: `${import.meta.env.BASE_URL}images/lofi-header.png`,
    ghibli: `${import.meta.env.BASE_URL}images/ghibli-header.png`,
    custom: `${import.meta.env.BASE_URL}images/custom-header.png`, // fill your blog header Img path in here
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
