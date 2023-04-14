import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from "@angular/core"
import { CalendarOptions } from "@fullcalendar/core"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import { FullCalendarComponent } from "@fullcalendar/angular"
import frLocale from "@fullcalendar/core/locales/fr"
import { EventCreateModalComponent } from "./modal/event-modal.component"
import { NgbModal } from "@ng-bootstrap/ng-bootstrap"
import { CourseService } from "../../shared/services/crud/course.service"
import { Course, CourseEvent } from "../../shared/services/crud/types"
import * as moment from "moment"
import { CourseEventService } from "../../shared/services/crud/courseEvent.service"
import { EventEditModalComponent } from "./modal/event-modal-edit.component"

@Component({
  selector: "app-planning",
  templateUrl: "./planning.component.html",
})
export class PlanningComponent implements OnInit {
  @ViewChild("calendar") calendarContainer: ElementRef
  @ViewChild(FullCalendarComponent) fullCalendar: FullCalendarComponent
  CourseEvents: CourseEvent[]
  Courses: Course[]
  startDate: string
  endDate: string
  calendarEvents: any[] = []

  calendarOptions: CalendarOptions = {
    initialView: "timeGridWeek",
    height: "auto",
    hiddenDays: [ 0 ],
    select: this.handleCalendarSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    locale: frLocale,
    allDaySlot: false,
    selectable: true,
    slotDuration: "00:30:00",
    slotMinTime: "06:00:00",
    slotMaxTime: "21:00:00",
    selectConstraint: "businessHours",
    businessHours: {
      // all days from 8am to 7pm
      daysOfWeek: [ 1, 2, 3, 4, 5, 6 ],
      startTime: "08:00",
      endTime: "19:00",
    },
    plugins: [ timeGridPlugin, interactionPlugin ],
    events: [], // Initialize events as an empty array
  }

  constructor(
    private modalService: NgbModal,
    private courseEventService: CourseEventService,
    private courseService: CourseService,
  ) {}

  handleEventClick(info: any) {
    const event = info.event // Get the clicked event object
    const courseEvent: CourseEvent = {
      // Create a CourseEvent object with the selected event's data
      $key: event.extendedProps.id,
      courseId: event.extendedProps.courseId,
      courseName: event.title,
      startDate: event.start,
      endDate: event.end,
    }

    const modalRef = this.modalService.open(EventEditModalComponent)
    modalRef.componentInstance.courseEvent = courseEvent // Pass the selected event data to the modal component
  }

  handleCalendarSelect(info: any) {
    this.startDate = moment(info.start).format("YYYY-MM-DD HH:mm:ss")
    this.endDate = moment(info.end).format("YYYY-MM-DD HH:mm:ss")

    const modalRef = this.modalService.open(EventCreateModalComponent)
    modalRef.componentInstance.startDate = this.startDate
    modalRef.componentInstance.endDate = this.endDate
  }

  ngOnInit() {
    const courseEvents = this.courseEventService.GetCourseEventsList()
    courseEvents.snapshotChanges().subscribe(data => {
      this.CourseEvents = []
      this.calendarEvents = [] // Reset calendarEvents array

      data.forEach(item => {
        const a = item.payload.toJSON() as CourseEvent

        if (item.key != null) {
          a["$key"] = item.key
        }
        this.CourseEvents.push(a as CourseEvent)
        this.calendarEvents.push(this.courseEventToCalendarEvent(a))
      })

      // Set calendarEvents to the events property of calendarOptions
      this.calendarOptions.events = this.calendarEvents

      // Update the calendar to reflect the changes
      this.fullCalendar.getApi().refetchEvents()
    })

    const courses = this.courseService.GetCoursesList()
    courses.snapshotChanges().subscribe(data => {
      this.Courses = []
      data.forEach(item => {
        const a = item.payload.toJSON() as Course

        if (item.key != null) {
          a["$key"] = item.key
        }
        this.Courses.push(a as Course)
      })
    })

    this.calendarOptions.events = this.calendarEvents
  }

  courseEventToCalendarEvent(courseEvent: CourseEvent): any {
    return {
      title: courseEvent.courseName,
      start: courseEvent.startDate,
      end: courseEvent.endDate,
      color: "#3482F6",
      textColor: "#ffffff",
      extendedProps: {
        id: courseEvent.$key,
        courseId: courseEvent.courseId,
      },
    }
  }
}
