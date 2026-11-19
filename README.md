# **Employee Management System (EMS)**

A professional, modern, and responsive Employee Management System designed to streamline HR operations, employee records, attendance tracking, leave management, payroll processing, and workforce performance through a centralized Admin Dashboard.

| **Layer**         | **Technology**                            |
| ----------------- | ----------------------------------------- |
| Frontend          | HTML5, CSS3, Bootstrap 5, JavaScript ES6+ |
| UI Components     | Bootstrap 5                               |
| Icons             | Bootstrap Icons                           |
| Charts            | Chart.js                                  |
| Notifications     | SweetAlert2                               |
| Data Storage      | JavaScript LocalStorage                   |
| Architecture      | Frontend-Only Web Application             |
| Authentication    | JavaScript Demo Authentication            |
| Responsive Design | Bootstrap 5 Grid & Offcanvas              |

## **Key Features**

1. **Admin Authentication**
   - Admin login and logout.
   - Email and password validation.
   - Show/hide password.
   - Remember Me functionality.
   - Demo administrator credentials.
   - Session management.
   - Protected dashboard navigation.
2. **Dashboard & Analytics**
   - Total employees and active employees.
   - Inactive employee statistics.
   - Department-wise employee distribution.
   - Today's attendance overview.
   - Present, absent and leave statistics.
   - Pending leave requests.
   - Monthly payroll summary.
   - Employee performance overview.
   - Recent activities.
   - Upcoming employee birthdays.
   - Interactive Chart.js visualizations.
3. **Employee Management**
   - Add, view, edit and delete employees.
   - Unique employee ID generation.
   - Employee profile photo upload.
   - Personal and contact information.
   - Department and designation assignment.
   - Employment type and joining date.
   - Salary and employment status management.
   - Employee search and filtering.
   - Sorting and pagination.
   - Detailed employee profile.
4. **Department Management**
   - Create and manage departments.
   - Department ID generation.
   - Department descriptions.
   - Assign department managers.
   - Employee count tracking.
   - Department-wise employee listing.
   - Search and filtering.
   - Prevent deletion of departments with assigned employees.
5. **Attendance Management**
   - Daily employee attendance tracking.
   - Check-in and check-out recording.
   - Automatic working hours calculation.
   - Late arrival identification.
   - Present, Absent, Half-Day and On Leave status.
   - Daily and monthly attendance reports.
   - Employee attendance history.
   - Date and department filtering.
   - Duplicate attendance prevention.
   - Approved leave integration.
6. **Leave Management**
   - Employee leave applications.
   - Casual, Sick and Earned Leave.
   - Automatic leave duration calculation.
   - Approve and reject leave requests.
   - Pending application management.
   - Leave balance tracking.
   - Leave history.
   - Date and status filtering.
   - Automatic attendance updates for approved leave.
7. **Salary & Payroll Management**
   - Employee salary information.
   - Basic salary and HRA management.
   - Other allowances and overtime.
   - Salary deductions.
   - Automatic gross salary calculation.
   - Automatic net salary calculation.
   - Monthly payroll generation.
   - Pending, Processing and Paid status.
   - Payroll history.
   - Employee salary slip generation.
   - Print and Save as PDF functionality.
   - Duplicate monthly payroll prevention.
8. **Employee Performance Management**
   - Create and manage performance reviews.
   - Employee productivity scores.
   - Task completion percentage.
   - Monthly performance evaluation.
   - Overall performance ratings.
   - Performance remarks.
   - Employee performance history.
   - Compare employee performance.
   - Visual performance indicators.
9. **Reports & Analytics**
   - Employee reports.
   - Attendance reports.
   - Leave reports.
   - Salary reports.
   - Payroll reports.
   - Department reports.
   - Performance reports.
   - Custom date filtering.
   - Employee and department filtering.
   - Summary statistics.
   - CSV export.
   - Print and Save as PDF functionality.
10. **Admin Profile & Settings**
    - Admin profile management.
    - Update name and email.
    - Phone number and profile photo.
    - Change password.
    - Company information management.
    - Company logo and contact details.
    - Application preferences.
    - Reset demo data.
    - Clear application data.
    - Confirmation dialogs for destructive actions.

## **Theme & Color Palette**

| **Element** | **Color**               |
| ----------- | ----------------------- |
| Primary     | Blue `#2563EB`          |
| Sidebar     | Dark Slate `#111827`    |
| Secondary   | Slate `#64748B`         |
| Background  | Light Slate `#F8FAFC`   |
| Cards       | White `#FFFFFF`         |
| Text        | Dark Slate `#1E293B`    |
| Success     | Emerald Green `#10B981` |
| Danger      | Red `#EF4444`           |
| Warning     | Amber `#F59E0B`         |
| Border      | Light Gray `#E2E8F0`    |

