import { Request, Response } from 'express';
import { Student } from '../../classes';
import connection from '../../connection';
import errorMessages from '../../utilities/errorMessages';
import convertArrayOfHobbiesIntoArrayOfObject from './convertArrayOfHobbiesIntoArrayOfObject';

export default async function createStudent (
	req: Request,
	res: Response
): Promise<void> {
	const studentId = Date.now().toString();
	const hobbiesID = Date.now().toString();

	const studentHobbiesArray: object[] = await convertArrayOfHobbiesIntoArrayOfObject(req.body.hobbies);

	console.log(studentHobbiesArray);
	try {
		const newStudent = new Student(studentId, req.body.name,req.body.email,req.body.birthDate,req.body.classId, req.body.hobbies);

		if(!newStudent.name || !newStudent.email || !newStudent.hobbies || !newStudent.class_id) throw 'missingParamtersForStudent';

		await connection.transaction(async transactionFunction => {
			await transactionFunction('students').insert({
				student_id: newStudent.student_id, 
				student_name: newStudent.name, 
				student_email: newStudent.email, 
				student_birth_date: newStudent.birth_date, 
				class_id: newStudent.class_id
			});
			await transactionFunction('hobbies').insert(studentHobbiesArray);
		})

		// await connection('students').insert({student_id: newStudent.student_id, student_name: newStudent.name, student_email: newStudent.email, student_birth_date: newStudent.birth_date, class_id: newStudent.class_id})
			.then((response: any) => {
				console.log(response);
				res.status(200).send({message: `Class ${newStudent.name} successful created`});
			}).catch((error: any)=>{
				throw error;
			});
	} catch (error){
		console.log('createStudent error: ', error);
		if(error === 'missingParamtersForStudent') {
			res.status(400).send({message: `createStudent error: ${errorMessages('emptyClassName')}`});
			return;
		}
		res.status(500).send({message: `createStudent error:  ${errorMessages('genericError')}`});
	}
}