import React, {FunctionComponent} from 'react'
import '@testing-library/jest-dom'
import {fireEvent, render} from "@testing-library/react";

import Dropdown, {DropdownItem} from "@components/dropdown";
import {LogoutIcon} from "@app/icons";

const textButton = "Dropdown button";
const logOutText = "Log out";

const Button: FunctionComponent = () => (
    <div>{textButton}</div>
)

const items: DropdownItem[] = [
    {
        icon: <LogoutIcon/>,
        label: logOutText,
        action: jest.fn()
    }
];

test('Dropdown should renders properly', () => {
    render(<Dropdown button={<Button/>} items={items}/>)
});

test('Dropdown should renders button properly', () => {
    const {container} = render(<Dropdown button={<Button/>} items={[]}/>);
    expect(container.querySelector('button > div').textContent).toEqual(textButton);
});

test('Dropdown should renders item properly', () => {
    const {container} = render(<Dropdown button={<Button/>} items={items}/>);
    fireEvent.click(container.querySelector("button"));
    expect(container.querySelector('[role="menu"]')).toBeInTheDocument();
    expect(container.querySelector('[role="menu"] button').textContent).toEqual(logOutText);
});

test('Dropdown item click should triggers action', () => {
    const {container} = render(<Dropdown button={<Button/>} items={items}/>);
    fireEvent.click(container.querySelector('button'));
    fireEvent.click(container.querySelector('[role="menu"] button'));
    expect(items[0].action).toBeCalled();
});