import { Component } from "@angular/core"
import { AuthService } from "../../../shared/services/auth/auth.service"
@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
})
export class SignInComponent {
  constructor(
    public authService: AuthService,
  ) { }
}
