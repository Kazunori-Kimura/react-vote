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

## create-react-app

```
> npx create-react-app my-app --template typescript
```

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

React の流儀 – React
https://ja.reactjs.org/docs/thinking-in-react.html

## 1. モックを元にコンポーネントの階層構造に落とし込む

デザインモックを元に、アプリがどのようなコンポーネントから構成されるかを検討します。

- ひとつのコンポーネントは理想的にはひとつのことだけをするべき（単一責任の原則）

### コンポーネント構成を検討する

- App
    - Header
        - SignIn
        - SignOut
    - QuestionEntry
        - ChoiceList
            - ChoiceItem
    - QuestionList
        - QuestionItem
            - VoteList
                - VoteButton
                - VoteResult
            - QuestionItemFooter
    - SignUp

## 2. コンポーネントの静的なバージョンを作成する

### 2.1 データを定義

テーブル定義/API定義を元に `interface` を定義する
この `interface` は様々な箇所で使用するので、 `interface` であることが認識しやすいように `IQuestion` などのように、先頭に `I` を付与する

`models/index.ts`

つづいて、APIから受け取る予定のデータを作成する
先に作成した `interface` で型を定義する

`models/data.ts`

- JSONにおける Date について
    - ISOなんちゃら と toJSON
    - UTC と JST

### 2.2 コンポーネントの実装

作成した `data.ts` を描画するコンポーネントを作成する
`data.ts` は `App.ts` でまとめて読み込み、必要なデータを `props` で各コンポーネントに引き渡す

今回は先ほど検討したコンポーネント構成を元に、トップダウンで実装していく。

コンポーネントのファイル/CSSは先に一括作成しておく

```sh
touch src/components/{Header,SignIn,SignOut,QuestionEntry,ChoiceList,ChoiceItem,QuestionList,QuestionItem,VoteList,VoteButton,VoteResult,QuestionItemFooter,SignUp}.tsx
touch src/components/{Header,SignIn,SignOut,QuestionEntry,ChoiceList,ChoiceItem,QuestionList,QuestionItem,VoteList,VoteButton,VoteResult,QuestionItemFooter,SignUp}.css
```

#### 2.2.1 App

```tsx: App.tsx
import React from 'react';
import './App.css';
import Header from './components/Header';
import QuestionEntry from './components/QuestionEntry';
import SignUp from './components/SignUp';
import QuestionList from './components/QuestionList';
// 仮に静的なデータを使用する
import { user, questionEntry, questions } from './models/data';

const App: React.FC = () => {
    return (
        <div className="App">
            <Header user={user} />
            <div className="App__contents">
                <div className="App__content-item">
                    {user ? <QuestionEntry question={questionEntry} /> : <SignUp user={user} />}
                </div>
                <div className="App__content-item">
                    <QuestionList questions={questions} user={user} />
                </div>
            </div>
        </div>
    );
};

export default App;

```

- `BEM` について
- CSS Modulesについて

CSS は後ほど実装していく

#### 2.2.2 Header

```tsx: Header.tsx
import React from 'react';
import { IUser } from '../models';
import SignOut from './SignOut';
import SignIn from './SignIn';

import './Header.css';

interface HeaderProps {
    user?: IUser;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
    return <div className="header">{user ? <SignOut user={user} /> : <SignIn />}</div>;
};

export default Header;

```

コンポーネントの props の定義は `interface` で行う
コンポーネントの props であることが認識しやすいように `{ComponentName}Props` という名前にする

#### 2.2.3 SignIn

```tsx: SignIn.tsx
import React from 'react';
import { IUser } from '../models';

import './SignIn.css';

interface SignInProps {
    user?: IUser;
}

const SignIn: React.FC<SignInProps> = ({ user }) => {
    return (
        <form className="sign-in">
            <input
                type="email"
                className="sign-in__email"
                placeholder="メールアドレス"
                required
                defaultValue={user?.email}
            />
            <input
                type="password"
                className="sign-in__password"
                placeholder="パスワード"
                required
                defaultValue={user?.password}
            />
            <button type="submit" className="sign-in__button">
                ログイン
            </button>
        </form>
    );
};

export default SignIn;

```

