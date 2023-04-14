import { Injectable } from "@angular/core"
import { Course } from "./types"
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from "@angular/fire/compat/database"

@Injectable({
  providedIn: "root",
})
export class CourseService {
  coursesRef: AngularFireList<any>
  courseRef: AngularFireObject<any>

  constructor(private db: AngularFireDatabase) {}

  // Create Course
  AddCourse(course: Course, professorId: string) {
    this.coursesRef.push({
      name: course.name,
      professorId: professorId,
    })
  }

  // Fetch Single Course Object
  GetCourse(id: string | null) {
    this.courseRef = this.db.object("courses-list/" + id)
    return this.courseRef
  }

  // Fetch Courses List
  GetCoursesList() {
    this.coursesRef = this.db.list("courses-list")
    return this.coursesRef
  }

  // Update Course Object
  UpdateCourse(course: Course, id: string) {
    this.db.object("courses-list/" + id).update(course)
  }

  // Delete Course Object
  DeleteCourse(id: string) {
    this.courseRef = this.db.object("courses-list/" + id)
    this.courseRef.remove()
  }
}
