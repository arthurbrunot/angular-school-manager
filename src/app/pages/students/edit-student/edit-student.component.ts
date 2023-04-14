import { Component, OnInit } from "@angular/core"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { StudentService } from "../../../shared/services/crud/student.service"
import { ActivatedRoute, Router } from "@angular/router"
import { ToastrService } from "ngx-toastr"
import { LocationService } from "../../../shared/services/navigation/location.service"
@Component({
  selector: "app-edit-student",
  templateUrl: "./edit-student.component.html",
})
export class EditStudentComponent implements OnInit {
  constructor(
    private crudApi: StudentService,
    private fb: FormBuilder,
    public location: LocationService,
    private actRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  editForm: FormGroup

  ngOnInit() {
    this.updateStudentData()
    const id = this.actRoute.snapshot.paramMap.get("id")
    this.crudApi
      .GetStudent(id)
      .valueChanges()
      .subscribe((data) => {
        this.editForm.setValue(data)
      })
  }
  get firstName() {
    return this.editForm.get("firstName")
  }
  get lastName() {
    return this.editForm.get("lastName")
  }
  get email() {
    return this.editForm.get("email")
  }
  get mobileNumber() {
    return this.editForm.get("mobileNumber")
  }
  updateStudentData() {
    this.editForm = this.fb.group({
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

  updateForm() {
    this.crudApi.UpdateStudent(this.editForm.value)
    this.toastr.success(
      this.editForm.controls["firstName"].value + " modifié avec succès!",
    )
    this.router.navigate([ "view-students" ])
  }
}
