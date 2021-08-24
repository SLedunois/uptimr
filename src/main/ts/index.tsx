import React from "react";
import ReactDOM from "react-dom";

import '../index.css';
import App from "./containers/app/app";

import graphql from './graphql';

import './i18n';
import {ApolloProvider} from "@apollo/client";

declare const document: Document;
declare const window: Window;

if (document.cookie.length === 0) {
    window.location.href = '/auth/sign-in';
}

ReactDOM.render(
    <ApolloProvider client={graphql}>
        <App/>
    </ApolloProvider>,
    document.getElementById('uptimr')
);