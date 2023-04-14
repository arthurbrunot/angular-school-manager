export interface Student {
  $key: string,
  firstName: string,
  lastName: string,
  email: string,
  mobileNumber: number,
}

export interface Professor {
  $key: string,
  firstName: string,
  lastName: string,
  email: string,
  mobileNumber: number,
}

export interface Course {
  $key: string,
  name: string,
  professorId: string,
}

export interface CourseEvent {
  $key: string,
  courseId: string,
  courseName: string,
  startDate: string,
  endDate: string,
}

export interface User {
  uid: string,
  email: string,
  displayName: string,
  photoURL: string,
  emailVerified: boolean,
}
