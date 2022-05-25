import { Request, Response } from 'express';
import { nanoid } from 'nanoid';
import { Class } from '../../classes';
import connection from '../../connection';
import errorMessages from '../../utilities/errorMessages';

export default async function createClass (
	req: Request,
	res: Response
): Promise<void> {
	try {
		const classId = nanoid();
		if(!req.body.className) throw 'emptyClassName';
		const newClass = new Class(classId, req.body.className).getClassData();
		await connection('classes').insert({class_id: newClass[0], class_name: newClass[1], class_module: newClass[2]})
			.then(() => {
				res.status(200).send({message: `Class ${newClass[1]} successful created with the following id: ${newClass[0]}`});
			}).catch((error: any)=>{
				throw error;
			});
	} catch (error: any){
		console.log('createClass error: ', error.message || error );
		if(error === 'emptyClassName') {
			res.status(400).send({message: `createClass error: ${errorMessages('emptyClassName')}`});
			return;
		}
		res.status(500).send({message: `createClass error:  ${errorMessages('genericError')}`});
	}
}