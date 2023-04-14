import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core"
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap"
import { Course, CourseEvent } from "../../../shared/services/crud/types"
import { CourseService } from "../../../shared/services/crud/course.service"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { CourseEventService } from "../../../shared/services/crud/courseEvent.service"
import { ToastrService } from "ngx-toastr"

@Component({
  selector: "app-event-create-modal",
  templateUrl: "./event-modal.component.html",
})
export class EventCreateModalComponent implements OnInit {
  @Input() startDate: string
  @Input() endDate: string
  courses: Course[]
  isDisabled = true
  public courseForm: FormGroup

  constructor(
    public activeModal: NgbActiveModal,
    private courseApi: CourseService,
    public fb: FormBuilder,
    public toastr: ToastrService,
    private courseEventApi: CourseEventService,
  ) {}

  useCourseForm() {
    this.courseForm = this.fb.group({
      course: [ "", [ Validators.required ] ],
    })
  }

  ngOnInit() {
    this.useCourseForm()
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

    this.onChanges()
  }

  onChanges(): void {
    this.courseForm.valueChanges.subscribe((val) => {
      console.log(val)
      if (this.courses.some((obj) => obj["$key"] === val.course)) {
        this.isDisabled = false
      } else {
        this.isDisabled = true
      }
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
      courseName: this.getCourseName(this.courseForm.value.course).name,
      startDate: this.startDate,
      endDate: this.endDate,
    }
    this.courseEventApi.AddCourseEvent(event)
    this.toastr.success("Cours planifié avec succès")
    this.ResetForm()
    this.activeModal.close()
  }

  getCourseName(courseId: string): Course {
    return this.courses.find((course) => course.$key === courseId) as Course
  }
}
