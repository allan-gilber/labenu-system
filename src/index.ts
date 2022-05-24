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
import getAllTeachers from './endpoints/teacherEndpoints/getAllTeachers';
import changeTeacherClass from './endpoints/teacherEndpoints/changeTeacherClass';

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
app.post('/students/createStudent', createStudent);
app.post('/teachers/createTeacher', createTeacher);

app.get('/classes/getActiveClasses', getActiveClasses);
app.get('/students/getStudentByName', getStudentByName);
app.get('/teachers/getTeachersByName', getAllTeachers);

app.put('/classes/changeClassModule/:classId', changeClassModule);
app.put('/students/changeStudentClass/:studentId', changeStudentClass);
app.put('/teachers/changeTeachersClass/:teacherId', changeTeacherClass);