import React from 'react';
import Form, {ISelectItem} from '@components/form';
import '@testing-library/jest-dom'
import {fireEvent, render} from "@testing-library/react";

test("Form.Section should renders properly", () => {
    render(<Form.Section/>);
});

test("Form.Section should renders with classname props properly", () => {
    const className = "section-class";
    const {container} = render(<Form.Section className={className}/>);
    expect(container.querySelector("div > .section").classList.contains(className)).toBeTruthy();
});

test("Form.Section should renders children properly", () => {
    const text = "This is a section!";
    const {getByText} = render(<Form.Section>
        <div>{text}</div>
    </Form.Section>);
    expect(getByText(text)).toBeInTheDocument();
});

test("Form.Column should renders properly", () => {
    render(<Form.Column size="1/2"/>);
});

test("Form.Column should renders with right column size", () => {
    const size = "1/2";
    const {container} = render(<Form.Column size={size}/>);
    expect(container.querySelector("div > .column").classList.contains(`w-${size}`)).toBeTruthy();
});

test("Form.Column should renders with classname prop", () => {
    const className = "column-class";
    const {container} = render(<Form.Column size="1/2" className={className}/>);
    expect(container.querySelector("div > .column").classList.contains(className)).toBeTruthy();
});

test("Form.Column should renders children properly", () => {
    const text = "This is a column";
    const {getByText} = render(<Form.Column size="1/2">
        <div>{text}</div>
    </Form.Column>);
    expect(getByText(text)).toBeInTheDocument();
});

test("Form.Input should renders properly", () => {
    render(<Form.Input label="input" type="text" name="name" value="value" onChange={null}/>)
});

test("Form.Input should renders label properly", () => {
    const label = "input label";
    const {getByText} = render(<Form.Input label={label} type="text" name="name" value="value" onChange={null}/>);
    expect(getByText(label)).toBeInTheDocument();
});

test("Form.Input should renders with right type", () => {
    const type = "password";
    const {container} = render(<Form.Input label="label" type={type} name="name" value="value" onChange={null}/>);
    expect(container.querySelector(`input[type="${type}"]`)).toBeInTheDocument();
});

test("Form.Input should renders with right name", () => {
    const name = "input-name";
    const {container} = render(<Form.Input label="label" type="text" name={name} value="value" onChange={null}/>);
    expect(container.querySelector(`input[name="${name}"]`)).toBeInTheDocument();
});

test("Form.Input should renders with right value", () => {
    const value = "Input value";
    const {container} = render(<Form.Input label="label" type="text" name="name" value={value} onChange={null}/>);
    expect(container.querySelector(`input[value="${value}"]`)).toBeInTheDocument();
});

test("Form.Input should renders description properly", () => {
    const description = "Input description";
    const {getByText} = render(<Form.Input label="label" type="text" name="name" value="value" description={description}
                                           onChange={null}/>);
    expect(getByText(description)).toBeInTheDocument();
});

test("Form.Input should renders with right placeholder", () => {
    const placeholder = "Input placeholder";
    const {container} = render(<Form.Input label="label" type="text" name="name" value="value" placeholder={placeholder}
                                           onChange={null}/>);
    expect(container.querySelector(`input[placeholder="${placeholder}"]`)).toBeInTheDocument();
});

test("Form.Input should renders with right required value", () => {
    const {container} = render(<Form.Input label="label" type="text" name="name" value="value" required={true}
                                           onChange={null}/>);
    expect(container.querySelector(`input`).required).toBeTruthy()
});

test("Form.Input should renders with right disabled value", () => {
    const {container} = render(<Form.Input label="label" type="text" name="name" value="value" disabled={true}
                                           onChange={null}/>);
    expect(container.querySelector(`input`).disabled).toBeTruthy()
});

test("Form.Input should renders with right classname value", () => {
    const className = "input-class";
    const {container} = render(<Form.Input label="label" type="text" name="name" value="value" className={className}
                                           onChange={null}/>);
    expect(container.querySelector(`label`).classList.contains(className)).toBeTruthy()
});

const items: ISelectItem[] = [{
    label: 'item number 1',
    value: 1,
    disabled: false
}, {
    label: 'item number 2',
    value: 2,
    disabled: false
}];

test("Form.Select should renders properly", () => {
    render(<Form.Select items={items} label="Select" onChange={null} selected={items[0]}/>)
});

test("Form.Select should renders label properly", () => {
    const label = "Select label";
    const {container} = render(<Form.Select items={items} label={label} onChange={null} selected={items[0]}/>)
    expect(container.querySelector(".select > .label").textContent).toEqual(label);
});

test("Form.Select should renders selected element", () => {
    const {container} = render(<Form.Select label="label" items={items} selected={items[0]} onChange={null}/>);
    expect(container.querySelector("button").textContent).toEqual(items[0].label);
});

test("Click on Form.Select button should open Form.Select list options", () => {
    const {container} = render(<Form.Select label="label" items={items} selected={items[0]} onChange={null}/>);
    fireEvent.click(container.querySelector("button"));
    expect(container.querySelector('ul[role="listbox"]')).toBeInTheDocument();
});

test("Selecting new item on Form.Select should trigger onChange prop", () => {
    const onChange = jest.fn();
    const {container} = render(<Form.Select label="label" items={items} selected={items[0]} onChange={onChange}/>);
    fireEvent.click(container.querySelector("button"));
    fireEvent.click(container.querySelector('ul[role="listbox"] > li:nth-child(2)'));
    expect(onChange).toBeCalled();
});