この段階では「データモデルを描画するだけの機能を持った静的なバージョン」の作成が目的なので、テキストボックスの入力やボタンクリックの処理については後回しにする

- nullable について
- optional chain について

#### 2.2.4 SignOut

```tsx: SignOut
import React from 'react';
import { IUser } from '../models';

import './SignOut.css';

interface SignOutProps {
    user: IUser;
}

const SignOut: React.FC<SignOutProps> = ({ user }) => {
    return (
        <div className="sign-out">
            <span className="sign-out__user-name">{user.name}</span>
            <button type="button" className="sign-out__button">
                ログアウト
            </button>
        </div>
    );
};

export default SignOut;

```

#### 2.2.5 QuestionEntry

```tsx: QuestionEntry.tsx
import React from 'react';
import { IQuestion } from '../models';
import ChoiceList from './ChoiceList';
import { formatLocalDatetime } from '../utils/date';

import './QuestionEntry.css';

interface QuestionEntryProps {
    question: IQuestion;
}

const QuestionEntry: React.FC<QuestionEntryProps> = ({ question }) => {
    return (
        <form className="question-entry">
            <h2 className="question-entry__title">質問を投稿する</h2>
            <textarea
                className="question-entry__question"
                placeholder="質問"
                required
                maxLength={255}
                defaultValue={question.question}
            />
            <ChoiceList choices={question.choices ?? []} />
            <label className="question-entry__limit">
                <span className="question-entry__limit-label">期限</span>
                <input
                    className="question-entry__limit-input"
                    type="datetime-local"
                    required
                    min={formatLocalDatetime(new Date())}
                    defaultValue={formatLocalDatetime(new Date(question.limit))}
                />
            </label>
            <button type="submit" className="question-entry__entry">
                登録
            </button>
        </form>
    );
};

export default QuestionEntry;

```

- `input[type=datetime-local]` について

```ts: utils/index.ts
/**
 * 元となる文字/数字が指定された長さになるように、指定された文字を補完します
 * @param value 元となる文字列 or 数字
 * @param char 左に補完する文字
 * @param length 長さ
 */
export const padLeft = (value: number | string, char: ' ' | '0' = '0', length = 2): string => {
    const prefix = char.repeat(length);
    const ret = `${prefix}${value}`.slice(length * -1);
    return ret;
};

/**
 * 日時を yyyy-mm-ddThh:mm 形式の文字列に変換します
 * @param date
 */
export const formatLocalDatetime = (date: Date): string => {
    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    const d = date.getDate();
    const h = date.getHours();
    const mi = date.getMinutes();

    return `${y}-${padLeft(m)}-${padLeft(d)}T${padLeft(h)}:${padLeft(mi)}`;
};
```

- TypeScriptのリテラル型について

#### 2.2.6 ChoiceList

```tsx: ChoiceList.tsx
import React from 'react';
import { IChoice } from '../models';
import ChoiceItem from './ChoiceItem';

import './ChoiceList.css';

interface ChoiceListProps {
    choices: IChoice[];
}

const ChoiceList: React.FC<ChoiceListProps> = ({ choices }) => {
    return (
        <div className="choice-list">
            {choices.map((choice, index) => (
                <ChoiceItem key={`choice-item-${choice.id}`} choice={choice} index={index} />
            ))}
            <button type="button" className="choice-list__add-button">
                追加
            </button>
        </div>
    );
};

export default ChoiceList;

```

- key について

リストと key – React
https://ja.reactjs.org/docs/lists-and-keys.html

#### 2.2.7 ChoiceItem

```tsx: ChoiceItem.tsx
import React from 'react';
import { IChoice } from '../models';

import './ChoiceItem.css';

interface ChoiceItemProps {
    choice: IChoice;
    index: number;
}

const ChoiceItem: React.FC<ChoiceItemProps> = ({ choice, index }) => {
    return (
        <div className="choice-item">
            <input
                type="text"
                className="choice-item__content"
                placeholder={`選択肢 ${index}`}
                required
                maxLength={255}
                defaultValue={choice.content}
            />
            {index >= 2 && (
                <button type="button" className="choice-item__delete-button">
                    削除
                </button>
            )}
        </div>
    );
};

export default ChoiceItem;

```

