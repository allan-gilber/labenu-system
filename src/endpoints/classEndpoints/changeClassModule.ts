import { Request, response, Response } from 'express';
import connection from '../../connection';
import errorMessages from '../../utilities/errorMessages';

export default async function changeClassModule (
	req: Request,
	res: Response
): Promise<void> {
	try {
		const classIdNumber = req.params.classId;
		const moduleNumber = Number(req.body.classModule);

		if(!Number.isInteger(moduleNumber) || !(moduleNumber >= 0) || !(moduleNumber <= 6)) throw 'invalidClassModule';

		await connection('classes').select('class_id', 'class_module').where({'class_id': classIdNumber})
			.then(async (response) => {
				console.log('t',response);
				if(!response[0]?.class_id) throw 'classIdNotFound';
				if(response[0]?.class_module === moduleNumber) throw 'classAlreadyInIndicatedModule';
				await connection('classes').where({'class_id': classIdNumber}).update({'class_module': moduleNumber});
			})
			.then(() => res.status(200).send({message: `Class module successful changed to: ${moduleNumber}`}));
	} catch (error: any){
		console.log('changeClassModule error: ', error.message || error );
		if(error === 'invalidClassModule') {
			res.status(400).send({message: `changeClassModule error: ${errorMessages(error)}`});
			return;
		}
		if(error === 'classIdNotFound') {
			res.status(400).send({message: `changeClassModule error: ${errorMessages(error)}`});
			return;
		}
		if(error === 'classAlreadyInIndicatedModule') {
			res.status(400).send({message: `changeClassModule error: ${errorMessages(error)}`});
			return;
		}
		if(error === 'classIdNotFoundOrModuleNotUpdated'){
			res.status(404).send({message: `changeClassModule error: ${errorMessages(error)}`});
			return;
		}
		res.status(500).send({message: 'changeClassModule error: something has gone wrong with your request'});
	}
}