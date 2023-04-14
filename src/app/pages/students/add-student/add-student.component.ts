import { Component, OnInit } from "@angular/core"
import { StudentService } from "../../../shared/services/crud/student.service"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { ToastrService } from "ngx-toastr"
import { LocationService } from "../../../shared/services/navigation/location.service"
@Component({
  selector: "app-add-student",
  templateUrl: "./add-student.component.html",
})
export class AddStudentComponent implements OnInit {
  constructor(
    public crudApi: StudentService,
    public fb: FormBuilder,
    public location: LocationService,
    public toastr: ToastrService,
  ) {}

  public studentForm: FormGroup
  ngOnInit() {
    this.crudApi.GetStudentsList()
    this.useStudentForm()
  }
  useStudentForm() {
    this.studentForm = this.fb.group({
      email: [
        "",
        [
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"),
        ],
      ],
      firstName: [ "", [ Validators.required, Validators.minLength(2) ] ],
      lastName: [ "" ],
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

  submitStudentData() {
    this.crudApi.AddStudent(this.studentForm.value)
    this.toastr.success(
      this.studentForm.controls["firstName"].value + " ajouté avec succès!",
    )
    this.ResetForm()
  }
}