#### 2.2.8 QuestionList

```tsx: QuestionList.tsx
import React from 'react';
import { IQuestion, IUser } from '../models';
import QuestionItem from './QuestionItem';

import './QuestionList.css';

interface QuestionListProps {
    questions: IQuestion[];
    user?: IUser;
}

const QuestionList: React.FC<QuestionListProps> = ({ questions, user }) => {
    return (
        <div className="question-list">
            {questions.map((question) => (
                <QuestionItem
                    key={`question-item-${question.id}`}
                    question={question}
                    user={user}
                />
            ))}
        </div>
    );
};

export default QuestionList;

```

#### 2.2.9 QuestionItem

```tsx: QuestionItem.tsx
import React from 'react';
import { IQuestion, IUser } from '../models';
import VoteList from './VoteList';
import QuestionItemFooter from './QuestionItemFooter';

import './QuestionItem.css';

interface QuestionItemProps {
    question: IQuestion;
    user?: IUser;
}

const QuestionItem: React.FC<QuestionItemProps> = ({ question, user }) => {
    return (
        <div className="question-item">
            <div className="question-item__question">{question.question}</div>
            <VoteList
                limit={question.limit}
                choices={question.choices ?? []}
                votes={question.votes ?? []}
                user={user}
            />
            <QuestionItemFooter
                limit={question.limit}
                voteCount={question.votes?.length ?? 0}
                isOwner={question.createdBy === user?.id}
            />
        </div>
    );
};

export default QuestionItem;

```

#### 2.2.10 VoteList

```tsx: VoteList.tsx
import React from 'react';
import { IChoice, IVote, IUser } from '../models';
import VoteResult from './VoteResult';
import VoteButton from './VoteButton';

import './VoteList.css';

interface VoteListProps {
    limit: string;
    choices: IChoice[];
    votes: IVote[];
    user?: IUser;
}

const VoteList: React.FC<VoteListProps> = ({ limit, choices, votes, user }) => {
    // 期限切れかどうか
    const expired = limit < new Date().toJSON();
    // 投票済みかどうか
    const voted = votes.some((vote) => vote.votedBy === user?.id);

    return (
        <div className="vote-list">
            {choices.map((choice) => {
                const key = `vote-item-${choice.questionId}-${choice.id}`;
                if (expired || voted) {
                    return <VoteResult key={key} choice={choice} votes={votes} user={user} />;
                }
                return <VoteButton key={key} choice={choice} disabled={Number.isNaN(user?.id)} />;
            })}
        </div>
    );
};

export default VoteList;

```

- `Array.some` について

#### 2.2.11 VoteButton

```tsx: VoteButton.tsx
import React from 'react';
import { IChoice } from '../models';

import './VoteButton.css';

interface VoteButtonProps {
    choice: IChoice;
    disabled?: boolean;
}

const VoteButton: React.FC<VoteButtonProps> = ({ choice, disabled = false }) => {
    return (
        <button type="button" className="vote-button" disabled={disabled}>
            {choice.content}
        </button>
    );
};

export default VoteButton;

```

#### 2.2.12 VoteResult

```tsx: VoteResult.tsx
import React from 'react';
import classnames from 'classnames';
import { IUser, IVote, IChoice } from '../models';

import './VoteResult.css';

interface VoteResultProps {
    choice: IChoice;
    votes: IVote[];
    user?: IUser;
}

const VoteResult: React.FC<VoteResultProps> = ({ choice, votes, user }) => {
    // この選択肢に該当する投票
    const gainVotes = votes.filter((vote) => vote.choiceId === choice.id);
    // この選択肢に投票済み？
    const voted = gainVotes.some((vote) => vote.votedBy === user?.id);
    // 得票率
    const rate = votes.length === 0 ? 0 : Math.round((gainVotes.length / votes.length) * 100);

    return (
        <div
            className={classnames('vote-result', {
                'vote-result--voted': voted,
            })}
        >
            <div
                className={classnames('vote-result__rate-bar', {
                    'vote-result__rate-bar--voted': voted,
                })}
                style={{ width: `calc(100% * ${rate / 100})` }}
            />
            <div className="vote-result__wrapper">
                <div className="vote-result__content">{choice.content}</div>
                {voted && <div className="vote-result__voted">✔︎</div>}
                <div className="vote-result__rate">{`${rate} %`}</div>
            </div>
        </div>
    );
};

export default VoteResult;

```

