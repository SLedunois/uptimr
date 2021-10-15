import React, { FunctionComponent, ReactElement } from 'react'
import { MoonIcon, SunIcon, SunriseIcon, SunsetIcon, UserIcon } from "../icons";
import Badge from "./badge";
import { useTranslation } from "react-i18next";

type IWelcomeMessage = {
    name: string,
    className?: string,
    hour: number
}

function getKeyword(hour: number): string {
    if ((hour > 21 && hour < 24) || (hour >= 0 && hour <= 8)) {
        return 'welcome-message.night';
    } else if (hour > 8 && hour <= 13) {
        return 'welcome-message.morning'
    } else if (hour > 18 && hour <= 21) {
        return 'welcome-message.evening';
    } else if (hour > 13 && hour <= 18) {
        return 'welcome-message.afternoon'
    }

    return 'welcome-message.day'
}

function getIcon(hour: number): ReactElement {
    if ((hour > 21 && hour < 24) || (hour >= 0 && hour <= 6)) {
        return <MoonIcon />
    } else if (hour > 6 && hour <= 9) {
        return <SunriseIcon />
    } else if (hour > 9 && hour <= 18) {
        return <SunIcon />
    } else if (hour > 18 && hour <= 21) {
        return <SunsetIcon />
    }

    return <UserIcon />
}

function getColor(hour: number): string {
    if ((hour > 21 && hour < 24) || (hour >= 0 && hour <= 6)) {
        return "blue"
    } else if ((hour > 6 && hour <= 9) || (hour > 18 && hour <= 21)) {
        return "orange"
    } else if (hour > 9 && hour <= 18) {
        return "yellow"
    }

    return "pink"
}

export const WelcomeMessage: FunctionComponent<IWelcomeMessage> = ({ name, className, hour }) => {
    const { t } = useTranslation();
    return (
        <h1 className={`flex flex-row items-center text-2xl font-normal ${className}`}>
            <Badge color={getColor(hour)} className="mr-4">
                {getIcon(hour)}
            </Badge>
            {t('welcome-message.message', { keyword: t(getKeyword(hour)), name })}
        </h1>
    )
}

export default WelcomeMessage;