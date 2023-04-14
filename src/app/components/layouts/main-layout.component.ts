import { Component } from "@angular/core"
import { AuthService } from "../../shared/services/auth/auth.service"
import { faCalendarDays, faNewspaper, faUserTie, faUsers } from "@fortawesome/free-solid-svg-icons"

@Component({
  selector: "app-main-layout",
  templateUrl: "./main-layout.component.html",
})
export class MainLayoutComponent {
  constructor(public authService: AuthService) {}

  protected readonly faUsers = faUsers
  protected readonly faUserTie = faUserTie
  protected readonly faNewspaper = faNewspaper
  protected readonly faCalendarDays = faCalendarDays
}
