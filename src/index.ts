import express from 'express';
import cors from 'cors';
import { AddressInfo } from 'net';
import createClass from './endpoints/classEndpoints/createClass';
import getActiveClasses from './endpoints/classEndpoints/getActiveClasses';
import changeClassModule from './endpoints/classEndpoints/changeClassModule';
import createStudent from './endpoints/studentEndpoints/createStudent';
import getStudentByName from './endpoints/studentEndpoints/getStudentByName';
import changeStudentClass from './endpoints/studentEndpoints/changeStudentClass';
import createTeacher from './endpoints/teacherEndpoints/createTeacher';

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
app.post('/student/createStudent', createStudent);
app.post('/teachers/createTeacher', createTeacher);

app.get('/classes/getActiveClasses', getActiveClasses);
app.get('/student/getStudentByName', getStudentByName);

app.put('/classes/changeClassModule/:classId', changeClassModule);
app.put('/student/changeStudentClass/:studentId',changeStudentClass);