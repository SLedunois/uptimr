import React from "react";
import ReactDOM from "react-dom";

import '../index.css';

const Uptimr = () => (
    <h1 className="text-4xl text-green-600 font-bold">Uptimr</h1>
);

ReactDOM.render(
    <Uptimr />,
    document.getElementById('uptimr')
);