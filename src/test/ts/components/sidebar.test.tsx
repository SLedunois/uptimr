import React from 'react';
import Sidebar, {INavigationItem} from "@components/sidebar";
import {render} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";

const navigation: INavigationItem[] = [
    {
        key: 'navigation.monitors',
        icon: null,
        path: '/monitors'
    }
];

test('Sidebar renders properly', () => {
    render(
        <MemoryRouter>
            <Sidebar navigation={navigation}/>
        </MemoryRouter>
    );
});

test('Sidebar items renders properly', () => {
    const {container} = render(
        <MemoryRouter>
            <Sidebar navigation={navigation}/>
        </MemoryRouter>
    );

    expect(container.querySelector('.sidebar-link > a').getAttribute('href')).toEqual('/monitors');
});