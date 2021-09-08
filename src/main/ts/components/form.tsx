import React, {Fragment, FunctionComponent} from 'react';
import {Listbox, Transition} from "@headlessui/react";
import {CheckIcon, SelectorIcon} from "@app/icons";

type ISection = {
    className?: string
}

const Section: FunctionComponent<ISection> = ({children, className}) => (
    <div className={`my-6 rounded-md flex flex-row ${className} section`}>{children}</div>
)

type IColumn = {
    size?: string
    className?: string
}
const Column: FunctionComponent<IColumn> = ({children, size, className}) => (
    <div className={`${size ? "w-" + size : ''} ${className} column`}>{children}</div>
)

type IInput = {
    label: string
    type: string
    name: string
    value: any
    onChange: Function
    description?: string
    placeholder?: string
    required?: boolean
    className?: string
    disabled?: boolean
    error?: boolean
}

const Input: FunctionComponent<IInput> = ({
                                              label,
                                              type,
                                              name,
                                              value,
                                              onChange,
                                              description,
                                              placeholder,
                                              required = false,
                                              className,
                                              disabled = false,
                                              error = false
                                          }) => (
    <label className={`relative ${className}`}>
        <span className="font-bold text-sm">{label}</span>
        <input type={type} name={name} placeholder={placeholder} value={value} disabled={disabled}
               onChange={(e) => onChange(e)}
               className={`block border-2 h-8 p-6 rounded-md w-full placeholder-black-100 transition-all 
                ${disabled ? 'bg-black-10 hover:border-black-30 border-black-30' : 'border-blue-30 focus:border-blue-100 hover:border-blue-100'}
                ${error ? 'bg-red-10 hover:border-red-30 border-red-30 text-red-100 text-bold' : null}`}
               required={required}/>
        <span className="text-xs">{description}</span>
    </label>
);


export type ISelectItem = {
    label: string
    value: any
    disabled: boolean
}

export type ISelect = {
    label: string
    items: ISelectItem[]
    selected: ISelectItem
    onChange: Function
    className?: string
}

const Select: FunctionComponent<ISelect> = ({items, className, label, onChange, selected}) => {

    return (
        <div className={`w-full ${className} select`}>
            <span className="font-bold text-sm label">{label}</span>
            <Listbox value={selected} onChange={(value) => onChange(value)}>
                <div className="relative mt-1">
                    <Listbox.Button
                        className="relative w-full text-left h-8 p-6 bg-white rounded-lg border-2 border-blue-30 hover:border-blue-100 cursor-default flex items-center cursor-pointer">
                        <span className="block truncate">{selected.label}</span>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <SelectorIcon
                          className="w-5 h-5 text-gray-400"
                          aria-hidden="true"
                      />
            </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options
                            className="absolute w-full mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-44 py-3 z-10">
                            {items.map((item, idx) => (
                                <Listbox.Option
                                    key={idx}
                                    className={({active}) => `${active ? 'text-blue-100 bg-blue-10 cursor-pointer' : 'text-black-100'} cursor-default select-none relative py-3 pl-10 pr-4`}
                                    disabled={item.disabled}
                                    value={item}
                                >
                                    {({selected, active}) => (
                                        <div>
                                          <span
                                              className={`${selected ? 'font-medium' : 'font-normal'} block truncate`}>
                                            {item.label}
                                          </span>
                                            {selected ? (
                                                <span
                                                    className="text-blue-100 absolute inset-y-0 left-0 flex items-center pl-3">
                                                <CheckIcon className="w-5 h-5" aria-hidden="true"/>
                                            </span>
                                            ) : null}
                                        </div>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>);
}


const Form = {
    Section,
    Column,
    Input,
    Select
};

export default Form;