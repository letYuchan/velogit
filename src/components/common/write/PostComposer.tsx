import PostContentEditor from '@/components/common/write/PostContentEditor';
import PostMetaBuilder from '@/components/common/write/PostMetaBuilder';
import { posts } from '@/utils';
import { useEffect, useState } from 'react';

interface PostComposerProps {
    mode: 'write' | 'edit';
    slug?: string;
}

const PostComposer = ({ mode, slug }: PostComposerProps) => {
    const [matchedPost, setMatchedPost] = useState<PostData | undefined>(undefined);
    useEffect(() => {
        if (slug && mode === 'edit') {
            const correctPost = posts.find(post => {
                if (post.slug === slug) return post;
            });

            if (correctPost) {
                setMatchedPost(correctPost);
            } else {
                setMatchedPost(undefined);
            }
        }
    }, [slug, mode]);

    const [step, setStep] = useState<'meta' | 'content'>('meta');
    return (
        <main className='flex w-full flex-row overflow-hidden'>
            {step === 'meta' ? (
                <PostMetaBuilder setStep={setStep} mode={mode} editablePost={matchedPost} />
            ) : (
                <PostContentEditor setStep={setStep} mode={mode} editablePost={matchedPost} />
            )}
        </main>
    );
};

export default PostComposer;
