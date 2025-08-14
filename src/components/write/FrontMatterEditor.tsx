import { usePostWriteStore } from '@/store/usePostWriteStore';
import clsx from 'clsx';
import { useEffect, useState, type ChangeEvent, type KeyboardEvent } from 'react';
import { toast } from 'react-toastify';

interface FrontMatterEditorProps {
    setStep: React.Dispatch<React.SetStateAction<'meta' | 'content'>>;
    mode: 'write' | 'edit';
    editablePost: PostData | undefined;
}

const FrontMatterEditor = ({ setStep, mode, editablePost }: FrontMatterEditorProps) => {
    const { title, date, tags, summary, thumbnail, category, setField } = usePostWriteStore();

    const [tagsInput, setTagsInput] = useState(tags.join(', '));
    const [isTitleInvalid, setIsTitleInvalid] = useState(false);
    const [isDateInvalid, setIsDateInvalid] = useState(false);
    const [isCategoryInvalid, setIsCategoryInvalid] = useState(false);

    const handleFrontMatterUpdate = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const validKeys = ['title', 'date', 'tags', 'summary', 'thumbnail', 'category'] as const;

        type MetaKeysExceptOfTags = (typeof validKeys)[number];

        if (validKeys.includes(name as MetaKeysExceptOfTags)) {
            setField(name as MetaKeysExceptOfTags, value);
        }
    };

    const handleOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const tagArray = tagsInput
                .split(',')
                .map(tag => tag.trim())
                .filter(Boolean);

            setField('tags', [...tags, ...tagArray]);
            setTagsInput('');
        }
    };

    const initTags = () => {
        if (confirm('Do you want to initialize tags?')) setField('tags', []);
    };

    const goToContentEditStep = () => {
        const titleInvalid = title.trim() === '';
        const dateInvalid = date.trim() === '';
        const categoryInvalid = category.trim() === '';

        setIsTitleInvalid(titleInvalid);
        setIsDateInvalid(dateInvalid);
        setIsCategoryInvalid(categoryInvalid);

        if (titleInvalid || dateInvalid || categoryInvalid) {
            toast.info(
                'Title, date, and category are required fields, so please fill them all out.',
            );
            return;
        }

        if (confirm('Did you enter the metadata correctly?')) {
            setStep('content');
        }
    };

    useEffect(() => {
        if (mode === 'edit' && editablePost) {
            setField('title', editablePost.title);
            setField('date', editablePost.date);
            setField('tags', editablePost.tags);
            setField('summary', editablePost.summary);
            setField('thumbnail', editablePost.thumbnail);
            setField('category', editablePost.category);
            setTagsInput(editablePost.tags.join(', '));
        }
    }, [mode, editablePost]);

    return (
        <section className='flex w-full flex-1 flex-col justify-start gap-4 border-r border-border bg-background p-4 sm:w-1/2'>
            <div className='flex w-full flex-col justify-start gap-4'>
                {/* Title: required */}
                <input
                    type='text'
                    name='title'
                    value={title}
                    onChange={handleFrontMatterUpdate}
                    placeholder='Enter title'
                    className={clsx(
                        'w-full border-l-8 bg-background-second px-3 py-2 text-3xl text-foreground focus:outline-none',
                        isTitleInvalid
                            ? 'border-error transition-colors duration-200 ease-in-out placeholder:text-error'
                            : 'border-primary',
                    )}
                />
                {/* Date: required */}
                <input
                    type='date'
                    name='date'
                    value={date}
                    onChange={handleFrontMatterUpdate}
                    className={clsx(
                        'w-full rounded-md border bg-background-second px-3 py-2 text-base text-foreground shadow-sm transition duration-200 focus:outline-none focus:ring-2',
                        isDateInvalid
                            ? 'border-error transition-colors duration-200 ease-in-out focus:ring-error'
                            : 'border-border focus:border-primary focus:ring-primary',
                    )}
                />
                {/* Tag */}
                <div className='flex flex-wrap justify-start gap-2'>
                    <input
                        type='text'
                        name='tags'
                        value={tagsInput}
                        onChange={e => setTagsInput(e.target.value)}
                        onKeyDown={handleOnKeyDown}
                        placeholder='Enter tags, separated by commas or Enter'
                        className='w-[70%] rounded-md border border-border bg-background-second px-3 py-2 text-base text-foreground shadow-sm transition duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary'
                    />
                    <button
                        onClick={initTags}
                        className='grow rounded-md border border-error bg-error text-xl font-semibold text-main hover:bg-error/70 active:bg-error/70'
                    >
                        Init
                    </button>
                </div>
                {tags ? (
                    <div className='flex flex-wrap justify-start gap-2'>
                        {tags.map(tag => (
                            <span
                                key={tag}
                                className='flex h-6 items-center justify-center rounded-md bg-primary px-2 py-1 text-sm font-semibold text-main'
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                ) : null}
                {/* Summary */}
                <textarea
                    name='summary'
                    value={summary}
                    onChange={handleFrontMatterUpdate}
                    placeholder='Enter a brief summary'
                    rows={3}
                    className='w-full rounded-md border border-border bg-background-second px-3 py-2 text-base text-foreground transition duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary'
                />
                {/* Thumbnail */}
                <input
                    type='text'
                    name='thumbnail'
                    value={thumbnail}
                    onChange={handleFrontMatterUpdate}
                    placeholder='Thumbnail image path (e.g., images/thumbnail.jpg)'
                    className='w-full rounded-md border border-border bg-background-second px-3 py-2 text-base text-foreground transition duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary'
                />
                {/* Category: required */}
                <input
                    type='text'
                    name='category'
                    value={category}
                    onChange={handleFrontMatterUpdate}
                    placeholder='Enter category'
                    className={clsx(
                        'w-full rounded-md border bg-background-second px-3 py-2 text-base text-foreground transition duration-200 focus:outline-none focus:ring-2',
                        isCategoryInvalid
                            ? 'border-error transition-colors duration-200 ease-in-out placeholder:text-error focus:ring-error'
                            : 'border-border focus:border-primary focus:ring-primary',
                    )}
                />
            </div>
            <button
                onClick={goToContentEditStep}
                className='flex justify-center rounded-md border border-primary bg-primary px-3 py-1 text-xl font-semibold text-main hover:bg-primary-deep active:bg-primary-deep'
            >
                Next
            </button>
        </section>
    );
};

export default FrontMatterEditor;

/**
 * FrontMatterEditor
 * -----------------
 * 기능:
 * - 블로그 포스트의 frontmatter(메타데이터) 작성/수정 UI 제공
 * - 필수 필드(title, date, category) 입력 검증
 * - 태그 추가/삭제, 요약, 썸네일 경로 입력 기능 지원
 * - 작성 단계(meta → content) 전환 가능
 *
 * props (FrontMatterEditorProps):
 * - setStep: React.Dispatch<React.SetStateAction<'meta' | 'content'>> → 작성 단계 전환 함수
 * - mode: 'write' | 'edit' → 작성 모드 또는 수정 모드
 * - editablePost: PostData | undefined → 수정 모드 시 편집할 포스트 데이터
 *
 * 전역 상태 (usePostWriteStore):
 * - title: string → 포스트 제목
 * - date: string → 작성일
 * - tags: string[] → 태그 목록
 * - summary: string → 포스트 요약
 * - thumbnail: string → 썸네일 경로
 * - category: string → 카테고리명
 * - setField(key, value): 전역 상태 필드 값 업데이트
 *
 * 로컬 상태:
 * - tagsInput: string → 입력 중인 태그 문자열(쉼표 구분)
 * - isTitleInvalid: boolean → 제목 유효성 여부
 * - isDateInvalid: boolean → 작성일 유효성 여부
 * - isCategoryInvalid: boolean → 카테고리 유효성 여부
 *
 * 주요 함수:
 * - handleFrontMatterUpdate(e):
 *   → name 속성에 따라 해당 필드 전역 상태 업데이트
 * - handleOnKeyDown(e):
 *   → Enter 또는 ',' 입력 시 현재 tagsInput을 태그 배열로 변환해 tags에 추가
 * - initTags():
 *   → confirm 후 태그 배열 초기화
 * - goToContentEditStep():
 *   1) 필수 필드(title/date/category) 유효성 검사
 *   2) 하나라도 비어 있으면 toast.info로 안내
 *   3) confirm 후 'content' 단계로 전환
 *
 * useEffect:
 * - mode === 'edit' && editablePost 존재 시:
 *   - editablePost의 모든 frontmatter 필드 전역 상태에 설정
 *   - tagsInput을 editablePost.tags 문자열로 초기화
 *
 * UI 구성:
 * 1) 제목(title) 입력 필드:
 *    - border-l-8, 배경색 background-second
 *    - 유효성 실패 시 border-error + placeholder:text-error
 * 2) 작성일(date) 입력 필드:
 *    - type='date', 유효성 실패 시 border-error + focus:ring-error
 * 3) 태그(tags) 입력/초기화:
 *    - 쉼표 또는 Enter로 구분 입력
 *    - 현재 태그 목록은 #태그 형태로 표시
 *    - Init 버튼 클릭 시 모든 태그 삭제
 * 4) 요약(summary) textarea
 * 5) 썸네일(thumbnail) 경로 입력 필드
 * 6) 카테고리(category) 입력 필드:
 *    - 유효성 실패 시 border-error + placeholder:text-error
 * 7) "Next" 버튼:
 *    - goToContentEditStep 실행
 *
 * 동작 흐름:
 * 1) 사용자 입력 → 전역 상태 업데이트
 * 2) Next 버튼 클릭 시 필수 메타데이터 유효성 검사
 * 3) 모두 유효하면 작성 단계 'content'로 전환
 */