- style props について

#### 2.2.13 QuestionItemFooter

```tsx: QuestionItemFooter.tsx
import React from 'react';
import { formatLocalDatetime } from '../utils/date';

import './QuestionItemFooter.css';

interface QuestionItemFooterProps {
    limit: string;
    voteCount: number;
    isOwner?: boolean;
}

const QuestionItemFooter: React.FC<QuestionItemFooterProps> = ({
    limit,
    voteCount,
    isOwner = false,
}) => {
    return (
        <div className="question-item-footer">
            <div className="question-item-footer__limit">
                {`${formatLocalDatetime(new Date(limit))} まで`}
            </div>
            <div className="question-item-footer__vote-count">{`${voteCount} 票`}</div>
            {isOwner && (
                <button type="button" className="question-item-footer__delete-button">
                    削除
                </button>
            )}
        </div>
    );
};

export default QuestionItemFooter;

```

#### 2.2.14 SignUp

```tsx: SignUp.tsx
import React from 'react';
import { IUser } from '../models';

import './SignUp.css';

interface SignUpProps {
    user?: IUser;
}

const SignUp: React.FC<SignUpProps> = ({ user }) => {
    return (
        <form className="sign-up">
            <h2 className="sign-up__title">ユーザー登録</h2>
            <input
                type="email"
                className="sign-up__email"
                required
                maxLength={255}
                placeholder="メールアドレス"
                defaultValue={user?.email}
            />
            <input
                type="text"
                className="sign-up__name"
                required
                maxLength={255}
                placeholder="名前"
                defaultValue={user?.name}
            />
            <input
                type="password"
                className="sign-up__password"
                required
                placeholder="パスワード"
                defaultValue={user?.password}
            />
            <button type="submit" className="sign-up__entry-button">
                登録
            </button>
        </form>
    );
};

export default SignUp;

```

ここまで実装したら、ESLintのエラーや警告は無いはず。
VSCode のメニューバーから `表示` -> `問題` を選択して確認する。
エラーや警告がある場合は修正する。

すべてのエラーや警告を削除したら、`npm start` を実行する。
ブラウザが起動し、テキストボックスやボタンが表示されることを確認する。

### 2.3 デザイン (CSS) の実装

デザインモックを参考に CSS を実装していく。

`BEM` の規則に則り、ブロック（=コンポーネント） ごとに CSS ファイルを作成する。
ブラウザで画面を確認しながら実装する。

- App.css
- Header.css
- SignOut.css
- QuestionEntry.css
- ChoiceList.css
- ChoiceItem.css
- QuestionList.css
- QuestionItem.css
- VoteList.css
- VoteButton.css
- VoteResult.css
- QuestionItemFooter.css

`SignIn` と `SignUp` は `App` を修正して表示する

```tsx: App.tsx
import React from 'react';
import './App.css';
import Header from './components/Header';
import QuestionEntry from './components/QuestionEntry';
import SignUp from './components/SignUp';
import QuestionList from './components/QuestionList';
// 仮に静的なデータを使用する
import { user, questionEntry, questions } from './models/data';

const App: React.FC = () => {
    return (
        <div className="App">
            <Header />
            <div className="App__contents">
                <div className="App__content-item">
                    {/* user ? <QuestionEntry question={questionEntry} /> : <SignUp user={user} /> */}
                    <SignUp user={user} />
                </div>
                <div className="App__content-item">
                    <QuestionList questions={questions} user={user} />
                </div>
            </div>
        </div>
    );
};

export default App;

```

