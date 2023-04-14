import { Component, OnInit } from "@angular/core"
import { StudentService } from "../../../shared/services/crud/student.service"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { ToastrService } from "ngx-toastr"
import { Location } from "@angular/common"
@Component({
  selector: "app-add-student",
  templateUrl: "./add-student.component.html",
})
export class AddStudentComponent implements OnInit {
  public studentForm: FormGroup
  constructor(
    public crudApi: StudentService,
    public fb: FormBuilder,
    private location: Location,
    public toastr: ToastrService,
  ) {}
  ngOnInit() {
    this.crudApi.GetStudentsList()
    this.useStudentForm()
  }
  useStudentForm() {
    this.studentForm = this.fb.group({
      firstName: [ "", [ Validators.required, Validators.minLength(2) ] ],
      lastName: [ "" ],
      email: [
        "",
        [
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"),
        ],
      ],
      mobileNumber: [ "", [ Validators.required, Validators.pattern("^[0-9]+$") ] ],
    })
  }
  get firstName() {
    return this.studentForm.get("firstName")
  }
  get lastName() {
    return this.studentForm.get("lastName")
  }
  get email() {
    return this.studentForm.get("email")
  }
  get mobileNumber() {
    return this.studentForm.get("mobileNumber")
  }
  ResetForm() {
    this.studentForm.reset()
  }

  goBack() {
    this.location.back()
  }

  submitStudentData() {
    this.crudApi.AddStudent(this.studentForm.value)
    this.toastr.success(
      this.studentForm.controls["firstName"].value + " successfully added!",
    )
    this.ResetForm()
  }
}
