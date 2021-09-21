import React, {FunctionComponent, ReactElement} from "react";
import {Link} from 'react-router-dom';

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

export const Sidebar: FunctionComponent<ISidebar> = ({navigation}) => (
    <aside
        className="hidden w-20 overflow-y-auto bg-white md:block flex-shrink-0 h-screen border-r border-black-10 fixed top-20"
        style={{height: "calc(100vh - 5rem)"}}>
        <div className="py-4 text-gray-50 mt-8">
            <ul>
                {
                    navigation.map(({icon, key, path}) => (
                        <li className="relative p-2 flex items-center justify-center sidebar-link mb-2" key={key}>
                            <Link to={path}>
                                <SideBarLink>
                                    {icon}
                                </SideBarLink>
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    </aside>
);

export default Sidebar;