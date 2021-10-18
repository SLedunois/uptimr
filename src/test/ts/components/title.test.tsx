import React from 'react';
import Title from '@components/title'
import {render} from "@testing-library/react";

test("Title.Title should renders properly", () => {
    render(<Title.H1 label={"It's a title"}/>);
});

test("Title.Title should renders label properly", () => {
    const title = "It's a title!";
    const {container} = render(<Title.H1 label={title}/>);
    expect(container.querySelector("h1").textContent).toEqual(title);
});

test("Title.Subtitle should renders properly", () => {
    render(<Title.H2 label={"It's a subtitle"}/>);
});

test("Title.Subtitle should renders label properly", () => {
    const subtitle = "It's a subtitle!";
    const {container} = render(<Title.H2 label={subtitle}/>);
    expect(container.querySelector("h2").textContent).toEqual(subtitle);
});