## **Project Directory Structure**

```
EmployeeManagementSystem/
│
├── index.html
├── dashboard.html
├── employees.html
├── departments.html
├── attendance.html
├── leaves.html
├── payroll.html
├── performance.html
├── reports.html
├── settings.html
│
├── css/
│   ├── style.css
│   └── responsive.css
│
├── js/
│   ├── app.js
│   ├── auth.js
│   ├── dashboard.js
│   ├── employees.js
│   ├── departments.js
│   ├── attendance.js
│   ├── leaves.js
│   ├── payroll.js
│   ├── performance.js
│   ├── reports.js
│   └── settings.js
│
├── assets/
│   └── images/
│
└── README.md
```

## **System Requirements**

| **Requirement**  | **Version / Specification**    |
| ---------------- | ------------------------------ |
| Operating System | Windows 10/11                  |
| Code Editor      | Visual Studio Code             |
| Frontend         | HTML5, CSS3, JavaScript        |
| Framework        | Bootstrap 5                    |
| Browser          | Chrome, Edge, Firefox          |
| Storage          | Browser LocalStorage           |
| Server           | Live Server / Local Web Server |
| Internet         | Required for CDN libraries     |

## **Installation & Setup**

**Step 1 – Project Setup**

Create the project folder:

```
EmployeeManagementSystem/
```

Open the project folder in Visual Studio Code.

**Step 2 – Add Project Files**

Create the HTML, CSS, JavaScript and assets folders according to the project directory structure.

**Step 3 – Configure Dependencies**

Include the following libraries using CDN:

- Bootstrap 5
- Bootstrap Icons
- Chart.js
- SweetAlert2

**Step 4 – Initialize Demo Data**

Open the application for the first time.

The system should automatically initialize LocalStorage with:

- 10 sample employees.
- 5 sample departments.
- Attendance records.
- Leave applications.
- Salary details.
- Payroll records.
- Performance reviews.
- Admin demo account.

**Step 5 – Run Application**

Using VS Code Live Server, open:

```
http://127.0.0.1:5500/index.html
```

## **Default Admin Login**

| **Field**  | **Value**       |
| ---------- | --------------- |
| Email      | `admin@ems.com` |
| Password   | `admin123`      |
| Role       | Administrator   |
| Login Page | `index.html`    |

Frontend Demo Application

## **Testing Checklist**

- Admin login and logout.
- Dashboard statistics and charts.
- Employee CRUD operations.
- Department CRUD operations.
- Employee profile photo upload.
- Employee search and filtering.
- Attendance check-in and check-out.
- Working hours calculation.
- Duplicate attendance prevention.
- Leave application and approval.
- Approved leave attendance integration.
- Salary and payroll calculations.
- Duplicate payroll prevention.
- Salary slip generation and printing.
- Employee performance reviews.
- Reports and analytics.
- CSV export.
- LocalStorage data persistence.
- Reset demo data functionality.
- Desktop, tablet and mobile responsiveness.
- All navigation links and buttons.
- No JavaScript errors or broken layouts.

## **Data Management & Application Limitations**

- JavaScript LocalStorage for client-side data persistence.
- Separate storage keys for each application module.
- Automatic data saving and retrieval.
- Reusable CRUD functions.
- Unique ID generation.
- Cross-module employee data association.
- Dynamic dashboard statistics.
- Initial demo data generation.
- Reset and clear data functionality.

**Important:** This is a frontend-only demonstration project. LocalStorage is not a secure database and does not support multi-user synchronization. Do not use it to store confidential employee information or real payroll data.

## **Final Deliverables**

1. Complete Employee Management Website.
2. Admin Login and Authentication Interface.
3. Interactive Admin Dashboard.
4. Employee Management.
5. Department Management.
6. Attendance Management.
7. Leave Management.
8. Salary and Payroll Management.
9. Employee Performance Management.
10. Reports and Analytics.
11. Admin Profile and Settings.
12. Responsive Navigation System.
13. LocalStorage Integration.
14. Dynamic Charts and Statistics.
15. Search, Filters and Pagination.
16. CSV Export and Print Functionality.
17. Salary Slip Generation.
18. Initial Demo Data.
19. Reset Demo Data Functionality.
20. Complete Organized Source Code.

**Project:** Employee Management System (EMS)

**Category:** HR & Workforce Management

**Architecture:** Frontend-Only Web Application

**Copyright:** © 2026 EMS. All rights reserved.
