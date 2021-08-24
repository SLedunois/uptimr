import React, {FunctionComponent, ReactElement} from "react";
import {Link} from 'react-router-dom';
import {useTranslation} from "react-i18next";

import Logo from '@images/logo.svg';

const SideBarLink: FunctionComponent = ({children}) => (
    <span
        className="inline-flex items-center w-full text-md font-semibold transition-colors duration-150 text-black-100 group">
        {children}
    </span>
)

export type INavigationItem = {
    key: string,
    icon: ReactElement,
    path: string
}

type ISidebar = {
    navigation: INavigationItem[]
}

export const Sidebar: FunctionComponent<ISidebar> = ({navigation}) => {
    const {t} = useTranslation();

    return (
        <aside
            className="hidden w-64 overflow-y-auto bg-white md:block flex-shrink-0 h-screen border-r border-black-10">
            <div className="py-4 text-gray-50">
                <ul>
                    <li className="relative px-6 py-3 mb-12">
                        <a className="inline-flex items-center w-full justify-center">
                            <img src={Logo} alt="Uptimr" className="w-1/2"/>
                        </a>
                    </li>
                    {
                        navigation.map(({icon, key, path}) => (
                            <li className="relative px-6 py-2 sidebar-link" key={key}>
                                <Link to={path}>
                                    <SideBarLink>
                                        {icon}<span className="ml-4">{t(key)}</span>
                                    </SideBarLink>
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </aside>
    )
}

export default Sidebar;