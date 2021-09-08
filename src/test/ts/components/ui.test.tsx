import React from 'react';
import UI from '@components/ui';
import '@testing-library/jest-dom'
import {render} from "@testing-library/react";

test('UI.Shadow should renders properly', () => {
    render(<UI.Shadow/>);
});

test('UI.Shadow should renders children properly', () => {
    const text = "This is a shadow";
    const {getByText} = render(<UI.Shadow><span>{text}</span></UI.Shadow>);
    expect(getByText(text)).toBeInTheDocument();
});