import React from 'react';
import { Choice } from '../../models';

interface ReadOnlyChoiceProps {
    choice: Choice;
    rate: number;
    voted?: boolean;
}

/**
 * 投票済みor投票期限切れの選択肢コンポーネント
 */
const ReadOnlyChoice: React.FC<ReadOnlyChoiceProps> = ({ choice, rate, voted = false }) => {
    return (
        <div className="choice">
            <div className="choice__vote-bar" style={{ width: `calc(100% * (${rate} / 100))` }} />
            <div className="choice__content">
                <div className="choice__text">{choice.content}</div>
                {voted && <div className="choice__voted">✔︎</div>}
                <div className="choice__vote-rate">{rate} %</div>
            </div>
        </div>
    );
};

export default ReadOnlyChoice;
