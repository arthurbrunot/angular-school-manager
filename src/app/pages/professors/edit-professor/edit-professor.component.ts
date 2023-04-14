import { Component, OnInit } from "@angular/core"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { ProfessorService } from "../../../shared/services/crud/professor.service"
import { ActivatedRoute, Router } from "@angular/router"
import { ToastrService } from "ngx-toastr"
import { LocationService } from "../../../shared/services/navigation/location.service"
@Component({
  selector: "app-edit-professor",
  templateUrl: "./edit-professor.component.html",
})
export class EditProfessorComponent implements OnInit {
  constructor(
    private crudApi: ProfessorService,
    private fb: FormBuilder,
    public location: LocationService,
    private actRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  editForm: FormGroup

  ngOnInit() {
    this.updateProfessorData()
    const id = this.actRoute.snapshot.paramMap.get("id")
    this.crudApi
      .GetProfessor(id)
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
  updateProfessorData() {
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
    this.crudApi.UpdateProfessor(this.editForm.value)
    this.toastr.success(
      this.editForm.controls["firstName"].value + " modifié avec succès!",
    )
    this.router.navigate([ "view-professors" ])
  }
}
