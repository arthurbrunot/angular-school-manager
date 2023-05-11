# School Manager Angular App

This is a school manager application built with Angular 15. It includes features such as a dashboard, students management, courses management, professors management, and planning.

Live version of this project is available at this url: https://angular-school-manager-otb2ww5ye-arthurbrunot.vercel.app/

You can use demo account for testing purpose
- username: kedayat973@ippals.com
- password: demo-password

## Student informations

- Name: Arthur BRUNOT
- Class: M2 IW
- Skills on Angular : First time, never used it

## Getting Started

To run this application locally, follow the steps below:

### Prerequisites

You need to have the following software installed on your system:

- Node.js (v16 or higher, 18 recommenced)
- npm (v7 or higher, v9 recommended)

### Installation

1. Clone the repository to your local machine.
2. Navigate to the root directory of the project in your terminal.
3. Run `pnpm install` to install the dependencies. You can use another package manager like npm and yarn.

### Development Server

Run `ng serve` for a dev server. Navigate to http://localhost:4200/ in your web browser to access the application.

## Build

Run `ng build` to build the application. The build artifacts will be stored in the `dist/` directory.

## Features

This school manager application includes the following features:

- Dashboard: Provides an overview of important information related to the school, such as student count, course count, professor count, and upcoming events from the planning.
- Students Management: Allows users to view, add, edit, and delete students.
- Courses Management: Allows users to view, add, edit, and delete courses.
- Professors Management: Allows users to view, add, edit, and delete professors.
- Planning: Displays a calendar view of upcoming courses.

## Features

- [x] Construire un simple CRUD (Create, Read, Update, Delete), utilisez les formulaires, les events du DOM...
- [x] Utiliser le routeur Angular et des routes protégées (Guard)
- [x] Utiliser l'injection de dépendances afin d'optimiser votre code
- [x] Utiliser les pipes à bon escient et créer un pipe custom
- [x] Utiliser un backend as a service, un fake backend
- [x] Utiliser des formulaires 
- [x] Mettre en place un systeme de login
- [x] S'Appliquer avec le CSS!
- [x] Eviter le code mort
- [x] A l'aide du support fourni, mettre en place un type de test et expliquez son intérêt dans le contexte de votre application
- [x] S'Assurer d'utiliser toutes les fonctionnalitées présentées en cours.


- Les composants réutilisables se trouvent dans le dossier components. Comme on utilise tailwind pour les boutons et autres éléments standards, on a uniquement un composant de layout.
- Les services se trouvent dans le dossier shares. On a un service pour chaque entité (student, course, professor, event) et un service pour l'authentification ( qui contient aussi le guard ).
- Le dossier pages contient les composants qui sont utilisés dans les routes. On a un composant pour chaque page (dashboard, students, courses, professors, planning, login, register). Chaque dossier contient une fonctionnalités principale de l'application pour retrouver facilement.
- Les types se trouvent dans le dossier shared/types.

## Technologies Used

This application is built using the following technologies:

- Angular 15: A popular JavaScript framework for building web applications.
- TypeScript: A superset of JavaScript that provides optional static typing and other features for building scalable applications.
- Firebase: A cloud-based backend-as-a-service (BaaS) platform for building serverless applications.
- ESLint: A widely used tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
- FullCalendar: A popular JavaScript library for displaying and managing calendars in web applications.
- Tailwind CSS: A utility-first CSS framework for building modern and responsive user interfaces.
- ngx-pagination: A pagination library for Angular applications.
- ngx-toastr: A notifications library for Angular applications.

## Contributing

If you would like to contribute to this project, feel free to open an issue or submit a pull request. Contributions are always welcome!

## License

This project is licensed under the MIT License. See the LICENSE file for more information.

## Contact

If you have any questions or feedback, please feel free to contact the project owner.

