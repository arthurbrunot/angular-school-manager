import { Component, OnInit } from "@angular/core"
import { AuthService } from "../../shared/services/auth/auth.service"
import { faCalendarDays, faNewspaper, faUserTie, faUsers } from "@fortawesome/free-solid-svg-icons"

@Component({
  selector: "app-main-layout",
  templateUrl: "./main-layout.component.html",
})
export class MainLayoutComponent implements OnInit {
  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    console.log(this.authService)
  }

  protected readonly faUsers = faUsers
  protected readonly faUserTie = faUserTie
  protected readonly faNewspaper = faNewspaper
  protected readonly faCalendarDays = faCalendarDays
}
