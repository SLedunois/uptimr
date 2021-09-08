import React from 'react';
import Headline from '@components/headline'
import {render} from "@testing-library/react";

test("Headline.Title should renders properly", () => {
    render(<Headline.Title label={"It's a title"}/>);
});

test("Headline.Title should renders label properly", () => {
    const title = "It's a title!";
    const {container} = render(<Headline.Title label={title}/>);
    expect(container.querySelector("h1").textContent).toEqual(title);
});

test("Headline.Subtitle should renders properly", () => {
    render(<Headline.Subtitle label={"It's a subtitle"}/>);
});

test("Headline.Subtitle should renders label properly", () => {
    const subtitle = "It's a subtitle!";
    const {container} = render(<Headline.Subtitle label={subtitle}/>);
    expect(container.querySelector("h2").textContent).toEqual(subtitle);
});