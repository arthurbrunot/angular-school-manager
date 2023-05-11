import { PhoneNumberFormatPipe } from "./phone-number-format.pipe"

describe("PhoneNumberFormatPipe", () => {
  let pipe: PhoneNumberFormatPipe

  beforeEach(() => {
    pipe = new PhoneNumberFormatPipe()
  })

  it("should transform the phone number to the desired format", () => {
    const phoneNumber = "0102030405"
    const formattedNumber = pipe.transform(phoneNumber)
    expect(formattedNumber).toEqual("01 02 03 04 05")
  })

  it("should handle a phone number with non-digit characters", () => {
    const phoneNumber = "+1 (123) 456-7890"
    const formattedNumber = pipe.transform(phoneNumber)
    expect(formattedNumber).toEqual("11 23 45 67 89 0")
  })

  it("should handle an empty phone number", () => {
    const phoneNumber = ""
    const formattedNumber = pipe.transform(phoneNumber)
    expect(formattedNumber).toEqual("")
  })

  it("should handle null or undefined phone number", () => {
    let phoneNumber = null
    let formattedNumber = pipe.transform(phoneNumber)
    expect(formattedNumber).toEqual("")

    phoneNumber = undefined
    formattedNumber = pipe.transform(phoneNumber)
    expect(formattedNumber).toEqual("")
  })
})
