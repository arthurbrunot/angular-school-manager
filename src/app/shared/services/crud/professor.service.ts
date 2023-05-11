import { Injectable } from "@angular/core"
import { Professor } from "../../types/types"
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from "@angular/fire/compat/database"

@Injectable({
  providedIn: "root",
})
export class ProfessorService {
  professorsRef: AngularFireList<any>
  professorRef: AngularFireObject<any>

  constructor(private db: AngularFireDatabase) {}

  // Create Professor
  AddProfessor(professor: Professor) {
    this.professorsRef.push({
      email: professor.email,
      firstName: professor.firstName,
      lastName: professor.lastName,
      mobileNumber: professor.mobileNumber,
    })
  }

  // Fetch Single Professor Object
  GetProfessor(id: string | null) {
    this.professorRef = this.db.object("professors-list/" + id)
    return this.professorRef
  }

  // Fetch Professors List
  GetProfessorsList() {
    this.professorsRef = this.db.list("professors-list")
    return this.professorsRef
  }

  // Update Professor Object
  UpdateProfessor(professor: Professor) {
    this.professorRef.update({
      email: professor.email,
      firstName: professor.firstName,
      lastName: professor.lastName,
      mobileNumber: professor.mobileNumber,
    })
  }

  // Delete Professor Object
  DeleteProfessor(id: string) {
    this.professorRef = this.db.object("professors-list/" + id)
    this.professorRef.remove()
  }
}
