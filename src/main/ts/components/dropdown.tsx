import React, {Fragment, FunctionComponent, ReactElement} from 'react';
import {Menu, Transition} from '@headlessui/react';

export type DropdownItem = {
    label: string,
    icon: ReactElement,
    action: Function
}

export type IDropdown = {
    className?: string,
    button: ReactElement,
    items: DropdownItem[]
}

const Dropdown: FunctionComponent<IDropdown> = ({button, items, className = ''}) => (
    <Menu as="div" className={`relative inline-block text-left ${className}`}>
        <div>
            <Menu.Button>
                {button}
            </Menu.Button>
        </div>
        <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
        >
            <Menu.Items
                className="absolute right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg focus:outline-none ring-1 ring-black-100 ring-opacity-10">
                {
                    items.map(item => (
                        <div className="px-1 py-1" key={item.label}>
                            <Menu.Item>
                                <button onClick={() => item.action()}
                                        className={`group flex rounded-md items-center w-full px-2 py-2 text-sm`}>
                                    {item.icon}
                                    <span className="ml-4">
                                        {item.label}
                                    </span>
                                </button>
                            </Menu.Item>
                        </div>
                    ))
                }
            </Menu.Items>
        </Transition>
    </Menu>
)

export default Dropdown;