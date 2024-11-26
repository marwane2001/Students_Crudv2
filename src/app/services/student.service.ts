import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from '../Student';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
url:string="http://localhost:8888/students";
  private students: Student[] = [];
  private nextId: number = 1;
  private studentsSubject: BehaviorSubject<Student[]> = new BehaviorSubject<Student[]>([]);
  constructor(private http:HttpClient) {}

  public allStudents(){
    return this.http.get<Student[]>(this.url);
  }

  public addStudent(student: Student): Observable<Student> {
    student.id = this.nextId++;
    this.students.push(student);
    this.studentsSubject.next(this.students);
    return this.http.post<Student>(this.url, student);
  }

  public deleteStudent(id:number){
    return this.http.delete(this.url + "/" +id);
  }
}
