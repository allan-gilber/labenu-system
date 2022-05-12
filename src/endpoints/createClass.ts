import { Request, Response } from 'express';
import connection from '../connection';

export default async function createClass (
	req: Request,
	res: Response
): Promise<void> {
	const id = Date.now();
	try {
		const {className} = req.body;
		if(!className) throw 'empty request';
		await connection('classes').insert({class_id: id,class_name: className, class_module: '4'})
			.then(() => {
				res.status(200).send({message: `Class ${className} successful created`});
			}).catch((error)=>{
				throw error;
			});
	} catch (error){
		console.log('createClass error: ', error);
		if(error === 'empty request') {
			res.status(400).send({message: 'createClass error: please, inform a valid class name.'});
			return;
		}
		res.status(500).send({message: 'createClass error: something has gone wrong with your request'});
	}
}