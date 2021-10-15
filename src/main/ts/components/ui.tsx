import React, {FunctionComponent} from 'react';

type IShadow = {
    className?: string
}

const Shadow: FunctionComponent<IShadow> = ({children, className = ''}) => (
    <div className={`${className} shadow-sm bg-white rounded-md overflow-hidden`}>{children}</div>
);

const UI = {
    Shadow
}

export default UI;