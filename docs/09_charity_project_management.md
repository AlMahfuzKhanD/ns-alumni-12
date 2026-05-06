# Alumni Association of NS - 12
## 09 — Charity Project & Donation Management System Design

---

# 1. Purpose

This document defines the complete Charity Project & Donation Management architecture for the Alumni Association of NS - 12 platform.

This module is one of the most important parts of the system because it handles:

- Community charity activities
- Fundraising campaigns
- Medical support
- Teacher support
- Emergency help
- Donation transparency
- Public trust

---

# 2. Module Objectives

The Charity Project module should:

- Manage fundraising campaigns
- Track donations
- Manage beneficiaries
- Maintain financial transparency
- Track project expenses
- Display public project progress
- Build trust among alumni members

---

# 3. Charity Project Philosophy

This system is NOT only donation collection.

It must ensure:

- Transparency
- Accountability
- Traceability
- Emotional trust
- Public visibility
- Financial integrity

---

# 4. Core Project Types

## Recommended Project Types

```text
Medical Support
Teacher Support
Emergency Relief
Educational Support
Community Welfare
Funeral Support
Disaster Relief
Scholarship Support
Special Fundraising
```

---

# 5. Beneficiary Types

## Recommended Beneficiary Types

```text
Teacher
Member
Non-Member
Institution
Community Group
```

---

# 6. Charity Project Lifecycle

## Project Lifecycle Flow

```text
Project Proposal
   ↓
Committee Review
   ↓
Approval
   ↓
Public Publishing
   ↓
Donation Collection
   ↓
Expense Management
   ↓
Completion Report
   ↓
Archive
```

---

# 7. Charity Project Structure

Each project should contain:

| Field | Purpose |
|---|---|
| Project Title | Main title |
| Project Code | Unique identifier |
| Beneficiary Name | Recipient |
| Beneficiary Type | Teacher/member/etc |
| Beneficiary Image | Public transparency |
| Target Amount | Fundraising target |
| Collected Amount | Donation summary |
| Expense Amount | Expense tracking |
| Description | Full details |
| Status | Current state |
| Start Date | Launch date |
| End Date | Optional end |

---

# 8. Project Status System

## Recommended Statuses

```text
draft
pending_approval
running
completed
cancelled
archived
```

---

## Status Behavior

| Status | Public Visibility |
|---|---|
| Draft | NO |
| Pending Approval | NO |
| Running | YES |
| Completed | YES |
| Cancelled | Optional |
| Archived | Historical View |

---

# 9. Project Approval Workflow

## Approval Flow

```text
Committee Creates Project
   ↓
Admin Review
   ↓
Approval
   ↓
Public Publish
```

---

## Possible Review Points

- Authenticity
- Financial legitimacy
- Beneficiary verification
- Supporting documents
- Project necessity

---

# 10. Beneficiary Management

Each project may contain:

- Beneficiary name
- Beneficiary image
- Medical documents
- Supporting reports
- Story/details
- Contact information (optional)

---

# 11. Beneficiary Image Rules

## Image Rules

| Rule | Value |
|---|---|
| Allowed Types | jpg/png/webp |
| Max Size | 5MB |
| Compression | Recommended |
| Visibility | Controlled |

---

## Important Principle

Beneficiary presentation must remain:

- Respectful
- Human-centered
- Ethical

---

# 12. Project Gallery System

Projects may contain:

- Fundraising images
- Event images
- Donation handover images
- Medical progress images
- Final report images

---

## Gallery Features

- Multiple upload
- Preview support
- Lightbox viewing
- Mobile responsive

---

# 13. Donation Collection Workflow

## Donation Flow

```text
Donor Selects Project
   ↓
Donation Submission
   ↓
Payment Verification
   ↓
Donation Approval
   ↓
Financial Transaction Creation
   ↓
Project Total Update
```

---

# 14. Donation Sources

Donations may come from:

- Alumni members
- External donors
- Sponsors
- Community supporters

---

# 15. Donation Information Structure

Each donation should contain:

| Field | Purpose |
|---|---|
| Project | Related project |
| Donor Name | Contributor |
| Donor Member | Alumni reference |
| Amount | Donation value |
| Payment Method | Collection source |
| Transaction Number | Reference |
| Donation Date | Timestamp |
| Remarks | Optional note |

---

# 16. Donation Visibility Rules

Donor visibility options:

```text
Public Name
Anonymous
Members Only
```

---

# 17. Supported Payment Methods

## Initial Methods

```text
Cash
bKash
Nagad
Bank Transfer
```

---

## Future Methods

```text
Online Gateway
SSLCommerz
Card Payment
QR Payment
```

---

# 18. Financial Transparency System

This is one of the MOST important features.

Each project should publicly show:

