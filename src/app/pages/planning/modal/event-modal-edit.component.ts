import { Component, Input, OnInit } from "@angular/core"
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap"
import { Course, CourseEvent } from "../../../shared/services/crud/types"
import { CourseService } from "../../../shared/services/crud/course.service"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { CourseEventService } from "../../../shared/services/crud/courseEvent.service"
import { ToastrService } from "ngx-toastr"
import * as moment from "moment"

@Component({
  selector: "app-event-edit-modal",
  templateUrl: "./event-modal-edit.component.html",
})
export class EventEditModalComponent implements OnInit {
  constructor(
    public activeModal: NgbActiveModal,
    private courseApi: CourseService,
    public fb: FormBuilder,
    public toastr: ToastrService,
    private courseEventApi: CourseEventService,
  ) {}

  @Input() courseEvent: CourseEvent
  courses: Course[]
  public courseForm: FormGroup

  useCourseForm() {
    this.courseForm = this.fb.group({
      course: [ "", [ Validators.required ] ],
    })
  }

  ngOnInit() {
    this.useCourseForm()
    this.courseEvent.startDate = moment(this.courseEvent.startDate).format("YYYY-MM-DD HH:mm:ss")
    this.courseEvent.endDate = moment(this.courseEvent.endDate).format("YYYY-MM-DD HH:mm:ss")
    const s = this.courseApi.GetCoursesList()
    s.snapshotChanges().subscribe((data) => {
      this.courses = []
      data.forEach((item) => {
        const a = item.payload.toJSON() as Course
        if (item.key != null) {
          a["$key"] = item.key
        }
        this.courses.push(a)
      })
    })
  }

  ResetForm() {
    this.courseForm.reset()
  }

  dismiss() {
    this.activeModal.dismiss()
  }

  onSubmit() {
    const event: Omit<CourseEvent, "$key"> = {
      courseId: this.courseForm.value.course,
      courseName: this.getCourseName(this.courseForm.value.course || this.courseEvent.courseId).name,
      endDate: this.courseEvent.endDate,
      startDate: this.courseEvent.startDate,
    }

    this.courseEventApi.UpdateCourseEvent(event, this.courseEvent.$key)
    this.toastr.success("Cours modifié avec succès")
    this.ResetForm()
    this.activeModal.close()
  }

  getCourseName(courseId: string): Course {
    return this.courses.find((course) => course.$key === courseId) as Course
  }

  onDelete() {
    this.courseEventApi.DeleteCourseEvent(this.courseEvent.$key)
    this.toastr.success("Cours supprimé avec succès")
    this.activeModal.close()
  }
}
