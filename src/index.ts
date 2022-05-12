import express from 'express';
import cors from 'cors';
import { AddressInfo } from 'net';
import connection from './connection';
import { Request, Response } from 'express';
import createClass from './endpoints/createClass';
import getActiveClasses from './endpoints/getActiveClasses';

const app = express();

app.use(express.json());
app.use(cors());

const server = app.listen(process.env.PORT || 3003, () => {
	if (server) {
		const address = server.address() as AddressInfo;
		console.log(`Server is running in http://localhost:${address.port}`);
	} else {
		console.error('Failure upon starting server.');
	}
});

app.post('/createClass', createClass);

app.get('/getActiveClasses', getActiveClasses);