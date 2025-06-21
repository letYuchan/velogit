module.exports = {
  singleQuote: true, // ' 사용
  trailingComma: 'all', // 여러 줄일 때 마지막에도 쉼표 추가
  tabWidth: 2, // 들여쓰기 2칸
  printWidth: 100, // 한 줄 최대 길이 100자
  jsxSingleQuote: true, // JSX에서 ' 사용
  bracketSpacing: true, // { foo: bar } 처럼 공백 추가
  arrowParens: 'avoid', // 화살표 함수 괄호 생략 (e.g. x => x)
  semi: true, // 세미콜론 추가
  plugins: ['prettier-plugin-tailwindcss'], // Tailwind 정렬 플러그인 추가
  tailwindFunctions: ['clsx', 'cn'], // Tailwind 관련 함수 정렬
};
