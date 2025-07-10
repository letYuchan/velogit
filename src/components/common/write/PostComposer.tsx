import PostContentEditor from '@/components/common/write/PostContentEditor';
import PostMetaBuilder from '@/components/common/write/PostMetaBuilder';
import { useState } from 'react';

const PostComposer = () => {
  const [step, setStep] = useState<'meta' | 'content'>('meta');
  console.log('step');
  return (
    <main className='flex w-full flex-row overflow-hidden'>
      {step === 'meta' ? <PostMetaBuilder setStep={setStep} /> : <PostContentEditor />}
    </main>
  );
};

export default PostComposer;
