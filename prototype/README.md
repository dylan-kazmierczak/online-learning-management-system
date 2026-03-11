# LMS Prototype

## Overview

This prototype demonstrates the core functionality of the Online Learning Management System (LMS) designed to support course delivery, student engagement, and academic progress tracking. The prototype focuses on essential user workflows and provides early visualization of key system interfaces.

**Status:** Design Prototype - Concept and UI Flow Validation  
**Date Created:** March 11, 2026  
**Focus:** Phase 1 MVP Features  

---

## Prototype Scope

This prototype demonstrates the following **Phase 1 MVP requirements** and **key user stories**:

| User Story | Prototype Pages | Status |
|------------|-----------------|--------|
| User Registration & Authentication | [Login & Registration](#login--registration) | ✓ |
| Student Course Enrollment | [Course Catalog](#course-catalog) | ✓ |
| Student Dashboard & Progress | [Student Dashboard](#student-dashboard) | ✓ |
| Course Content Access | [Course Content](#course-content-view) | ✓ |
| Assignment Submission | [Submit Assignment](#assignment-submission) | ✓ |
| Instructor Grading | [Grading Interface](#grading-interface) | ✓ |

---

## Prototype Pages

### Login & Registration
**File:** [index.html](index.html)

**Demonstrates:**
- User authentication (REQ-1, REQ-2)
- Role-based login (Student vs Instructor)
- Simple, secure form interface
- Form validation feedback

**User Flow:**
```
New User: Registration Form → Create Account → Login
Existing User: Login Form → Enter Credentials → Dashboard
```

**Features:**
- Email and password input fields
- Role selection (Student/Instructor)
- Form validation indicators
- "Forgot Password?" link
- Sign-up tab for new users

---

### Course Catalog
**File:** [course-catalog.html](course-catalog.html)

**Demonstrates:**
- Course browsing (REQ-4)
- Course enrollment interface (User Story 1)
- Course discovery and filtering
- Course information display (title, instructor, description)

**User Flow:**
```
Dashboard → Browse Courses → View Course Details → Enroll → Return to Dashboard
```

**Features:**
- Course listing with cards showing key information
- Search functionality
- Filter by category
- Enrollment status indicators
- Course details modal with description and instructor info
- "Enroll" action button

**Sample Data:**
- 8 sample courses with varied instructors and descriptions
- Mix of enrolled and available courses
- Different course categories (Web Development, Data Science, Business, Design)

---

### Student Dashboard
**File:** [student-dashboard.html](student-dashboard.html)

**Demonstrates:**
- Student progress tracking (REQ-4, User Story 4)
- Course overview with grades
- Upcoming assignments and deadlines
- Course navigation

**User Flow:**
```
Login → Dashboard → View Enrolled Courses → Track Progress → Access Course or Assignments
```

**Features:**
- Course cards showing:
  - Course title and code
  - Current grade (letter grade and percentage)
  - Progress bar showing completion percentage
  - Number of assignments completed/total
  - Link to access course content
- Upcoming assignments widget showing:
  - Assignment title
  - Due date
  - Days remaining
  - Quick submit link

**Sample Data:**
- 4 enrolled courses with varying progress levels (45%, 75%, 30%, 90%)
- Grades ranging from A to C
- Various assignment due dates (some upcoming, some past)
- Temporary grade and progress data

---

### Course Content View
**File:** [course-content.html](course-content.html)

**Demonstrates:**
- Course materials access (REQ-6, REQ-7)
- Hierarchical content organization
- Content navigation and download capability
- Course structure display

**User Flow:**
```
Dashboard → Select Course → View Content → Download Materials → View Assignments
```

**Features:**
- Course header with title, description, and instructor info
- Module list with collapsible lessons
- Content items showing:
  - Content type (PDF, Text, Video link, etc.)
  - Title and brief description
  - Download link for files
  - View/Access button for online content
- Assignment section with quick-access links
- Breadcrumb navigation for context

**Sample Data:**
- 3 modules (Introduction, Core Concepts, Advanced Topics)
- Mix of content types (PDFs, text descriptions, external links)
- Temporary file names and descriptions
- Sample assignments with due dates

---

### Assignment Submission
**File:** [submit-assignment.html](submit-assignment.html)

**Demonstrates:**
- Assignment submission interface (REQ-9, User Story 3)
- File upload capability
- Due date and late submission handling
- Submission confirmation

**User Flow:**
```
Dashboard → Course → Assignments → Select Assignment → Upload File → Submit → Confirmation
```

**Features:**
- Assignment details display:
  - Title, description, and due date
  - Rubric or scoring criteria
  - Submission deadline indicator
  - Late submission warning (if applicable)
- File upload interface:
  - Drag-and-drop file area
  - Browse button for file selection
  - Supported file types indicator
  - File size limits display
- Submission form with:
  - Pre-filled student information
  - Upload preview
  - Submit button
  - Cancel option

**Sample Data:**
- Single assignment (Programming Challenge: Calculator App)
- Assignment rubric with 4 criteria
- Due date: 5 days from now
- Temporary uploaded file name
- Late submission warning logic (displays if submitted after due date)

---

### Grading Interface
**File:** [grading-interface.html](grading-interface.html)

**Demonstrates:**
- Instructor grading workflow (REQ-10, REQ-12, User Story 5)
- Submission review interface
- Grade entry and feedback
- Gradebook management

**User Flow:**
```
Login (Instructor) → Course Management → Gradebook → Select Submission → Enter Grade & Comments → Save
```

**Features:**
- Submission details:
  - Student name and ID
  - Submission timestamp
  - Late indication
  - Downloaded file preview
- Grading form with:
  - Rubric scoring breakdown
  - Total points/percentage
  - Grade input field
  - Letter grade calculation
  - Multi-line comment/feedback area
  - Attach rubric feedback option
- Action buttons:
  - Save Grade
  - Previous Submission
  - Next Submission
  - Return to Gradebook

**Sample Data:**
- Student submission from "Alex Johnson"
- Assignment: "Programming Challenge: Calculator App"
- Temporary rubric with 4 criteria (each 25 points)
- Sample feedback comments
- Date/time submission (on-time)

---

## Design Principles

### Interface Philosophy
- **Clarity:** Clean layout with clear visual hierarchy
- **Simplicity:** Focus on essential functions without extraneous features
- **Consistency:** Uniform styling across all pages
- **Usability:** Intuitive navigation and clear calls-to-action

### Visual Elements
- **Color Scheme:**
  - Primary: Professional blue (#2c3e50)
  - Accent: Educational green (#27ae60)
  - Neutral: Light gray backgrounds (#f5f5f5)
  - Status: Green for success, red for alerts, orange for warnings

- **Typography:** Clean sans-serif fonts for readability
- **Spacing:** Generous whitespace for visual breathing room
- **Icons:** Simple, meaningful icons for quick recognition

---

## Navigation Structure

```
┌─────────────────────────────────────────┐
│         Login / Registration            │
│              (index.html)               │
└──────────────┬──────────────────────────┘
               │
      ┌────────┴────────┐
      │                 │
  Student            Instructor
  Flow               Flow
      │                 │
      ▼                 ▼
┌──────────────┐   ┌──────────────────┐
│ Dashboard    │   │ Course Mgmt      │
│ (dashboard)  │   │ (instructor-mgmt)│
└──┬───────────┘   └─────┬────────────┘
   │                     │
   ├─► Catalog      ├─► Gradebook ─► Grade Submission
   │   (catalog)    │    (gradebook)
   │                │
   ├─► Course      └─► Student List
   │   (content)
   │
   └─► Assignment
       (submit-assignment)
```

---

## Data Model (Prototype)

### Sample Data Structure

**Temporary User Accounts:**
```javascript
// Student Account
{
  email: "john.smith@university.edu",
  password: "password123", // Not actual - demo only
  role: "Student",
  name: "John Smith"
}

// Instructor Account
{
  email: "dr.jones@university.edu",
  password: "password123", // Not actual - demo only
  role: "Instructor",
  name: "Dr. Mary Jones"
}
```

**Sample Courses:**
- CS101: Introduction to Programming
- MATH201: Calculus II
- ENG102: Composition & Literature
- BUS301: Business Analytics
- DATA401: Machine Learning Fundamentals
- PHYS150: Physics I
- ART220: Digital Design
- PSY101: Introduction to Psychology

**Sample Grades:**
- Mock grades stored as JavaScript variables
- No persistent database (external data layer not required)
- Temporary values sufficient for concept validation

---

## Technical Notes

### Implementation Details

- **No Backend Required:** All pages are static HTML with inline CSS and JavaScript
- **No Database:** Data is hardcoded in JavaScript objects for demonstration
- **No External Dependencies:** Pure HTML5, CSS3, and JavaScript (no frameworks)
- **Client-Side Interaction:** Form submissions and navigation are simulated
- **Responsive Mockups:** Pages use flexible layouts (not mobile-optimized but functional)

### File Types Used
- **HTML5:** Semantic markup for all pages
- **CSS3:** Inline styles for clean, maintainable presentation
- **JavaScript (ES6):** Client-side interactivity and form handling
- **Mock JSON:** Data embedded in `<script>` tags

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- JavaScript enabled required
- No special plugins or extensions needed

---

## How to Use the Prototype

### Viewing the Prototype

1. Open **[index.html](index.html)** in a web browser
2. Use demo credentials:
   - **Student:** john.smith@university.edu / password123
   - **Instructor:** dr.jones@university.edu / password123
3. Navigate through the interface to explore different workflows

### Navigating the Prototype

- **From Login:** Select role and click "Login"
- **From Dashboard:** Click course cards or navigation links
- **From Course Catalog:** Browse courses and click "Enroll"
- **From Course Content:** Download materials or navigate to assignments
- **From Assignments:** Submit files and receive confirmation
- **From Grading:** Enter grades and submit feedback

### Testing the Flows

**Student Workflow:**
```
Login (Student) → Dashboard → Browse Courses → Enroll → View Content → 
Submit Assignment → View Grades → Track Progress
```

**Instructor Workflow:**
```
Login (Instructor) → Course Management → Gradebook → Review Submission → 
Enter Grade & Comments → Save
```

---

## Prototype Limitations

**Note:** This is a non-functional prototype focusing on interface design and user flow. The following are intentionally not included:

1. **No Backend Integration:** All data is mock/temporary
2. **No Database:** No persistent data storage
3. **No Authentication:** Login is simulated
4. **No File Handling:** File uploads are simulated
5. **No Email:** Notifications are not sent
6. **No Error Handling:** Edge cases and error states are minimal
7. **No Payment Processing:** Paid features not demonstrated

These features will be implemented in Phase 1 Development.

---

## Next Steps

### Phase 1 Development
This prototype will transition to a full-stack implementation including:
- Node.js/Express backend
- PostgreSQL database
- User authentication and session management
- Actual file upload and storage
- Email notifications
- API endpoints for all operations

### Feedback & Iteration
Prototype feedback is welcome for:
- UI/UX improvements
- Navigation flow suggestions
- Additional feature requirements
- Accessibility enhancements

---

## File Structure

```
prototype/
├── README.md                    # This file
├── index.html                   # Login & Registration
├── student-dashboard.html       # Student Dashboard
├── course-catalog.html          # Course Catalog & enrollment
├── course-content.html          # Course Materials View
├── submit-assignment.html       # Assignment Submission
└── grading-interface.html       # Instructor Grading Interface
```

---

## Contact

**Project:** Online Learning Management System (LMS)  
**Author:** Dylan Kazmierczak  
**Repository:** [github.com/dylan-kazmierczak/online-learning-management-system](https://github.com/dylan-kazmierczak/online-learning-management-system)  
**Date:** March 11, 2026  

---

## Notes for Reviewers

This prototype demonstrates the design vision and core workflows for the LMS. It serves as:
- ✓ A visual reference for stakeholders
- ✓ A basis for gathering user feedback
- ✓ A foundation for Phase 1 development
- ✓ A specification for required interfaces

The prototype intentionally prioritizes happy-path workflows and interface clarity over edge-case handling and sophisticated functionality, consistent with Agile prototyping best practices.