- SignIn.css
- SignUp.css


ここまでの内容は以下

Kazunori-Kimura/react-vote at v0.0.1
https://github.com/Kazunori-Kimura/react-vote/tree/v0.0.1

## 3. 静的なデータを state に置き換える

ユーザーからの入力を受け付けるように、静的なデータを state に置き換える

> 1. 親から props を通じて与えられたデータでしょうか？ もしそうなら、それは state ではありません
> 1. 時間経過で変化しないままでいるデータでしょうか？ もしそうなら、それは state ではありません
> 1. コンポーネント内にある他の props や state を使って算出可能なデータでしょうか？ もしそうなら、それは state ではありません

### 3.1 ユーザーがログインできるようにする

フォーム – React
https://ja.reactjs.org/docs/forms.html

state のリフトアップ – React
https://ja.reactjs.org/docs/lifting-state-up.html#lifting-state-up

#### 3.1.1 SignIn

- `eslint-disable-next-line` について
- あるコンポーネントを修正すると、関連するコンポーネントにも修正が必要になる。
ビルドを実行したままにしておけばエラーや警告を検出するとターミナルに表示してくれるので、終了した場合は `npm start` を実行しておく。合わせてブラウザの開発者ツールのエラーもチェックすると良い。

#### 3.1.2 Header

#### 3.1.3 App

### 3.2 ユーザーがログアウトできるようにする

#### 3.2.1 App

#### 3.2.2 Header

#### 3.2.3 SignOut

Kazunori-Kimura/react-vote at v0.0.2
https://github.com/Kazunori-Kimura/react-vote/tree/v0.0.2

### 3.3 ユーザー登録機能を仮実装する

静的なデータを state に置き換えて、SignUpコンポーネントを入力可能にします

- SignUp.tsx

### 3.4 アンケートの登録

登録ボタン押下時、APIに入力データを投げて登録成功時にリストを再読み込みする

#### 3.4.1 App

#### 3.4.2 QuestionEntry

- 選択肢の追加・削除・更新
- Submit時の処理

#### 3.4.3 ChoiceList

- 選択肢の追加・削除・更新
- stateは不要

#### 3.4.4 ChoiceItem

### 3.5 投票機能の実装

投票ボタンをクリックしたら `POST: /vote` を呼び出しリストを再読み込みする

#### 3.5.1 App.tsx

#### 3.5.2 VoteButton

#### 3.5.3 VoteList

#### 3.5.4 QuestionItem

#### 3.5.5 QuestionList


## 4. コンポーネントのテスト

```sh
> touch src/components/__tests__/{Header,SignIn,SignOut,QuestionEntry,ChoiceList,ChoiceItem,QuestionList,QuestionItem,VoteList,VoteButton,VoteResult,QuestionItemFooter,SignUp}.test.tsx
```

Mock Functions · Jest
https://jestjs.io/docs/ja/mock-functions

テストのレシピ集 – React
https://ja.reactjs.org/docs/testing-recipes.html#mocking-modules


create-react-appで作成したReactアプリをテストしてみる - 坂本研のゼミ室
https://takashinoda.hatenablog.com/entry/2019/12/01/002203

テストユーティリティ – React
https://ja.reactjs.org/docs/test-utils.html

Example · Testing Library
https://testing-library.com/docs/react-testing-library/example-intro

Jestとreact-testing-libraryを使ったTypeScript + ReactのテストをCircleCIで回す - 車輪の二度漬け
https://wheeltwice.hatenablog.com/entry/2019/10/21/125049

Input Event · Testing Library
https://testing-library.com/docs/example-input-event

Expect · Jest
https://deltice.github.io/jest/docs/ja/expect.html

Test for 'element exists?'- React testing library - DEV
https://dev.to/lek890/test-for-element-exists-react-testing-library-hg5

Input Event · Testing Library
https://testing-library.com/docs/example-input-event

Helpers · Testing Library
https://testing-library.com/docs/dom-testing-library/api-helpers
