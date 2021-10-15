const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 3000;

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

app.use(morgan('tiny'));
app.get('/health_check', (req, res) => setTimeout(() => res.status(200).end(), randomIntFromInterval(600, 900)));
app.get('/health_check/json', (req, res) => res.json({status: 'ok '}));
app.get('/health_check/xml', (req, res) => res.set('Content-Type', 'application/xml').send('<response><returncode>SUCCESS</returncode></response>'))
app.listen(port, () => console.log(`Mock application listening at http://localhost:${port}`));