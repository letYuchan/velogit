/* eslint-disable @typescript-eslint/no-unused-vars */
import { FaGithub, FaEnvelope, FaArrowRight } from 'react-icons/fa';

const AboutPage = () => {
  return (
    <main
      aria-label='A visually dynamic and interactive about page introducing the developer.'
      className='flex w-full flex-col items-center justify-start bg-background px-4 py-12 md:px-20 lg:px-40'
    >
      {/* Hero Section */}
      <section className='relative mb-16 flex w-full max-w-5xl flex-col items-center text-center'>
        <h1 className='font-title text-5xl font-bold text-foreground sm:text-6xl'>
          Hello, I'm <span className='text-primary'>letYuchan</span>
        </h1>
        <p className='mt-4 max-w-xl text-muted'>
          A passionate frontend developer crafting delightful user experiences with React,
          TypeScript, and design systems.
        </p>
        <div className='mt-8 flex gap-4'>
          <a
            href='https://github.com/letYuchan'
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm text-foreground transition hover:border-primary hover:text-primary'
          >
            <FaGithub /> GitHub
          </a>
          <a
            href='mailto:yuchancho174@gmail.com'
            className='flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm text-foreground transition hover:border-primary hover:text-primary'
          >
            <FaEnvelope /> Contact
          </a>
        </div>
        {/* Floating Blob */}
        <div
          className='absolute -right-16 -top-12 hidden size-64 animate-pulse rounded-full bg-primary opacity-10 blur-3xl md:block'
          aria-hidden
        ></div>
      </section>

      {/* Timeline Section */}
      <section className='mb-20 w-full max-w-3xl'>
        <h2 className='mb-8 font-title text-2xl font-bold text-foreground'>My Journey</h2>
        <ul className='space-y-8 border-l-2 border-border pl-6'>
          <li>
            <span className='block font-bold text-primary'>2024</span>
            <p className='text-muted'>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore, voluptate! Aliquam
              sapiente perferendis quos numquam, ad ut hic. Fuga nesciunt inventore exercitationem
              perspiciatis doloribus ea laborum recusandae magnam impedit dignissimos.
            </p>
          </li>
          <li>
            <span className='block font-bold text-primary'>2023</span>
            <p className='text-muted'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel quisquam minus amet quod
              atque quidem, minima consequuntur reprehenderit enim delectus aspernatur, saepe
              deserunt beatae ex nihil odit magnam optio alias!
            </p>
          </li>
          <li>
            <span className='block font-bold text-primary'>2022</span>
            <p className='text-muted'>Fell in love with React and built my first portfolio site.</p>
          </li>
        </ul>
      </section>

      {/* Tech Stack Cards */}
      <section className='mb-24 w-full max-w-5xl'>
        <h2 className='mb-8 text-center font-title text-2xl font-bold text-foreground'>
          Tech I Use
        </h2>
        <div className='grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4'>
          {['React', 'TypeScript', 'TailwindCSS', 'Zustand', 'Vite', 'Node.js', 'Figma', 'Git'].map(
            (tech, i) => (
              <div
                key={tech}
                className='flex transform items-center justify-center rounded-xl border border-border bg-background px-6 py-4 text-sm font-bold text-foreground shadow-sm transition hover:scale-110'
              >
                {tech}
              </div>
            ),
          )}
        </div>
      </section>
      {/* Call to Action */}
      <section className='w-full max-w-xl text-center'>
        <p className='mb-4 text-muted'>Interested in working with me?</p>
        <a
          href='mailto:yuchancho174@gmail.com'
          className='inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-white transition hover:bg-blue-700'
        >
          Let's connect <FaArrowRight className='text-white' />
        </a>
      </section>
    </main>
  );
};

export default AboutPage;
