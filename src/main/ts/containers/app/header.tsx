import React, {FunctionComponent} from 'react';
import Dropdown from "@components/dropdown";
import {LogoutIcon, UserIcon} from "../../icons";
import WelcomeMessage from "@components/message";
import {useTranslation} from "react-i18next";
import {IUser} from "../../types";

declare const document: Document;

type IHeader = {
    user: IUser
}

const DropDownButton = () => (
    <div className="inline-flex justify-center items-center w-full px-4 py-2 text-2xl font-medium text-black-100 group">
        <UserIcon/>
    </div>
)

const Header: FunctionComponent<IHeader> = ({user}) => {
    const {t} = useTranslation();

    const dropDownItems = [
        {
            label: t('sign-out'),
            icon: <LogoutIcon/>,
            action: () => {
                document.cookie = 'Uptimr-Session=; Max-Age=0';
                document.location.href = '/auth/sign-in';
                return true;
            }
        }
    ]

    return (
        <header className="flex items-center h-20 w-full z-10 bg-white border-b border-black-10 justify-between">
            <WelcomeMessage name={`${user.firstname} ${user.lastname}`} hour={new Date().getHours()} className="ml-8"/>
            <Dropdown button={<DropDownButton/>} items={dropDownItems} className="justify-self-end mr-20"/>
        </header>
    )
}

export default Header;