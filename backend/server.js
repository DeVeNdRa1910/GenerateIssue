import express from 'express';
import cors from 'cors';
import router from './src/routers/app.routes.js';
import config from './src/utils/conf.js';

const app = express();

const PORT = config.port;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api', router)

app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})