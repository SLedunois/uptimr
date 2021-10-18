import React from "react";
import ReactDOM from "react-dom";

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import '../index.css';
import App from "@app/containers/app/app";

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