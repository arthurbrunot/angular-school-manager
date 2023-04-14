import { Component, Input, OnInit } from "@angular/core"
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
  constructor(
    public activeModal: NgbActiveModal,
    private courseApi: CourseService,
    public fb: FormBuilder,
    public toastr: ToastrService,
    private courseEventApi: CourseEventService,
  ) {}

  @Input() startDate: string
  @Input() endDate: string
  courses: Course[]
  isDisabled = true
  public courseForm: FormGroup

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
      this.isDisabled = !this.courses.some((obj) => obj["$key"] === val.course)
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
      endDate: this.endDate,
      startDate: this.startDate,
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
