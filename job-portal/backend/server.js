const express = require('express');
const cors = require('cors');
const client = require('prom-client');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

// in-memory jobs
const jobs = [
  { id: 1, title: 'Software Engineer', company: 'Acme' },
  { id: 2, title: 'DevOps Engineer', company: 'Cloudy' }
];

// Metrics
const register = new client.Registry();
client.collectDefaultMetrics({ register });

const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total HTTP requests',
  labelNames: ['method', 'route', 'status']
});
register.registerMetric(httpRequestCounter);

function count(req, res, next) {
  res.on('finish', () => {
    httpRequestCounter.inc({ method: req.method, route: req.path, status: res.statusCode });
  });
  next();
}
app.use(count);

// Health
app.get('/health', (_, res) => res.json({ ok: true }));

// API
app.get('/api/jobs', (_, res) => res.json(jobs));
app.post('/api/jobs', (req, res) => {
  const { title, company } = req.body || {};
  if (!title || !company) return res.status(400).json({ error: 'title and company required' });
  const job = { id: jobs.length + 1, title, company };
  jobs.push(job);
  res.status(201).json(job);
});

// Prometheus metrics
app.get('/metrics', async (_, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.listen(PORT, () => console.log('Backend on port', PORT));
