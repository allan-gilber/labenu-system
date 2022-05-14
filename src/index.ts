import express from 'express';
import cors from 'cors';
import { AddressInfo } from 'net';
import createClass from './endpoints/createClass';
import getActiveClasses from './endpoints/getActiveClasses';
import changeClassModule from './endpoints/changeClassModule';

const app = express();

app.use(express.json());
app.use(cors());

const server = app.listen(process.env.PORT || 3003, () => {
	if (server) {
		console.clear();
		const address = server.address() as AddressInfo;
		console.log(`Server is running in http://localhost:${address.port}`);
	} else {
		console.error('Failure upon starting server.');
	}
});

app.post('/classes/createClass', createClass);

app.get('/classes/getActiveClasses', getActiveClasses);

app.put('/classes/changeClassModule/:classId', changeClassModule);