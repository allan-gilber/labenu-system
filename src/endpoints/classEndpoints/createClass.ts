import { Request, Response } from 'express';
import { Class } from '../../classes';
import connection from '../../connection';
import errorMessages from '../../utilities/errorMessages';

export default async function createClass (
	req: Request,
	res: Response
): Promise<void> {
	const id = Date.now().toString();
	try {
		const newClass = new Class(id, req.body.className);
		if(!newClass.name) throw 'emptyClassName';
		await connection('classes').insert({class_id: newClass.class_id, class_name: newClass.name, class_module: newClass.module})
			.then(() => {
				res.status(200).send({message: `Class ${newClass.name} successful created`});
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