import React, {FunctionComponent} from 'react';
import UI from "@components/ui";

type ICard = {
    title: string,
    filter?: React.ReactElement
    className?: string
}

const Card: FunctionComponent<ICard> = ({title, children, className = '', filter}) => (
    <UI.Shadow className={className}>
        <div className="flex flex-row justify-between items-center">
            <div className="text-md font-bold">{title}</div>
            {filter}
        </div>
        {children}
    </UI.Shadow>
)

export default Card;