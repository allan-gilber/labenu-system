export class Class {
	class_id: string;
	name?: string;
	module = '0';

	constructor(class_id: string, name: string){
		this.class_id = class_id;
		this.name = name;
	}
}

export class Student {

	constructor(private student_id: string, public name: string, private email: string, private birth_date: string, private class_id: string,  private hobbies: string){
		this.student_id = student_id;
		this.name = name;
		this.email = email;
		this.class_id = class_id;
		this.hobbies = hobbies;
		this.birth_date = birth_date;
	}

	public getStudentData(): string[]{
		return [this.student_id, this.name, this.email, this.birth_date, this.class_id, this.hobbies];
	}
}

export class Specialties{

	constructor(private specialties: string[]){
		this.specialties = specialties;
	}

	public getSpecialtiesList(){
		return this.specialties;	
	}
}
export class Teacher extends Specialties{

	constructor(private teacherId: string, public name: string, private email: string, private birthDate: string, private class_id: string, specialty: string[]){
		super(specialty);
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
