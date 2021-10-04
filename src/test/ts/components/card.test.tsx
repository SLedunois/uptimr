import React from 'react';
import {render} from "@testing-library/react";
import Card from "@components/card";

test('Card should renders properly', () => {
    render(<Card title="Card title"/>)
});

test('Card should renders title properly', () => {
    const title = "Card title";
    const {container} = render(<Card title={title}/>);
    expect(container.querySelector('.text-sm').textContent).toEqual(title);
});