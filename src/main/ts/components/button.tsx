import React, {FunctionComponent} from 'react';

export type IButton = {
    label: string,
    disabled?: boolean,
    onClick?: Function,
    className?: string
}

const Default: FunctionComponent<IButton> = ({label, onClick, className = '', disabled = false}) => {
    return (
        <button
            className={`${className} py-2 px-3 rounded-md transition-all ${disabled ? 'bg-black-10 text-black-100' : null}`}
            onClick={(e) => {
                if (onClick) onClick(e)
            }}>{label}</button>
    )
}

const PrimaryButton: FunctionComponent<IButton> = ({label, onClick, className, disabled}) => (
    <Button.Default label={label} onClick={onClick}
                    className={`${className} ${disabled ? null : 'bg-blue-100 text-white'}`}
                    disabled={disabled}/>
)

const SecondaryButton: FunctionComponent<IButton> = ({label, onClick, className, disabled}) => (
    <Button.Default label={label} onClick={onClick} className={className} disabled={disabled}/>
)

const Button = {
    Default,
    Primary: PrimaryButton,
    Secondary: SecondaryButton
}

export default Button;