- Target amount
- Collected amount
- Expense amount
- Remaining balance
- Donation count
- Expense summary

---

# 19. Expense Management

Projects may contain expenses.

Examples:

- Medical payments
- Transportation
- Emergency purchases
- Administrative support

---

## Expense Requirements

Each expense should contain:

| Field | Purpose |
|---|---|
| Expense Category | Type |
| Amount | Value |
| Date | Timestamp |
| Description | Details |
| Attachment | Proof |
| Created By | User |

---

# 20. Project Financial Integration

Every donation and expense must:

- Create financial transaction
- Remain auditable
- Update project balance
- Affect reports

---

## Important Rule

Never directly update totals manually.

Always calculate from transactions.

---

# 21. Public Project Page

Each project should have:

- Public page
- Project story
- Beneficiary details
- Image gallery
- Donation summary
- Progress statistics
- Expense transparency
- Final report

---

# 22. Project Progress System

## Suggested Progress Formula

```text
Collected Amount / Target Amount
```

---

## Example

```text
Target = 100,000
Collected = 70,000
Progress = 70%
```

---

# 23. Completion Report System

When project completes:

- Publish completion summary
- Publish expense report
- Publish final gallery
- Archive project

---

## Completion Report May Include

- Total collection
- Total expenses
- Beneficiary outcome
- Supporting documents
- Handover images

---

# 24. Project Dashboard Integration

## Admin Dashboard

Should show:

- Running projects
- Total donations
- Pending approvals
- Financial summary

---

## Member Dashboard

Should show:

- Running projects
- My donations
- Project updates
- Transparency reports

---

# 25. Project Search & Filters

## Suggested Filters

| Filter | Purpose |
|---|---|
| Project Type | Category filtering |
| Status | Running/completed |
| Beneficiary Type | Target grouping |
| Date Range | Historical reporting |

---

# 26. Project Reports

## Suggested Reports

| Report | Purpose |
|---|---|
| Donation Summary | Financial overview |
| Expense Report | Transparency |
| Project Progress | Monitoring |
| Donor Report | Contribution tracking |
| Beneficiary Report | Community support summary |

---

# 27. Project Notifications

Future support:

- Donation received notifications
- Project completion notifications
- Fundraising updates
- Urgent support alerts

---

# 28. Audit Tracking Requirements

Track:

- Project creation
- Approval actions
- Donation updates
- Expense entries
- Project status changes
- Financial adjustments

---

# 29. Permission Rules

## Committee Members

Can:

- Create projects
- Manage updates
- View reports

---

## Treasurer

Can:

- Verify donations
- Manage expenses
- View financial reports

---

## Admin

Can:

- Approve projects
- Modify project visibility
- Archive projects
- Manage transparency reports

---

# 30. Mobile Optimization Rules

Many users will view projects from mobile.

Therefore:

- Responsive project cards
- Mobile-friendly donation pages
- Fast image loading
- Optimized galleries
- Large donate buttons

---

# 31. API Structure

## Suggested APIs

```text
/api/v1/projects
/api/v1/projects/{slug}
/api/v1/donations
/api/v1/project-expenses
/api/v1/project-gallery
```

---

# 32. Frontend Pages

## Admin Side

```text
Project Dashboard
Project List
Create Project
Project Details
Donation Management
Expense Management
Project Reports
```

---

## Public/Member Side

```text
Running Projects
Project Details
Donate Page
Donation History
Completed Projects
```

---

# 33. UI Recommendations

## Project Card UI

Should contain:

- Beneficiary image
- Project title
- Progress bar
- Target amount
- Collected amount
- Donate button

---

## Project Details UI

Should contain:

- Story section
- Image gallery
- Expense summary
- Donation summary
- Timeline updates
- Completion report

---

# 34. Future Expansion Possibilities

Future support may include:

- Online donation gateway
- Crowdfunding support
- Public donor wall
- Volunteer management
- Event fundraising
- Emergency rapid response campaigns

---

# 35. Important Financial Rules

The system must NEVER:

- Lose donation history
- Hard delete financial records
- Allow untracked expenses
- Hide financial adjustments

---

# 36. Important Development Rules

Codex-generated code must NEVER:

- Update project totals manually without transaction logic
- Skip financial audit trails
- Expose protected beneficiary documents publicly
- Allow unrestricted expense editing

---

# 37. Charity Project Summary

This module provides:

- Community fundraising infrastructure
- Financial transparency
- Beneficiary support management
- Donation tracking
- Public trust system
- Scalable charity architecture

---

# 38. Next Document

## 10-accounting-system

Will define:

- Accounting architecture
- Income/expense system
- Financial transaction flow
- Category management
- Balance calculation
- Financial reports
- Audit tracking
- Treasurer workflow
- Financial dashboard
- Adjustment system

