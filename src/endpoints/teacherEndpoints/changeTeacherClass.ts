import { Request, Response } from 'express';
import connection from '../../connection';
import errorMessages from '../../utilities/errorMessages';
import checkIfTeacherIdAndClassIdAreCorrect from './utility/checkIfTeacherIdAndClassIdAreCorrect';

export default async function changeTeacherClass (
	req: Request,
	res: Response
): Promise<void> {
	try {
		const teacherId = req.params.teacherId;
		const classId = req.body.classId;

		if(!classId) throw 'invalidClassId';
		if(!teacherId) throw 'invalidTeacherId';

		await checkIfTeacherIdAndClassIdAreCorrect(teacherId, classId)
			.then(async () =>{
				await connection('teachers').where({'teacher_id': teacherId}).update({'teacher_class_id': classId});
			})
			.then(() => {
				res.status(200).send({message: 'Teacher class successful changed.'});
			});
	} catch (error: any){
		console.log('changeTeacherClass error: ', error.message || error );
		if(error === 'invalidTeacherId') {
			res.status(400).send({message: `changeTeacherClass error: ${errorMessages(error)}`});
			return;
		}
		if(error === 'invalidClassId') {
			res.status(400).send({message: `changeTeacherClass error: ${errorMessages(error)}`});
			return;
		}
		if(error === 'teacherAlreadyInIndicatedClass'){
			res.status(400).send({message: `changeTeacherClass error: ${errorMessages(error)}`});
			return;
		}
		res.status(500).send({message: 'changeTeacherClass error: something has gone wrong with your request'});
	}
}