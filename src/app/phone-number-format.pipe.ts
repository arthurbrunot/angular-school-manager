import { Pipe, PipeTransform } from "@angular/core"

@Pipe({
  name: "phoneNumberFormat",
})
export class PhoneNumberFormatPipe implements PipeTransform {
  transform(value: string): string {
    // Remove any non-digit characters from the input value
    const digitsOnly = value.replace(/\D/g, "")

    // Split the digits into groups of two
    const groups = digitsOnly.match(/.{1,2}/g)

    // Join the groups with spaces between them
    return groups ? groups.join(" ") : ""
  }
}
