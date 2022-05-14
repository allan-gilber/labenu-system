export default function errorMessages(errorCode: string): string {
	const errorMessageObject: any = {
		invalidClassModule: 'please, provide a valid class module.',
		invalidClassId: 'please, provide a valid class id.',
		classIdNotFoundOrModuleNotUpdated: 'no class was found with the Id provided or the module value was already set.',
		emptyClassName: 'please, inform a valid class name.',
		genericError: 'something has gone wrong with your request',
		noActiveClassFound: 'no active class has been found.'
	};
	if(errorMessageObject[errorCode]){
		return errorMessageObject[errorCode];
	}
	return errorMessageObject['genericError'];

}