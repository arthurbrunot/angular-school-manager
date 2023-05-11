import { Injectable } from "@angular/core"
import { CourseEvent } from "../../types/types"
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from "@angular/fire/compat/database"

@Injectable({
  providedIn: "root",
})
export class CourseEventService {
  courseEventsRef: AngularFireList<any>
  courseEventRef: AngularFireObject<any>

  constructor(private db: AngularFireDatabase) {}

  // Create CourseEvent
  AddCourseEvent(courseEvent: Omit<CourseEvent, "$key">) {
    console.log(courseEvent)
    this.courseEventsRef.push(courseEvent)
  }

  // Fetch Single CourseEvent Object
  GetCourseEvent(id: string | null) {
    this.courseEventRef = this.db.object("courseEvents-list/" + id)
    return this.courseEventRef
  }

  // Fetch CourseEvents List
  GetCourseEventsList() {
    this.courseEventsRef = this.db.list("courseEvents-list")
    return this.courseEventsRef
  }

  // Update CourseEvent Object
  UpdateCourseEvent(courseEvent: Partial<CourseEvent>, id: string) {
    this.db.object("courseEvents-list/" + id).update(courseEvent)
  }

  // Delete CourseEvent Object
  DeleteCourseEvent(id: string) {
    this.courseEventRef = this.db.object("courseEvents-list/" + id)
    this.courseEventRef.remove()
  }
}
