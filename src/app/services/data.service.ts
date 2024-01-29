import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Student } from '../modal/student';
import { Mark } from '../modal/mark';
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class DataService {
  private apiUrl = 'http://127.0.0.1:8000/api/'

  markRef: AngularFirestoreCollection <Mark>;

  constructor(private afs: AngularFirestore, private http: HttpClient) {
    this.markRef = afs.collection<Mark>('Mark');
   }

  studentsList: Student[] = [];
  markList: Mark[] = [];

  // deleteMARKSS(id:any) {
  //   const batch = this.afs.firestore.batch();
  //   this.markRef.get().forEach(doc => {
  //      batch.delete(doc.("/Students/"+id).collection("/Mark" + id));
  //   });
  //   batch.commit();
  // }
  //add student
  // addStudent(student: Student) {
  //   student.id = this.afs.createId();
  //   if (!this.studentsList.includes(student)) {
  //     this.studentsList.push(student);
  //   }
  //   return this.afs.collection('/Students').add(student);
  // }

  addMark(mark: Mark, id : any){
    this.markList.push(mark)
    return this.afs.doc("/Students/"+id).collection('/Mark').add(mark)
  }

  // students

  addStudent(data, token: string): Observable<any> {
    return this.http.post(this.apiUrl + 'students/', data, {headers: { Authorization: 'Bearer ' + token}});
  }

  fetchStudents(token: string): Observable<any> {
    return this.http.get(this.apiUrl, { headers: { Authorization: 'Bearer ' + token}});
  }

  fetchSpecificStudent(studentId, token: string): Observable<any> {
    return this.http.get(this.apiUrl + 'student/');
  }


  //get all students
  getAllStudents() {
    return this.afs.collection('/Students').snapshotChanges();
  }

  getAllMarks(id : any) {
    return this.afs.doc("/Students/"+id).collection('/Mark').snapshotChanges();
  }

  getMarksById(id : any) {
    return this.afs.doc("/Students/"+id).collection('/Mark').valueChanges();
  }

  //get studentView
  getStudentById(id : any) {
    return this.afs.doc("/Students/"+id).valueChanges();
  }

  //delete student
  deleteStudent(student: Student) {
    if (this.studentsList.indexOf(student) !== -1) {
      const index: number = this.studentsList.indexOf(student);
      const removed = this.studentsList.splice(index, 1);
      console.warn("Removed student: " + removed);
    }
    this.afs.doc('/Students/' + student.id).delete();
  }
  deleteMark(mark: Mark, id: any) {
    if (this.markList.indexOf(mark) !== -1) {
      const index: number = this.markList.indexOf(mark);
      const removed = this.markList.splice(index, 1);
      console.warn("Removed mark: " + removed);
    }
    return this.afs.doc("/Students/"+id).collection("/Mark" + id).add(mark)
  }
}
