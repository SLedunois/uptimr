import React from 'react';
import {render} from "@testing-library/react";
import Breadcrumb from "@components/breadcrumb";
import {MemoryRouter} from "react-router-dom";

test('Breadcrumb should renders properly', () => {
    render(
        <MemoryRouter>
            <Breadcrumb label="Monitors" to="/monitors"/>
        </MemoryRouter>
    )
});

test('Breadcrumb should renders text content properly', () => {
    const {container} = render(
        <MemoryRouter>
            <Breadcrumb label="Monitors" to="/monitors"/>
        </MemoryRouter>
    );
    expect(container.textContent).toEqual("Monitors");
});