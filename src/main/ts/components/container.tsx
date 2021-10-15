import React, { FunctionComponent } from 'react'

export const Container: FunctionComponent = ({ children }) => (
    <div className="container mx-auto p-8">
        {children}
    </div>
);