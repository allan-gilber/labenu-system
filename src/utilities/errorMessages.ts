export default function errorMessages(errorCode: string): string {
	const errorMessageObject: any = {
		invalidClassModule: 'please, provide a valid class module.',
		invalidClassId: 'please, provide a valid class id.',
		invalidStudentId: 'please, provide a valid class id.',
		classIdNotFoundOrModuleNotUpdated: 'no class was found with the Id provided or the module value was already set.',
		emptyClassName: 'please, inform a valid class name.',
		genericError: 'something has gone wrong with your request',
		noActiveClassFound: 'no active class has been found.',
		studentEmailAlreadyRegistered: 'the provided email has already been used.',
		emptyStudentName: 'please, inform a valid student name.',
		emptyAnswerForSearchStudentByName: 'no student found with the name provided.',
		missingParamtersForStudentForStudentCreation: 'some paramters are missing or invalid. Please, send name, email, hobbies list and classId of the new student.',
		studentAlreadyInIndicatedClass: 'student is already on the indicated class.'
	};
	if(errorMessageObject[errorCode]){
		return errorMessageObject[errorCode];
	}
	return errorMessageObject['genericError'];

}