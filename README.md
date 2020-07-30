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

styled-components
https://styled-components.com/

---

ニコニコ動画 『スナップショット検索 v2 API』 ガイド
https://site.nicovideo.jp/search-api-docs/snapshot.html

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
    - VSCode拡張機能のインストール
        - eslint
        - prettier
        - editorconfig
        - sqlite
1. Reactを始める前に
    - モダンなJavaScriptの機能
        - 変数の宣言 (var, let, const)
        - import/export
        - アロー関数
        - スプレッド構文
        - 残余引数
        - 分割代入
    - immutableについて
    - TypeScriptの基本
        - 型の宣言
2. Reactの基本
    - create-react-app
        - 生成されたファイルの確認
    - eslint/prettier/editorconfig の導入
        - eslintとは/eslintを導入するメリット
        - prettierとは/prettierを導入するメリット
        - editorconfigとは/editorconfigを導入するメリット
        - eslint/prettier/editorconfig のインストールと設定
    - index.tsx の修正
        - eslintによるエラー検出
        - prettierによる自動整形
    - App.tsxの修正
        - Componentとは
        - FunctionComponent/ClassComponentについて
        - App.tsxを推奨される内容に修正する
    - Hello React!
        - 新しいコンポーネントを追加する
        - state hook
        - コンポーネントと props
3. アンケート機能の実装
    - モデル (interface) の定義
    - アンケート登録フォームの作成
    - アンケート一覧の作成
    - アンケートの編集・削除
    - 回答機能の実装
4. WebAPIの作成
    - WebAPIとは / RESTfulとは
    - expressとは
    - プロジェクトの作成
        - express
        - sequelize
    - APIの実装
        - モデルの実装
        - ルーティングの実装
    - 認証機能の実装
        - 認証方式の設計
        - 認証APIの実装
        - middlewareの実装
    - 実行、動作確認
5. ReactとWebAPIを連携させる(1): 認証機能の実装
    - ユーザー登録機能の実装
    - ログイン機能の実装
    - Context Hookの導入
6. ReactとWebAPIを連携させる(2): アンケート投稿・回答
    - Effect Hookとは
    - アンケートの投稿
    - 一覧の取得
    - 回答の投票
7. コメント機能の追加
    - テーブル設計
    - WebAPI
        - modelの追加
        - comment apiの実装
    - FrontEnd
        - コメントフォームの作成
        - コメント一覧の表示
8. 画面の分割: react-routerの導入
    - react-routerとは
    - 一覧画面
    - 投稿画面
    - 詳細/コメント画面
    - ログイン/ユーザー登録画面

------

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
アンケートの更新: PUT: /question/{id}
アンケートの削除: DELETE: /question/{id}
投票: POST: /question/{question_id}/choice/{choice_id}/vote

ユーザー登録: POST: /signup
ログイン: POST: /signin
```

### 投稿フォーム

> mkdir src/components
> touch src/components/QuestionForm.tsx
