import React, {FunctionComponent} from 'react';
import UI from "@components/ui";

type ICard = {
    title: string,
    className?: string
}

const Card: FunctionComponent<ICard> = ({title, children, className = ''}) => (
    <UI.Shadow className={className}>
        <div className="text-sm">{title}</div>
        {children}
    </UI.Shadow>
)

export default Card;