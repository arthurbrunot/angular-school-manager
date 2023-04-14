import { Component } from "@angular/core"
import { AuthService } from "../../../shared/services/auth/auth.service"
@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
})
export class ForgotPasswordComponent {
  constructor(
    public authService: AuthService,
  ) { }
}
