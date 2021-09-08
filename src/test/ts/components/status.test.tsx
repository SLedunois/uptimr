import React from 'react';
import Status from '@components/status';
import {render} from "@testing-library/react";

test('Status should renders properly', () => {
    render(<Status status="SUCCESS"/>);
})

test('Waiting status uses green color', () => {
    const {container} = render(<Status status="WAITING"/>);
    expect(container.querySelector(".status > div").classList.contains('bg-blue-100')).toBeTruthy();
});

test('Success status uses green color', () => {
    const {container} = render(<Status status="SUCCESS"/>);
    expect(container.querySelector(".status > div").classList.contains('bg-green-100')).toBeTruthy();
});

test('Error status uses green color', () => {
    const {container} = render(<Status status="ERROR"/>);
    expect(container.querySelector(".status > div").classList.contains('bg-red-100')).toBeTruthy();
});