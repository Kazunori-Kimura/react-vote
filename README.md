# React + TypeScript による簡易アンケートアプリ

React × Typescript × ESLint × Prettier × VSCodeなSetup - Qiita
https://qiita.com/sho-t/items/c9fe6d382636bd3402f8

React with TypeScript: Best Practices - SitePoint
https://www.sitepoint.com/react-with-typescript-best-practices/

今から始めるReact入門 〜 Redux 編 immutability とは - Qiita
https://qiita.com/TsutomuNakamura/items/a78514a61ede444bd074#immutability-%E3%81%AAjavascript

useMemoについて - Qiita
https://qiita.com/EndouT6/items/b8df6a127cd6bb335507

strict モード – React
https://ja.reactjs.org/docs/strict-mode.html

【React+TypeScript】TypeScript入門 - yyh-gl's Tech Blog
https://yyh-gl.github.io/tech-blog/blog/react_typescript_sample/

promise - How to use fetch in typescript - Stack Overflow
https://stackoverflow.com/questions/41103360/how-to-use-fetch-in-typescript

---

ニコニコ動画 『スナップショット検索 v2 API』 ガイド
https://site.nicovideo.jp/search-api-docs/snapshot.html

PowerShell/touchコマンドと同様の動作を実現する方法 - Windowsと暮らす
https://win.just4fun.biz/?PowerShell/touch%E3%82%B3%E3%83%9E%E3%83%B3%E3%83%89%E3%81%A8%E5%90%8C%E6%A7%98%E3%81%AE%E5%8B%95%E4%BD%9C%E3%82%92%E5%AE%9F%E7%8F%BE%E3%81%99%E3%82%8B%E6%96%B9%E6%B3%95

---

## Setup eslint & prettier

> npx eslint --init
> npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier
> touch .prettierrc.js
> touch .editorconfig

### データ設計

```
questions
    id: number
    question: string
    limit: date
    created_by: number
    created_at: date
    updated_at: date

choices
    id: number
    question_id: number
    content: string
    created_at: date
    updated_at: date

votes
    id: number
    question_id: number
    choice_id: number
    voted_by: number
    created_at: number
    updated_at: date

users
    id: number
    name: string
    password: string
    created_at: date
    updated_at: date
```

### API設計

```
アンケート一覧の取得: GET: /question
アンケートの作成: POST: /question
アンケートの削除: DELETE: /question/{id}
投票: POST: /question/{question_id}/choice/{choice_id}/vote

ユーザー登録: POST: /signup
ログイン: POST: /signin
```

### 投稿フォーム

> mkdir src/components
> touch src/components/QuestionForm.tsx
