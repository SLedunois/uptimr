import React, {FunctionComponent} from 'react'

export type ITitle = {
    label: string
    className?: string
}

export const H1: FunctionComponent<ITitle> = ({label, className = ''}) => (
    <h1 className={`text-4xl text-black-100 my-6 ${className}`}>{label}</h1>
);

export const H2: FunctionComponent<ITitle> = ({label, className = ''}) => (
    <h2 className={`text-2xl text-black-100 my-6 ${className}`}>{label}</h2>
);

export const H3: FunctionComponent<ITitle> = ({label, className = ''}) => (
    <h2 className={`text-lg text-black-40 my-6 font-bold ${className}`}>{label}</h2>
);

const Title = {
    H1,
    H2,
    H3
}

export default Title;