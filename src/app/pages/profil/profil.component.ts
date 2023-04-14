import { Component, OnInit } from "@angular/core"
import { AuthService } from "../../shared/services/auth/auth.service"
@Component({
  selector: "app-profil",
  templateUrl: "./profil.component.html",
})
export class ProfilComponent implements OnInit {
  constructor(public authService: AuthService) {}
  ngOnInit(): void {
    console.log("ProfilComponent.ngOnInit()")
  }
}
