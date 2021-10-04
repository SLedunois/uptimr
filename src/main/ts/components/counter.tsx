import React, {FunctionComponent, useEffect} from 'react';
import {useTimer} from "react-compound-timer";
import {useTranslation} from "react-i18next";

type ICounter = {
    date: string
}

const Counter: FunctionComponent<ICounter> = ({date}) => {
    if (!date) {
        return <div>-</div>
    }

    const {value, controls: {setTime}} = useTimer({initialTime: new Date().getTime() - new Date(date).getTime()})
    const {t} = useTranslation();

    useEffect(() => {
        setTime(new Date().getTime() - new Date(date).getTime())
    }, [date])

    return (
        <div className="text-2xl">
            {value.d > 0 && `${value.d} ${t('days')} `}
            {value.h > 0 && `${value.h} ${t('hours')} `}
            {value.m > 0 && `${value.m} ${t('minutes')} `}
            {value.s} {t('seconds')}
        </div>
    )
}

export default Counter;