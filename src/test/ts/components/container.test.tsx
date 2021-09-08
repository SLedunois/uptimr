import React from 'react';
import '@testing-library/jest-dom'
import {render} from "@testing-library/react";
import Button from '@components/button';
import {Container} from "@components/container";

test("Container should renders properly", () => {
    render(<Container/>);
});

test("Container should renders children properly", () => {
    const {container} = render(<Container><Button.Default label="Click me!"/></Container>);
    expect(container.querySelector(".container > button")).toBeInTheDocument();
})