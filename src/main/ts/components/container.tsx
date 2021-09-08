import React, {FunctionComponent} from 'react'

export const Container: FunctionComponent = ({children}) => (
    <div className="container mx-8 mx-auto p-8">
        {children}
    </div>
);