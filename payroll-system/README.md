# Payroll System

## Overview
The Payroll System is a Vue.js application designed to manage employee payroll, including salary calculations, shift management, and digital salary slips. The application allows administrators to input salary details, manage employee shifts, and generate downloadable salary slips in PDF format.

## Features
- **Employee Dashboard**: View and filter employee details including name, position, shift, and salary.
- **Salary Management**: Input salary components such as base salary, overtime, bonuses, and deductions. Automatically calculate total salary.
- **Digital Salary Slips**: Generate and download salary slips for individual employees in PDF format.
- **Shift Management**: Manage employee shifts, including working hours and days. Assign employees to specific shifts.

## Project Structure
```
payroll-system
├── public
│   ├── favicon.ico
│   └── index.html
├── src
│   ├── assets
│   │   └── logo.svg
│   ├── components
│   │   ├── common
│   │   │   ├── AppHeader.vue
│   │   │   ├── AppSidebar.vue
│   │   │   └── AppFooter.vue
│   │   ├── dashboard
│   │   │   ├── EmployeeList.vue
│   │   │   └── EmployeeFilter.vue
│   │   ├── payroll
│   │   │   ├── SalaryForm.vue
│   │   │   └── PayrollPeriodSelector.vue
│   │   ├── slips
│   │   │   ├── SalarySlip.vue
│   │   │   └── SalarySlipDownloader.vue
│   │   └── shifts
│   │       ├── ShiftList.vue
│   │       └── ShiftAssignment.vue
│   ├── views
│   │   ├── DashboardView.vue
│   │   ├── PayrollManagementView.vue
│   │   ├── SalarySlipsView.vue
│   │   └── ShiftManagementView.vue
│   ├── router
│   │   └── index.js
│   ├── store
│   │   ├── index.js
│   │   └── modules
│   │       ├── employees.js
│   │       ├── payroll.js
│   │       ├── salarySlips.js
│   │       └── shifts.js
│   ├── services
│   │   ├── api.js
│   │   ├── employeeService.js
│   │   ├── payrollService.js
│   │   ├── pdfService.js
│   │   └── shiftService.js
│   ├── utils
│   │   ├── dateFormatter.js
│   │   └── currencyFormatter.js
│   ├── App.vue
│   └── main.js
├── .eslintrc.js
├── .gitignore
├── index.js
├── package.json
├── README.md
└── vite.config.js
```

## Getting Started
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd payroll-system
   ```
3. Install the dependencies:
   ```
   npm install
   ```
4. Start the development server:
   ```
   npm run dev
   ```

## Technologies Used
- Vue.js
- Vite
- Vuex for state management
- Axios for API calls
- jsPDF for PDF generation

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.