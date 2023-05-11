import { Injectable } from "@angular/core"
import { Student } from "../../types/types"
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from "@angular/fire/compat/database"
@Injectable({
  providedIn: "root",
})
export class StudentService {
  studentsRef: AngularFireList<any>
  studentRef: AngularFireObject<any>
  constructor(private db: AngularFireDatabase) {}
  // Create Types
  AddStudent(student: Student) {
    this.studentsRef.push({
      email: student.email,
      firstName: student.firstName,
      lastName: student.lastName,
      mobileNumber: student.mobileNumber,
    })
  }
  // Fetch Single Types Object
  GetStudent(id: string | null) {
    this.studentRef = this.db.object("students-list/" + id)
    return this.studentRef
  }
  // Fetch Students List
  GetStudentsList() {
    this.studentsRef = this.db.list("students-list")
    return this.studentsRef
  }
  // Update Types Object
  UpdateStudent(student: Student) {
    this.studentRef.update({
      email: student.email,
      firstName: student.firstName,
      lastName: student.lastName,
      mobileNumber: student.mobileNumber,
    })
  }
  // Delete Types Object
  DeleteStudent(id: string) {
    this.studentRef = this.db.object("students-list/" + id)
    this.studentRef.remove()
  }
}
