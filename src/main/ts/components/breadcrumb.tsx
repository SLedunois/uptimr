import React, {FunctionComponent} from 'react';
import {Link} from 'react-router-dom';
import {ChevronLeftIcon} from "@app/icons";

type IBreadcrumb = {
    label: string
    to: string
}

const Breadcrumb: FunctionComponent<IBreadcrumb> = ({to, label}) => (
    <Link to={to}>
        <div className="flex items-center text-lg group">
            <ChevronLeftIcon className="text-xl text-blue-50 transition-all group-hover:text-blue-100"/><span
            className="ml-2 text-black-90 group-hover:text-black-100">{label}</span>
        </div>
    </Link>
);

export default Breadcrumb;