const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 3000;

app.use(morgan('tiny'));
app.get('/health_check', (req, res) => res.status(200).end());
app.get('/health_check/json', (req, res) => res.json({status: 'ok '}));
app.get('/health_check/xml', (req, res) => res.set('Content-Type', 'application/xml').send('<response><returncode>SUCCESS</returncode></response>'))
app.listen(port, () => console.log(`Mock application listening at http://localhost:${port}`));