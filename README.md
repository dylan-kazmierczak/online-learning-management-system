# Online Learning Management System (LMS)

An integrated digital platform designed to support course delivery, student engagement, and academic progress tracking. This system enables instructors to create and manage courses while providing students with a centralized hub to enroll, access content, submit assignments, and monitor their academic progress.

**Author:** Dylan Kazmierczak  
**Date:** January 27, 2026  
**Technology Stack:** Node.js, Express.js, Handlebars, PostgreSQL/MySQL, RESTful API

---

## Table of Contents

- [Overview](#overview)
- [System Architecture](#system-architecture)
- [Wireframes](#wireframes)
- [User Stories](#user-stories)
- [Use Cases](#use-cases)
- [Use Case Diagram](#use-case-diagram)
- [Installation](#installation)
- [Features](#features)
- [Contributing](#contributing)

---

## Overview

### Purpose

The Online Learning Management System (LMS) is designed to provide a centralized platform where instructors can create and manage courses while students can enroll, complete coursework, and monitor their academic progress. The system streamlines common educational workflows, reduces administrative overhead, and improves accessibility to learning materials.

### Key Benefits

- **For Instructors:** Create and manage courses, upload learning materials, design quizzes/assignments, and review student performance
- **For Students:** Enroll in courses, access content, submit assignments, and view grades
- **For Institution:** Centralized data management, progress analytics, and scalable infrastructure

### Scope

**In Scope:**
- User authentication and role-based access
- Course creation and management
- Content delivery (documents, videos, links)
- Assignment and quiz management
- Submission tracking and grading
- Progress reporting

**Out of Scope (Future Enhancements):**
- Advanced learning analytics
- Third-party integrations
- Mobile application
- Video streaming infrastructure
- Virtual classroom features

---

## Quick Start

To get started with the LMS design documentation:

1. **View the Design:** Review the [Wireframes](#wireframes) section to see the user interface mockups
2. **Understand Requirements:** Check [User Stories](#user-stories) for feature descriptions and acceptance criteria
3. **Learn the Workflows:** See [Use Cases](#use-cases) for detailed interaction flows
4. **Review Architecture:** Explore [System Architecture](#system-architecture) for the technical design
5. **Dive Deeper:** Read the [Complete Design Document](documents/DESIGN_DOCUMENT.md) for specifications and technical details

For implementation setup, see the [Installation](#installation) section.

---

## System Architecture

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     USER INTERFACE LAYER                    │
│  (HTML/Handlebars Templates, CSS, JavaScript)               │
└────────────────────────────┬────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                    APPLICATION LAYER                        │
│  (Express.js Routes, Controllers, Business Logic)           │
├─────────────────────────────────────────────────────────────┤
│  ├─ Authentication Module                                   │
│  ├─ Course Management Module                                │
│  ├─ Content Delivery Module                                 │
│  ├─ Assignment Module                                       │
│  ├─ Grading Module                                          │
│  └─ User Management Module                                  │
└────────────────────────────┬────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                    DATA ACCESS LAYER                        │
│  (API Routes, Data Validation, RESTful Endpoints)           │
└────────────────────────────┬────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                    DATABASE LAYER                           │
│  (PostgreSQL/MySQL - Users, Courses, Enrollments,           │
│   Assignments, Submissions, Grades)                         │
└─────────────────────────────────────────────────────────────┘
```

### Component Description

| Component | Description | Technology |
|-----------|-------------|-----------|
| **Presentation Layer** | User-facing web interface with responsive design | Handlebars, CSS, Bootstrap |
| **Application Layer** | Business logic, route handlers, authentication | Express.js, Node.js |
| **API Layer** | RESTful API endpoints for CRUD operations | Express.js, JSON |
| **Database Layer** | Persistent data storage | PostgreSQL/MySQL |

---

## Wireframes

### Wireframe Sketches

Below is the wireframe sketch showing the key user workflows and interface layouts for student and instructor experiences.

![LMS Wireframes](public/assets/lms_wireframes.jpg)

The wireframes include:
- **Student Dashboard** - Overview of enrolled courses, upcoming assignments, and grade summary
- **Course Content View** - Navigation structure and lesson/module display
- **Instructor Course Management** - Course management and student grading interface
- **Course Catalog** - Browse and search available courses
- **Assignment Submission** - Student assignment upload and submission workflow

**Navigation Flow:**
```
Login → Dashboard → Browse Courses → Enroll → View Content → 
Submit Assignments → View Grades → Track Progress
```

**Key Interface Elements:**
- Top navigation bar with user profile and logout
- Sidebar navigation for course modules and lessons
- Content area with dynamic course/assignment displays
- Progress indicators and status tracking
- Action buttons for common tasks (submit, grade, enroll)
- Responsive layout for different screen sizes

---

## User Stories

### User Story 1: Student Course Enrollment
**As a** student  
**I want to** browse available courses and enroll in ones that match my interests  
**So that** I can build my course schedule and begin learning

**Acceptance Criteria:**
- Student can view a catalog of all available courses
- Courses display title, description, instructor name, and enrollment status
- Student can click "Enroll" to register for a course
- Enrollment is confirmed with a notification and the course appears in "My Courses"

---

### User Story 2: Instructor Content Upload
**As an** instructor  
**I want to** upload course content (documents, videos, links) to my course modules  
**So that** students have access to structured learning materials

**Acceptance Criteria:**
- Instructor can create course modules with titles and descriptions
- Multiple file types can be uploaded (PDF, MP4, PPT, etc.)
- Content is organized hierarchically (Course → Module → Lesson)
- Instructor can preview content before publishing
- Students can download or stream content

---

### User Story 3: Assignment Submission and Grading
**As a** student  
**I want to** submit assignments and receive timely feedback from my instructor  
**So that** I can understand my progress and improve my work

**Acceptance Criteria:**
- Student can view assignment details, requirements, and due dates
- Student can upload assignment files or submit text-based responses
- System timestamps submissions and warns of late submissions
- Instructor can download submissions, add comments, and assign grades
- Student receives notification when grade is posted

---

### User Story 4: Progress Tracking and Grading View
**As a** student  
**I want to** view my grades and overall progress in all my courses  
**So that** I can monitor my academic performance and identify areas needing improvement

**Acceptance Criteria:**
- Student dashboard displays a summary of enrolled courses with progress bars
- Student can view detailed grades for all assignments, quizzes, and exams
- Grade breakdown shows weights and calculations
- Student can track completion percentage of course modules
- GPA calculation is displayed if configured by institution

---

### User Story 5: Quiz and Assessment Creation
**As an** instructor  
**I want to** create and configure quizzes with various question types  
**So that** I can assess student understanding of course material

**Acceptance Criteria:**
- Instructor can create quizzes with multiple question types (multiple choice, short answer, essay)
- Quiz settings allow configuration of time limits, passing scores, and retake policies
- Questions can include images and formatted text
- Quizzes are automatically graded (where applicable) with instant feedback
- Results are recorded in the gradebook

---

### User Story 6: User Authentication and Registration
**As a** new user  
**I want to** register for an account with the LMS using my email  
**So that** I can securely access the platform as either a student or instructor

**Acceptance Criteria:**
- Registration page accepts email, password, name, and role selection
- Email validation ensures unique accounts and valid email format
- Password strength requirements are enforced
- Account activation via email confirmation is required
- Login with email and password is secure and fast
- Password reset functionality is available

---

## Use Cases

### Use Case 1: Student Enrolls in a Course

**Actor:** Student  
**Preconditions:** Student is logged in, course exists in catalog  
**Main Flow:**
1. Student navigates to Course Catalog
2. System displays list of available courses with descriptions
3. Student searches or filters courses by category/keyword
4. Student clicks on desired course to view details
5. Student clicks "Enroll" button
6. System validates enrollment eligibility
7. System adds course to student's course list
8. System sends confirmation notification to student
9. Student is redirected to course dashboard

**Postconditions:** Student is enrolled in the course and can access all course materials  
**Alternate Flow (3a - Course Closed):** If course is at capacity, system displays waitlist option

---

### Use Case 2: Instructor Creates and Publishes Course Content

**Actor:** Instructor  
**Preconditions:** Instructor is logged in, course is created  
**Main Flow:**
1. Instructor navigates to Course Management
2. Instructor selects course to edit
3. Instructor creates new module with title and description
4. Instructor adds lessons to module
5. Instructor uploads content file (PDF, video, etc.)
6. Instructor writes lesson description and sets learning objectives
7. Instructor reviews content in preview mode
8. Instructor publishes module
9. System notifies enrolled students of new content
10. Students can access content immediately

**Postconditions:** Course content is live and visible to enrolled students  
**Error Handling:** If file upload fails, system displays error and allows retry

---

### Use Case 3: Student Submits Assignment

**Actor:** Student  
**Preconditions:** Student is enrolled in course, assignment is open  
**Main Flow:**
1. Student navigates to course assignments
2. System displays list of assignments with due dates
3. Student clicks on assignment to view details and rubric
4. Student reviews assignment requirements and instructions
5. Student uploads assignment file or enters response text
6. System validates file type and size
7. Student clicks Submit
8. System timestamps submission and confirms receipt
9. Student receives confirmation email
10. Submission is sent to instructor gradebook queue

**Postconditions:** Assignment is submitted and visible to instructor  
**Alternate Flow (3a - Late Submission):** If submission is after due date, system flags as late

---

### Use Case 4: Instructor Grades Assignment and Provides Feedback

**Actor:** Instructor  
**Preconditions:** Student has submitted assignment  
**Main Flow:**
1. Instructor navigates to gradebook for course
2. System displays list of pending submissions
3. Instructor clicks on student submission to open grader interface
4. Instructor downloads submitted file
5. Instructor reviews submission and evaluates against rubric
6. Instructor enters grade/score and written feedback comments
7. Instructor attaches rubric feedback (if using)
8. Instructor submits grade
9. System saves grade and sends notification to student
10. Student can immediately view grade and feedback

**Postconditions:** Grade is recorded in gradebook and student is notified  
**Error Handling:** If submission contains virus, system quarantines and alerts instructor

---

### Use Case 5: Student Views Progress Report

**Actor:** Student  
**Preconditions:** Student is logged in and enrolled in at least one course  
**Main Flow:**
1. Student navigates to dashboard
2. System displays enrolled courses with progress bars (% complete)
3. Student clicks on course to view detailed progress
4. System displays module completion status
5. Student views assignment and quiz grades
6. System calculates and displays current course grade
7. System displays grade distribution (A: 5, B: 2, C: 1, etc.)
8. Student can export progress report as PDF
9. Student can share progress with advisor/parent (if enabled)

**Postconditions:** Student has visibility into academic progress  
**Alternative:** Student can filter progress by course, assignment type, or date range

---

### Use Case 6: Student Takes a Quiz

**Actor:** Student  
**Preconditions:** Student is enrolled in course, quiz is available  
**Main Flow:**
1. Student navigates to course quizzes section
2. System displays list of available quizzes with instructions
3. Student clicks "Start Quiz"
4. System verifies student eligibility (prerequisites, attempts remaining)
5. System starts timer if time limit is configured
6. System displays questions one at a time or all at once
7. Student answers questions (multiple choice, short answer, etc.)
8. Student can review and edit answers before submission
9. Student clicks "Submit Quiz"
10. System grades quiz and calculates score
11. Student receives feedback based on quiz settings
12. Grade is recorded in gradebook

**Postconditions:** Quiz is submitted, graded, and recorded  
**Alternate Flow (5a - Timeout):** If time expires, system auto-submits quiz

---

## Use Case Diagram

```
                        ┌─────────────────────────────────┐
                        │   ONLINE LEARNING MANAGEMENT    │
                        │         SYSTEM (LMS)            │
                        └─────────────────────────────────┘
                                      │
                    ┌─────────────────┼─────────────────┐
                    │                 │                 │
              ●─────┴─────●     ●─────┴─────●     ●─────┴─────●
           STUDENT       │   INSTRUCTOR     │   ADMINISTRATOR  │
              │          │       │          │        │         │
              │          │       │          │        │         │
              ├──────────┤       ├──────────┤        ├─────────┤
              │          │       │          │        │         │
      ◇─────────────────────────────────────────────────────┐  │
      │  Enroll in Course       │     │                      │  │
      ◇  (includes)            │     │     Create Course     │  │
      │                         │     ├────────────────────┐ │  │
      │  Access Course Content  │     │                    │ │  │
      ◇  (includes)            │     │     Manage Content  │ │  │
      │                         │     ├────────────────────┐ │  │
      │  Submit Assignment      │     │                    │ │  │
      ◇  (includes)            │     │     Grade Student   │ │  │
      │                         │     ├────────────────────┐ │  │
      │  Take Quiz              │     │                    │ │  │
      ◇  (includes)            │     │  Track Progress    │ │  │
      │                         │     └────────────────────┘ │  │
      │  View Grades            │                            │  │
      ◇  (includes)            │                            │  │
      │                         │                            │  │
      └─────────────────────────────────────────────────────┘  │
              │          │       │          │        │         │
              │          │       │          │        │         │
              └──────────┤       └──────────┤        └─────────┘
                         │                  │
                    ●────┴────●        ●────┴────●
                 DATABASE          AUTHENTICATION
                  SYSTEM              SYSTEM

Legend:
  ◇ = Use Case
  ● = Actor
  ─ = Association
  ├ = Includes/Extends
```

---

## Installation

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)
- PostgreSQL or MySQL database
- Git

### Setup Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/online-learning-management-system.git
   cd online-learning-management-system
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   ```bash
   cp config/.env.example config/.env.dev
   cp config/.env.example config/.env.prod
   ```
   Edit the `.env` files with your database credentials and configuration.

4. **Initialize database:**
   ```bash
   npm run db:setup
   ```

5. **Start the server:**
   ```bash
   npm run dev  # Development mode with nodemon
   npm start    # Production mode
   ```

6. **Access the application:**
   Open your browser and navigate to `http://localhost:3000`

---

## Features

- ✅ User authentication with role-based access control
- ✅ Course creation and management
- ✅ Dynamic content delivery (videos, documents, links)
- ✅ Assignment upload and submission tracking
- ✅ Quiz and assessment tools
- ✅ Automated and manual grading
- ✅ Student progress tracking and reporting
- ✅ Email notifications
- ✅ Responsive design for desktop and tablet
- ✅ Winston logging and error handling

---

## Project Structure

```
online-learning-management-system/
├── app.js                          # Main server file
├── package.json                    # Dependencies and scripts
├── config/                         # Environment configurations
│   ├── .env.dev                    # Development environment
│   └── .env.prod                   # Production environment
├── src/
│   ├── controllers/                # Business logic
│   ├── routes/                     # API endpoints
│   │   ├── index.js
│   │   └── example.js
│   └── utils/                      # Helper functions
│       ├── axios_helper.js
│       ├── general_helper.js
│       ├── pipedrive_helper.js
│       └── winston_helper.js
├── public/                         # Static assets
│   ├── assets/
│   ├── css/
│   │   └── default.css
│   ├── js/
│   └── pages/
│       └── layouts/
│           └── default.hbs
├── views/                          # Handlebars templates
│   └── partials/
└── README.md                       # This file
```

---

## Design Documentation

For comprehensive technical specifications and detailed documentation, see:

- **[Complete Design Document](documents/DESIGN_DOCUMENT.md)** - Full technical specification including data model, API endpoints, security requirements, and implementation phases

---

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Create a feature branch (`git checkout -b feature/YourFeature`)
2. Commit your changes (`git commit -m 'Add YourFeature'`)
3. Push to the branch (`git push origin feature/YourFeature`)
4. Open a Pull Request

---

## License

This project is licensed under the ISC License - see the LICENSE file for details.

---

## Contact

**Author:** Dylan Kazmierczak  
**Email:** dylan.kazmierczak@yahoo.com  
**GitHub:** https://github.com/dylan-kazmierczak

---

**Last Updated:** January 27, 2026
