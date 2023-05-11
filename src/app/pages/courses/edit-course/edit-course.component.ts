import { Component, OnInit } from "@angular/core"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { CourseService } from "../../../shared/services/crud/course.service"
import { ActivatedRoute, Router } from "@angular/router"
import { ToastrService } from "ngx-toastr"
import { Professor } from "../../../shared/types/types"
import { ProfessorService } from "../../../shared/services/crud/professor.service"
import { LocationService } from "../../../shared/services/navigation/location.service"
@Component({
  selector: "app-edit-course",
  templateUrl: "./edit-course.component.html",
})
export class EditCourseComponent implements OnInit {
  constructor(
    private courseApi: CourseService,
    private professorApi: ProfessorService,
    private fb: FormBuilder,
    public location: LocationService,
    private actRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  editForm: FormGroup
  Professors: Professor[]
  courseId: string

  ngOnInit() {
    this.updateCourseData()
    const id = this.actRoute.snapshot.paramMap.get("id")
    this.courseId = id as string
    this.courseApi
      .GetCourse(id)
      .valueChanges()
      .subscribe((data) => {
        this.editForm.setValue({ name: data.name, professor: data.professorId })
      })
    const s = this.professorApi.GetProfessorsList()
    s.snapshotChanges().subscribe(data => {
      this.Professors = []
      data.forEach(item => {
        const a = item.payload.toJSON() as Professor

        if (item.key != null) {
          a["$key"] = item.key
        }
        this.Professors.push(a)
      })
    })
  }
  get name() {
    return this.editForm.get("name")
  }
  get professor() {
    return this.editForm.get("professor")
  }

  updateCourseData() {
    this.editForm = this.fb.group({
      name: [ "", [ Validators.required, Validators.minLength(2) ] ],
      professor: [ "" ],
    })
  }
  updateForm() {
    this.courseApi.UpdateCourse(this.editForm.value, this.courseId)
    this.toastr.success(
      this.editForm.controls["name"].value + " modifié avec succès",
    )
    this.router.navigate([ "view-courses" ])
  }
}
