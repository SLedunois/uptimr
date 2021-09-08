import React from 'react';
import {fireEvent, render} from "@testing-library/react";
import Button from '@components/button';

test("Button should renders properly", () => {
    render(<Button.Default label="button label"/>);
});

test("Button should render with correct label", () => {
    const label = "Click me!";
    const {container} = render(<Button.Default label={label}/>);
    expect(container.querySelector("button").textContent).toEqual(label);
});

test("Click on Button should triggers onClick prop", () => {
    const fn = jest.fn();
    const {container} = render(<Button.Default label="Click me!" onClick={fn}/>);
    fireEvent.click(container.querySelector("button"));
    expect(fn).toBeCalled();
});

test("Disabled Button should use black color", () => {
    const {container} = render(<Button.Default label="Label" disabled={true}/>);
    expect(container.querySelector("button").classList.contains("bg-black-10"));
    expect(container.querySelector("button").classList.contains("text-black-100"));
})

test("Button should render with ClassName prop", () => {
    const className = "button-class";
    const {container} = render(<Button.Default label="Click me!" className={className}/>);
    expect(container.querySelector("button").classList.contains(className)).toBeTruthy();
});

test("Button.Primary should render with primary color background", () => {
    const primaryColorClassName = "bg-blue-100";
    const {container} = render(<Button.Primary label="Click me!"/>);
    expect(container.querySelector("button").classList.contains(primaryColorClassName)).toBeTruthy();
});

test("Button.Primary should properly use props through Button.Default", () => {
    const className = "button-class";
    const fn = jest.fn();
    const label = "Click me!";
    const {container} = render(<Button.Primary label={label} onClick={fn} className={className}/>);
    fireEvent.click(container.querySelector("button"));
    expect(container.querySelector("button").classList.contains(className)).toBeTruthy();
    expect(fn).toBeCalled();
    expect(container.querySelector("button").textContent).toEqual(label);
});

test("Button.Secondary should properly use props through Button.Default", () => {
    const className = "button-class";
    const fn = jest.fn();
    const label = "Click me!";
    const {container} = render(<Button.Secondary label={label} onClick={fn} className={className}/>);
    fireEvent.click(container.querySelector("button"));
    expect(container.querySelector("button").classList.contains(className)).toBeTruthy();
    expect(fn).toBeCalled();
    expect(container.querySelector("button").textContent).toEqual(label);
});