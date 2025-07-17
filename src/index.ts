import express, { Request , Response} from 'express';
import cors from 'cors';
import errorHandler from './middleware/errorHandler';
import logger from './middleware/logger';
import routes from './routes';

const app = express();

app.use(cors());
app.use(logger);
app.use(express.json());

app.use('/', routes);

app.use(errorHandler);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
