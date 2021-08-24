import React, {Fragment, FunctionComponent, ReactElement} from 'react';
import {Popover as HPopover, Transition} from '@headlessui/react';

export type IPopoverItem = {
    name: string,
    description: string,
    href: any,
    icon: ReactElement
}

export type IPopover = {
    className?: string,
    items: IPopoverItem[],
    button: ReactElement
}

const Popover: FunctionComponent<IPopover> = ({button, items, className}) => (
    <div className="w-full max-w-sm px-4 fixed top-16">
        <HPopover className="relative">
            {() => (
                <>
                    <HPopover.Button>
                        {button}
                    </HPopover.Button>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                    >
                        <HPopover.Panel
                            className="absolute z-10 w-screen max-w-sm px-4 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0">
                            <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black-100 ring-opacity-5"
                                 role="menu">
                                <div className="relative grid gap-8 bg-white p-7 lg:grid-cols-1">
                                    {items.map((item) => (
                                        <a role="menuitem"
                                           key={item.name}
                                           href={item.href}
                                           className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-background focus:outline-none focus-visible:ring focus-visible:ring-orange-100 focus-visible:ring-opacity-50"
                                        >
                                            <div
                                                className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-white sm:h-12 sm:w-12">
                                                {item.icon}
                                            </div>
                                            <div className="ml-4">
                                                <p className="text-sm font-medium text-black-100 item-name">
                                                    {item.name}
                                                </p>
                                                <p className="text-sm text-black-50 item-description">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </HPopover.Panel>
                    </Transition>
                </>
            )}
        </HPopover>
    </div>
)

export default Popover;