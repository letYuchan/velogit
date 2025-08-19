/* eslint-disable @typescript-eslint/no-unused-vars */
import { FaGithub, FaEnvelope, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import HaloGlow from '@/components/about/HaloGlow';
import { useIsDesktop } from '@/hooks/useIsDesktop';

const AboutPage = () => {
    const isDesktop = useIsDesktop();

    return (
        <main
            aria-label='An animated and expressive about page introducing the developer.'
            className='bg-second relative flex w-full flex-col items-center justify-start px-4 py-12 md:px-20 lg:px-40'
        >
            {/* Hero */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className='relative mb-20 flex w-full max-w-5xl flex-col items-center text-center'
            >
                <h1 className='font-title text-5xl font-bold text-foreground sm:text-6xl'>
                    Write your name or a friendly greeting here
                </h1>
                <p className='mt-4 max-w-xl text-lg text-muted'>
                    Briefly summarize your role, strengths, and focus areas in 1–2 sentences.
                </p>

                <div className='mt-6 flex gap-4'>
                    <a
                        href='#'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='flex items-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-sm text-foreground transition hover:border-primary hover:text-primary'
                    >
                        <FaGithub />
                        Put your GitHub link text here
                    </a>
                    <a
                        href='#'
                        className='flex items-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-sm text-foreground transition hover:border-primary hover:text-primary'
                    >
                        <FaEnvelope />
                        Put your contact button text here
                    </a>
                </div>
                {isDesktop && <HaloGlow />}
            </motion.section>

            {/* Strength Keywords */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.6 }}
                className='mb-16 w-full max-w-5xl'
            >
                <h2 className='mb-4 text-center font-title text-xl font-bold text-foreground'>
                    Summarize Your Strengths (Keywords)
                </h2>
                <div className='flex flex-wrap justify-center gap-4'>
                    {[
                        'Add your values/keywords',
                        'e.g. teamwork / user-first',
                        'e.g. craft / learning',
                        'e.g. reliability / ownership',
                    ].map((text, idx) => (
                        <span
                            key={`${idx}-${text}`}
                            className='rounded-full border border-primary bg-background px-4 py-2 text-sm font-semibold text-primary shadow-sm transition hover:shadow'
                            title='Edit this keyword to describe yourself'
                        >
                            #{text}
                        </span>
                    ))}
                </div>
            </motion.section>

            {/* My Journey */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='mb-24 w-full max-w-3xl'
            >
                <h2 className='mb-8 font-title text-2xl font-bold text-foreground'>My Journey</h2>
                <ul className='space-y-10 border-l-2 border-border pl-6'>
                    <li>
                        <span className='block font-bold text-primary'>2025</span>
                        <p className='text-muted'>
                            Add a fresh highlight for 2025: shipped feature/product, talk,
                            certification, or a measurable impact.
                        </p>
                    </li>
                    <li>
                        <span className='block font-bold text-primary'>2024</span>
                        <p className='text-muted'>
                            Add a concise milestone from this year (launch, talk, award, or team
                            outcome).
                        </p>
                    </li>
                    <li>
                        <span className='block font-bold text-primary'>2023</span>
                        <p className='text-muted'>
                            Summarize a role/project and the outcome (user or business impact).
                        </p>
                    </li>
                    <li>
                        <span className='block font-bold text-primary'>2022</span>
                        <p className='text-muted'>
                            Describe how you got started and what hooked your interest.
                        </p>
                    </li>
                </ul>
            </motion.section>

            {/* Testimonials */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className='mb-24 w-full max-w-5xl'
            >
                <h2 className='mb-8 text-center font-title text-2xl font-bold text-foreground'>
                    What Teammates Say
                </h2>
                <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                    {[
                        {
                            name: 'Name (Role)',
                            feedback:
                                'Insert a short quote about your collaboration, code quality, or reliability.',
                        },
                        {
                            name: 'Name (Role)',
                            feedback:
                                'Add a note about your communication, design handoff, or problem‑solving.',
                        },
                        {
                            name: 'Name (Role)',
                            feedback:
                                'Include praise for delivery, ownership, or how you improved team workflow.',
                        },
                    ].map(({ name, feedback }, idx) => (
                        <div
                            key={`${idx}-${name}`}
                            className='rounded-md border border-border bg-background p-5 shadow-sm transition hover:shadow-md'
                        >
                            <p className='mb-3 text-muted'>"{feedback}"</p>
                            <span className='block text-sm font-semibold text-foreground'>
                                – {name}
                            </span>
                        </div>
                    ))}
                </div>
            </motion.section>

            {/* Tech Stack */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className='mb-24 w-full max-w-5xl'
            >
                <h2 className='mb-8 text-center font-title text-2xl font-bold text-foreground'>
                    Tech I Use
                </h2>
                <div className='grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4'>
                    {[
                        'Add core frameworks',
                        'List languages',
                        'UI / styling tools',
                        'State / data libs',
                        'Build tools',
                        'Design tools',
                        'Testing / QA',
                        'DevOps / CI',
                    ].map(tech => (
                        <div
                            key={tech}
                            className='flex transform items-center justify-center rounded-md border border-border bg-background px-6 py-4 text-sm font-bold text-foreground shadow-sm transition hover:scale-110'
                        >
                            {tech}
                        </div>
                    ))}
                </div>
            </motion.section>

            {/* CTA */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className='w-full max-w-xl text-center'
            >
                <p className='mb-4 text-muted'>
                    Write a clear call‑to‑action (collaboration, hiring, freelance, inquiries).
                </p>
                <a
                    href='#'
                    className='inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-main transition hover:bg-primary-deep active:bg-primary-deep'
                >
                    Put your CTA button text here <FaArrowRight className='text-main' />
                </a>
            </motion.section>
        </main>
    );
};

export default AboutPage;
