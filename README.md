# React + TypeScript による簡易アンケートアプリ

React × Typescript × ESLint × Prettier × VSCodeなSetup - Qiita
https://qiita.com/sho-t/items/c9fe6d382636bd3402f8

React with TypeScript: Best Practices - SitePoint
https://www.sitepoint.com/react-with-typescript-best-practices/

今から始めるReact入門 〜 Redux 編 immutability とは - Qiita
https://qiita.com/TsutomuNakamura/items/a78514a61ede444bd074#immutability-%E3%81%AAjavascript

useMemoについて - Qiita
https://qiita.com/EndouT6/items/b8df6a127cd6bb335507

---

## Setup eslint & prettier

> npx eslint --init
> npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier
> touch .prettierrc.js
> touch .editorconfig

---

0. はじめに
    - コース概要
    - Reactとは
    - TypeScriptとは/TypeScriptを使用するメリット
    - アンケートアプリの設計
        - 画面設計
        - テーブル設計
        - API設計
    - Node.jsのインストール (Mac)
    - Node.jsのインストール (Windows)
    - VSCodeの拡張機能
        - eslint
        - prettier
        - editorconfig
        - styled-component
        - sqlite
1. Reactを始める前に
    - モダンなJavaScriptの機能
        - 変数の宣言 (var, let, const)
        - アロー関数
        - スプレッド構文
        - 残余引数
        - 分割代入
    - TypeScriptの基本
2. Reactの基本
    - create-react-app
    - eslint
    - prettier
    - 生成されたファイルの確認
    - Hello React!
    - state hook
    - コンポーネントと props
3. アンケート投稿機能の作成
    - 投稿フォーム
    - styled-component の導入
    - CSS Props
    - 一覧
4. アンケート回答機能の作成
    - 回答機能の実装
5. WebAPIの作成
    - WebAPIとは / RESTfulとは
    - プロジェクトの作成
    - APIの実装
6. ReactとWebAPIを連携させる
    - アンケートの投稿
    - 一覧の取得
    - 回答の投票
7. 認証機能の実装
    - WebAPIの修正
        - modelの追加・修正
        - sign-up/sign-in/sign-out api
        - enquete api
        - vote api
    - FrontEndの修正
        - ログイン機能の実装
        - Context Hookの導入
8. コメント機能の追加
    - WebAPI
        - modelの追加
        - comment api
    - FrontEnd
9. 画面の分割
    - react-routerの導入
    - 一覧画面
    - 投稿画面
    - 詳細/コメント画面
    - ログイン画面

------

### データ設計

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

### 投稿フォーム

mkdir src/components
touch src/components/VoteForm.tsx
