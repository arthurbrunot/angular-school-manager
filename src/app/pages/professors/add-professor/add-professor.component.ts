import { Component, OnInit } from "@angular/core"
import { ProfessorService } from "../../../shared/services/crud/professor.service"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { ToastrService } from "ngx-toastr"
import { Location } from "@angular/common"
@Component({
  selector: "app-add-course",
  templateUrl: "./add-professor.component.html",
})
export class AddProfessorComponent implements OnInit {
  public professorForm: FormGroup
  constructor(
    public crudApi: ProfessorService,
    public fb: FormBuilder,
    public toastr: ToastrService,
    private location: Location,
  ) {}
  ngOnInit() {
    this.crudApi.GetProfessorsList()
    this.useProfessorForm()
  }
  useProfessorForm() {
    this.professorForm = this.fb.group({
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
    return this.professorForm.get("firstName")
  }
  get lastName() {
    return this.professorForm.get("lastName")
  }
  get email() {
    return this.professorForm.get("email")
  }
  get mobileNumber() {
    return this.professorForm.get("mobileNumber")
  }
  ResetForm() {
    this.professorForm.reset()
  }

  goBack() {
    this.location.back()
  }

  submitProfessorData() {
    this.crudApi.AddProfessor(this.professorForm.value)
    this.toastr.success(
      this.professorForm.controls["firstName"].value + " successfully added!",
    )
    this.ResetForm()
  }
}
