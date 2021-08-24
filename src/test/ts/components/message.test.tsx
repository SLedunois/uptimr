import * as React from 'react';
import '@testing-library/jest-dom'
import {render} from '@testing-library/react';

import WelcomeMessage from "@components/message";

const name = "Tom MATE";

test('WelcomeMessage should renders properly', () => {
    render(<WelcomeMessage name={name} hour={new Date().getHours()}/>);
});

test('WelcomeMessage should renders night message', () => {
    const {container, getByText} = render(<WelcomeMessage name={name} hour={4}/>)
    expect(getByText(`Good night ${name}`)).toBeInTheDocument();
    const badge = container.querySelector("h1 > div");
    expect(badge.classList.contains('bg-blue-100')).toBeTruthy();
});

test('WelcomeMessage should renders morning message', () => {
    const {container, getByText} = render(<WelcomeMessage name={name} hour={9}/>)
    expect(getByText(`Good morning ${name}`)).toBeInTheDocument();
    const badge = container.querySelector("h1 > div");
    expect(badge.classList.contains('bg-orange-100')).toBeTruthy();
});

test('WelcomeMessage should renders afternoon message', () => {
    const {container, getByText} = render(<WelcomeMessage name={name} hour={16}/>)
    expect(getByText(`Good afternoon ${name}`)).toBeInTheDocument();
    const badge = container.querySelector("h1 > div");
    expect(badge.classList.contains('bg-yellow-100')).toBeTruthy();
});

test('WelcomeMessage should renders evening message', () => {
    const {container, getByText} = render(<WelcomeMessage name={name} hour={20}/>)
    expect(getByText(`Good evening ${name}`)).toBeInTheDocument();
    const badge = container.querySelector("h1 > div");
    expect(badge.classList.contains('bg-orange-100')).toBeTruthy();
});

test('WelcomeMessage should renders day message if hour is null', () => {
    const {container, getByText} = render(<WelcomeMessage name={name} hour={null}/>)
    expect(getByText(`Good day ${name}`)).toBeInTheDocument();
    const badge = container.querySelector("h1 > div");
    expect(badge.classList.contains('bg-pink-100')).toBeTruthy();
});