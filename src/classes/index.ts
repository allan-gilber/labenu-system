export class Class {

	constructor(private class_id: string, private name: string, private module = '0'){
		this.class_id = class_id;
		this.name = name;
	}

	public getClassData(): string[]{
		return [this.class_id, this.name, this.module];
	}
}

export class Hobbies {

	constructor(protected hobbiesArray: string[]){
		this.hobbiesArray = hobbiesArray;
	}

	public gethobbiesList(){
		return this.hobbiesArray;	
	}
}


export class Student extends Hobbies {

	constructor(private student_id: string, public name: string, private email: string, private birth_date: string, private class_id: string, hobbiesArray: string[]){
		super(hobbiesArray);
		this.student_id = student_id;
		this.name = name;
		this.email = email;
		this.birth_date = birth_date;
		this.class_id = class_id;
	}

	public getStudentData(): any {
		return [this.student_id, this.name, this.email, this.birth_date, this.class_id, this.gethobbiesList];
	}
}

export class Specialties {

	constructor(protected specialties: string[]){
		this.specialties = specialties;
	}

	public getSpecialtiesList(){
		return this.specialties;	
	}
}
export class Teacher extends Specialties {

	constructor(private teacherId: string, public name: string, private email: string, private birthDate: string, private class_id: string, specialties: string[]){
		super(specialties);
		this.teacherId = teacherId;
		this.name = name;
		this.email = email;
		this.birthDate = birthDate;
		this.class_id = class_id;
	}

	public getTeacherInformation(): any   {
		return [this.teacherId, this.name, this.email, this.birthDate, this.class_id, this.getSpecialtiesList];
	}
}
