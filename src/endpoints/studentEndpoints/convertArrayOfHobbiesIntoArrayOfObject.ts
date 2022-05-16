
async function convertArrayOfHobbiesIntoArrayOfObject (arrayOfHobbies: string[]) {
	const studentHobbiesArray: object[] = [];

	arrayOfHobbies.forEach((element: string) => {
		studentHobbiesArray.push({
			hobby_id: Date.now().toString(),
			hobby_name: element
		});
	});

	return studentHobbiesArray;
}

export default convertArrayOfHobbiesIntoArrayOfObject;