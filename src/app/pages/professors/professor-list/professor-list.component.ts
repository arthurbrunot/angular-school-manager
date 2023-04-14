import { Component, OnInit } from "@angular/core"
import { ProfessorService } from "../../../shared/services/crud/professor.service"
import { Student } from "../../../shared/services/crud/types"
import { ToastrService } from "ngx-toastr"

@Component({
  selector: "app-professor-list",
  templateUrl: "./professor-list.component.html",
})
export class ProfessorListComponent implements OnInit {
  p: number = 1
  Professor: Student[]
  hideWhenNoProfessor: boolean = false
  noData: boolean = false
  preLoader: boolean = true

  constructor(
    public crudApi: ProfessorService,
    public toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.dataState()
    const s = this.crudApi.GetProfessorsList()
    s.snapshotChanges().subscribe(data => {
      this.Professor = []
      data.forEach(item => {
        const a = item.payload.toJSON() as Student

        if (item.key != null) {
          a["$key"] = item.key
        }
        this.Professor.push(a as Student)
      })
    })
  }
  dataState() {
    this.crudApi.GetProfessorsList().valueChanges().subscribe(data => {
      this.preLoader = false
      if (data.length <= 0) {
        this.hideWhenNoProfessor = false
        this.noData = true
      } else {
        this.hideWhenNoProfessor = true
        this.noData = false
      }
    })
  }
  deleteProfessor(professor: Student) {
    if (window.confirm("Are sure you want to delete this professor ?")) {
      this.crudApi.DeleteProfessor(professor.$key)
      this.toastr.success(professor.firstName + " successfully deleted!")
    }
  }
}
