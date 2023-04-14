// create a location service that contains a goBack function that i can reuse in all my components
//
// Path: src\app\shared\services\location.service.ts

import { Injectable } from "@angular/core"
import { Location } from "@angular/common"

@Injectable({
  providedIn: "root",
})
export class LocationService {
  constructor(
    private location: Location,
  ) { }

  public goBack(): void {
    this.location.back()
  }
}
