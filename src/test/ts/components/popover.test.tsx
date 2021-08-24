import React, {FunctionComponent} from 'react';
import Popover, {IPopoverItem} from "@components/popover";
import {fireEvent, render} from "@testing-library/react";
import {LogoutIcon} from "@app/icons";

const popoverButtonText = "Popover button text"
const popoverItem: IPopoverItem = {
    name: 'Popover item name',
    description: 'Popover item description',
    icon: <LogoutIcon/>,
    href: '#/popover'
}

const PopoverButton: FunctionComponent = () => (
    <div>{popoverButtonText}</div>
)

test('Popover should renders properly', () => {
    render(<Popover items={[]} button={<PopoverButton/>}/>)
});

test('Popover should renders button properly', () => {
    const {container} = render(<Popover items={[]} button={<PopoverButton/>}/>);
    expect(container.querySelector("button").textContent).toEqual(popoverButtonText);
});

test('Popover should renders item properly', () => {
    const {container} = render(<Popover items={[popoverItem]} button={<PopoverButton/>}/>);
    fireEvent.click(container.querySelector("button"));
    expect(container.querySelector('[role="menuitem"] .item-name').textContent).toEqual(popoverItem.name);
    expect(container.querySelector('[role="menuitem"] .item-description').textContent).toEqual(popoverItem.description);
});