import React, {FunctionComponent} from 'react'

export type ITitle = {
    label: string
    className?: string
}

export const Title: FunctionComponent<ITitle> = ({label, className}) => (
    <h1 className={`text-4xl color-black-100 my-6 ${className}`}>{label}</h1>
);

export const Subtitle: FunctionComponent<ITitle> = ({label, className}) => (
    <h2 className={`text-2xl color-black-100 my-6 ${className}`}>{label}</h2>
);

const Headline = {
    Title,
    Subtitle
}

export default Headline;