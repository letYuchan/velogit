import PostContentEditor from '@/components/write/PostContentEditor';
import PostMetaBuilder from '@/components/write/PostMetaBuilder';
import { posts } from '@/utils';
import { useEffect, useState } from 'react';

interface PostComposerProps {
    mode: 'write' | 'edit';
    slug?: string;
}

const PostComposer = ({ mode, slug }: PostComposerProps) => {
    const [matchedPost, setMatchedPost] = useState<PostData | undefined>(undefined);
    const [step, setStep] = useState<'meta' | 'content'>('meta');

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

/**
 * PostComposer
 * ------------
 * 기능:
 * - 포스트 작성/수정 전체 흐름을 제어하는 컨테이너 컴포넌트
 * - 메타데이터 입력 단계와 본문 작성 단계 간 전환 관리
 * - 수정 모드(edit)일 경우 slug로 기존 포스트 데이터를 찾아 초기화
 *
 * props (PostComposerProps):
 * - mode: 'write' | 'edit' → 작성 모드 또는 수정 모드
 * - slug?: string → 수정할 포스트의 식별자 (edit 모드에서만 사용)
 *
 * 로컬 상태:
 * - matchedPost: PostData | undefined → slug와 일치하는 기존 포스트 데이터
 * - step: 'meta' | 'content' → 현재 단계 (기본값 'meta')
 *
 * useEffect 동작:
 * - 조건:
 *   1) slug 존재
 *   2) mode === 'edit'
 * - posts 배열에서 slug가 일치하는 포스트 검색
 * - 검색 성공 시 matchedPost에 해당 포스트 저장, 실패 시 undefined 설정
 *
 * UI 구성:
 * - main 컨테이너:
 *   - flex-row, 전체 너비, overflow-hidden
 * - step === 'meta':
 *   - <PostMetaBuilder /> 렌더링
 *   - props:
 *     - setStep: 단계 전환 함수
 *     - mode: 현재 모드
 *     - editablePost: matchedPost
 * - step === 'content':
 *   - <PostContentEditor /> 렌더링
 *   - props 동일하게 전달
 *
 * 동작 흐름:
 * 1) edit 모드에서 slug 제공 시 posts 배열에서 해당 포스트 찾기
 * 2) matchedPost에 포스트 데이터 저장
 * 3) step 상태에 따라 메타데이터 입력(PostMetaBuilder) 또는 본문 작성(PostContentEditor) 화면 전환
 */
