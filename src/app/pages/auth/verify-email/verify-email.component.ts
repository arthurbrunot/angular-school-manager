import { Component } from "@angular/core"
import { AuthService } from "../../../shared/services/auth/auth.service"
@Component({
  selector: "app-verify-email",
  templateUrl: "./verify-email.component.html",
})
export class VerifyEmailComponent {
  constructor(
    public authService: AuthService,
  ) { }
}
