export default function errorMessages(errorCode: string): string {
	const errorMessageObject: {[key: string]: string} = {
		invalidClassModule: 'please, provide a valid class module between 0 and 6.',
		invalidClassId: 'please, provide a valid class id.',
		classIdNotFound: 'theres no registered class with the provided id.',
		invalidStudentId: 'please, provide a valid student id.',
		invalidTeacherId: 'please, provide a valid teacher id.',
		classIdNotFoundOrModuleNotUpdated: 'no class was found with the Id provided or the module value was already set.',
		emptyClassName: 'please, inform a valid class name.',
		genericError: 'something has gone wrong with your request',
		noActiveClassFound: 'no active class has been found.',
		emailAlreadyRegistered: 'the provided email has already been used.',
		emptyStudentName: 'please, inform a valid student name.',
		emptyAnswerForSearchStudentByName: 'no student found with the name provided.',
		missingOrInvalidParamtersForStudentForStudentCreation: 'some paramters are missing or invalid. Please, informa a valid name, email, hobbies list and classId of the new student.',
		missingParamtersForTeacherForTeacherCreation: 'some paramters are missing or invalid. Please, inform a valid name, email, specialties and classId of the new teacher.',
		studentAlreadyInIndicatedClass: 'student is already on the indicated class.',
		emptyAnswerForGetAllTeachers: 'no teacher was found on the database(did the population script showed some error?)',
		teacherAlreadyInIndicatedClass: 'teacher is already on the indicated class.',
		classAlreadyInIndicatedModule: 'the class is already on the indicated class.'
	};
	if(errorMessageObject[errorCode]){
		return errorMessageObject[errorCode];
	}
	return errorMessageObject['genericError'];

}