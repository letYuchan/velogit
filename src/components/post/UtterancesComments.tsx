import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

const UtterancesComments = () => {
    const commentRef = useRef<HTMLDivElement>(null);
    const { slug } = useParams();

    useEffect(() => {
        if (!commentRef.current) return;

        commentRef.current.innerHTML = '';

        const scriptEl = document.createElement('script');
        // 💬 Utterances comment widget configuration / 💬 Utterances 댓글 위젯 설정 부분
        scriptEl.src = 'https://utteranc.es/client.js';
        // EN: URL for the Utterances client script
        // KO: Utterances 클라이언트 스크립트 URL
        scriptEl.async = true;
        // EN: Load script asynchronously for better page performance
        // KO: 비동기 로딩 (페이지 로딩 속도 향상)
        scriptEl.crossOrigin = 'anonymous';
        // EN: Allow CORS requests anonymously
        // KO: CORS 허용 (익명 요청)

        // ⬇️ User-customizable settings / ⬇️ 사용자 맞춤 설정 부분
        scriptEl.setAttribute('repo', 'letYuchan/velogit');
        // EN: GitHub repository name where comments will be stored (format: 'username/repository')
        // KO: 댓글이 저장될 GitHub 저장소 이름 (형식: '사용자명/저장소명')

        scriptEl.setAttribute('issue-term', slug || 'default');
        // EN: The mapping between the page and its GitHub issue (e.g., 'pathname', 'url', 'title', or custom slug)
        // KO: 페이지와 GitHub 이슈를 연결하는 기준 (예: 'pathname', 'url', 'title', 또는 사용자 정의 slug)

        scriptEl.setAttribute('label', 'comment');
        // EN: GitHub issue label to categorize comment issues
        // KO: 댓글 이슈를 분류하기 위한 GitHub 라벨명

        scriptEl.setAttribute('theme', 'github-light');
        // EN: Theme for the Utterances widget (e.g., 'github-dark', 'preferred-color-scheme', 'icy-dark', 'dark-blue')
        // KO: Utterances 위젯 테마 (예: 'github-dark', 'preferred-color-scheme', 'icy-dark', 'dark-blue')

        commentRef.current.appendChild(scriptEl);
    }, [slug]);

    return <div ref={commentRef} className='mx-auto w-full max-w-3xl px-4' />;
};

export default UtterancesComments;

/**
 * UtterancesComments
 * ------------------
 * 기능:
 * - Utterances(GitHub 기반 댓글 시스템)를 현재 페이지에 임베드
 * - 현재 포스트 slug를 기반으로 GitHub issue 연결
 *
 * 훅:
 * - useParams():
 *   → URL 파라미터에서 slug 추출
 * - useRef<HTMLDivElement>(null):
 *   → Utterances 스크립트를 삽입할 DOM 컨테이너 참조
 * - useEffect():
 *   1) commentRef.current가 없으면 중단
 *   2) 이전 내용 초기화(commentRef.current.innerHTML = '')
 *   3) <script> 요소 생성
 *      - src: 'https://utteranc.es/client.js'
 *      - async: true
 *      - crossOrigin: 'anonymous'
 *      - setAttribute:
 *         - repo: 'letYuchan/velogit' → 댓글 저장할 GitHub repo
 *         - issue-term: slug || 'default' → slug 기준으로 issue 매칭
 *         - label: 'comment' → GitHub issue 라벨
 *         - theme: 'github-light' → 댓글 UI 테마
 *   4) script 요소를 commentRef.current에 append
 *   5) slug 변경 시 다시 실행
 *
 * UI 구성:
 * - <div> (댓글 영역 컨테이너)
 *   - ref: commentRef
 *   - 최대 폭: max-w-3xl, 중앙 정렬(margin auto), 좌우 패딩 px-4
 *
 * 동작 흐름:
 * 1) 컴포넌트 마운트 또는 slug 변경 시 Utterances script 삽입
 * 2) GitHub repo의 해당 issue-term(slug) 기반 댓글 로드
 */
