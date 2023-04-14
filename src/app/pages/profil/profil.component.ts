import { Component } from "@angular/core"
import { AuthService } from "../../shared/services/auth/auth.service"
@Component({
  selector: "app-profil",
  templateUrl: "./profil.component.html",
})
export class ProfilComponent {
  constructor(public authService: AuthService) {}
}
