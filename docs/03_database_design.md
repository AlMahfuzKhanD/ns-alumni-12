# Alumni Association of NS - 12
## 03 — Database Design & Data Architecture

---

# 1. Purpose

This document defines the database architecture and table planning for the Alumni Association of NS - 12 platform.

The goal is to ensure:

- Clean relational structure
- Financial traceability
- Scalable module design
- Maintainable database architecture
- Audit-friendly system
- Proper reporting capability

---

# 2. Database Philosophy

The database should be:

- Normalized
- Modular
- Financially traceable
- Relationship-driven
- Audit-friendly
- Future scalable

---

# 3. Database Engine

## Recommended

```text
MySQL 8+
```

---

# 4. Naming Convention

## Table Naming

Use:

```text
snake_case + plural
```

Examples:

```text
members
committee_members
charity_projects
donations
monthly_chadas
```

---

## Column Naming

Use:

```text
snake_case
```

Examples:

```text
member_id
project_id
created_by
updated_by
```

---

# 5. Core Database Modules

| Module | Purpose |
|---|---|
| Users | Authentication |
| Roles & Permissions | Access control |
| Members | Alumni profiles |
| Committee | Committee structure |
| Chada | Monthly subscription system |
| Projects | Charity projects |
| Donations | Donation records |
| Accounting | Financial tracking |
| Notices | Announcements |
| Files | Image & document management |
| Audit Logs | Activity tracking |

---

# 6. Authentication Tables

# users

Purpose:

System login accounts.

---

## Main Columns

| Column | Type |
|---|---|
| id | bigint |
| name | string |
| email | string |
| phone | string |
| password | string |
| status | tinyint |
| last_login_at | timestamp |
| remember_token | string |
| created_at | timestamp |
| updated_at | timestamp |

---

# roles

Managed by:

```text
Spatie Laravel Permission
```

---

# permissions

Managed by:

```text
Spatie Laravel Permission
```

---

# model_has_roles

Pivot table for user-role mapping.

---

# model_has_permissions

Pivot table for user-permission mapping.

---

# 7. Member Management Tables

# members

Purpose:

Stores alumni profile information.

---

## Main Columns

| Column | Type |
|---|---|
| id | bigint |
| user_id | bigint nullable |
| member_code | string unique |
| full_name | string |
| father_name | string nullable |
| mother_name | string nullable |
| email | string nullable |
| phone | string |
| emergency_phone | string nullable |
| gender | enum |
| blood_group | string nullable |
| profession | string nullable |
| organization | string nullable |
| batch_year | year |
| date_of_birth | date nullable |
| address | text nullable |
| bio | text nullable |
| membership_status | enum |
| profile_image | string nullable |
| joined_at | date nullable |
| created_by | bigint nullable |
| updated_by | bigint nullable |
| created_at | timestamp |
| updated_at | timestamp |

---

## Membership Status

```text
pending
active
inactive
suspended
```

---

# member_documents

Purpose:

Store member-related documents.

---

## Main Columns

| Column | Type |
|---|---|
| id | bigint |
| member_id | bigint |
| document_type | string |
| file_path | string |
| remarks | text nullable |
| created_at | timestamp |

---

# 8. Committee Management Tables

# committees

Purpose:

Store committee information.

---

## Main Columns

| Column | Type |
|---|---|
| id | bigint |
| committee_name | string |
| committee_type | enum |
| start_date | date |
| end_date | date nullable |
| status | tinyint |
| created_at | timestamp |
| updated_at | timestamp |

---

## Committee Types

```text
executive
advisor
special
```

---

# committee_members

Purpose:

Assign members into committees.

---

## Main Columns

| Column | Type |
|---|---|
| id | bigint |
| committee_id | bigint |
| member_id | bigint |
| designation | string |
| serial | integer nullable |
| is_active | tinyint |
| created_at | timestamp |

---

# 9. Monthly Chada Module Tables

# monthly_chada_settings

Purpose:

Stores monthly chada configuration.

---

## Main Columns

| Column | Type |
|---|---|
| id | bigint |
| year | year |
| monthly_amount | decimal |
| late_fee | decimal default 0 |
| status | tinyint |
| created_at | timestamp |

---

# monthly_chadas

Purpose:

Stores generated monthly dues.

---

## Main Columns

| Column | Type |
|---|---|
| id | bigint |
| member_id | bigint |
| year | year |
| month | integer |
| payable_amount | decimal |
| paid_amount | decimal default 0 |
| due_amount | decimal |
| payment_status | enum |
| created_at | timestamp |
| updated_at | timestamp |

---

## Payment Status

```text
pending
partial
paid
cancelled
```

---

# chada_payments

Purpose:

Stores payment collection records.

---

## Main Columns

| Column | Type |
|---|---|
| id | bigint |
| monthly_chada_id | bigint |
| member_id | bigint |
| payment_method | enum |
| transaction_no | string nullable |
| amount | decimal |
| payment_date | datetime |
| payment_screenshot | string nullable |
| collected_by | bigint |
| remarks | text nullable |
| created_at | timestamp |

---

## Payment Methods

```text
cash
bkash
nagad
bank
```

---

# 10. Charity Project Tables

# charity_projects

Purpose:

Stores donation and charity project information.

---

## Main Columns

| Column | Type |
|---|---|
| id | bigint |
| project_code | string unique |
| title | string |
| slug | string |
| project_type | enum |
| beneficiary_name | string |
| beneficiary_type | enum |
| beneficiary_image | string nullable |
| target_amount | decimal |
| collected_amount | decimal default 0 |
| expense_amount | decimal default 0 |
| short_description | text |
| full_description | longtext |
| start_date | date |
| end_date | date nullable |
| visibility | enum |
| project_status | enum |
| created_by | bigint |
| approved_by | bigint nullable |
| created_at | timestamp |
| updated_at | timestamp |

---

## Beneficiary Types

```text
teacher
member
non_member
institution
```

---

## Project Status

```text
draft
running
completed
cancelled
```

---

# project_images

Purpose:

Store project gallery images.

---

## Main Columns

| Column | Type |
|---|---|
| id | bigint |
| project_id | bigint |
| image_path | string |
| caption | string nullable |
| created_at | timestamp |

---

# project_documents

Purpose:

Store project-related documents.

---

## Main Columns

| Column | Type |
|---|---|
| id | bigint |
| project_id | bigint |
| document_type | string |
| file_path | string |
| created_at | timestamp |

---

# 11. Donation Tables

# donations

Purpose:

Stores donation records.

---

## Main Columns

| Column | Type |
|---|---|
| id | bigint |
| project_id | bigint |
| donor_member_id | bigint nullable |
| donor_name | string nullable |
| donor_phone | string nullable |
| payment_method | enum |
| transaction_no | string nullable |
| amount | decimal |
| donation_date | datetime |
| remarks | text nullable |
| created_by | bigint nullable |
| created_at | timestamp |

---

# 12. Help Request Tables

# help_requests

Purpose:

Stores financial help requests.

---

## Main Columns

| Column | Type |
|---|---|
| id | bigint |
| requester_member_id | bigint nullable |
| requester_name | string |
| requester_phone | string |
| help_type | enum |
| subject | string |
| description | longtext |
| requested_amount | decimal nullable |
| approval_status | enum |
| approved_amount | decimal nullable |
| reviewed_by | bigint nullable |
| created_at | timestamp |
| updated_at | timestamp |

---

## Approval Status

```text
pending
reviewing
approved
rejected
completed
```

---

# 13. Accounting Tables

# account_categories

Purpose:

Stores accounting categories.

---

## Main Columns

| Column | Type |
|---|---|
| id | bigint |
| category_name | string |
| category_type | enum |
| status | tinyint |
| created_at | timestamp |

---

## Category Types

```text
income
expense
```

---

# financial_transactions

Purpose:

Main accounting transaction table.

---

## Main Columns

| Column | Type |
|---|---|
| id | bigint |
| transaction_type | enum |
| category_id | bigint |
| member_id | bigint nullable |
| project_id | bigint nullable |
| reference_type | string nullable |
| reference_id | bigint nullable |
| amount | decimal |
| transaction_date | datetime |
| payment_method | enum |
| description | text nullable |
| created_by | bigint |
| created_at | timestamp |
| updated_at | timestamp |

---

## Transaction Types

```text
income
expense
adjustment
refund
```

---

# 14. Notice Module Tables

# notices

Purpose:

Stores notices and announcements.

---

## Main Columns

| Column | Type |
|---|---|
| id | bigint |
| notice_type | enum |
| title | string |
| slug | string |
| short_description | text nullable |
| description | longtext |
| featured_image | string nullable |
| published_at | datetime |
| expires_at | datetime nullable |
| visibility | enum |
| status | enum |
| created_by | bigint |
| created_at | timestamp |
| updated_at | timestamp |

---

## Notice Types

```text
notice
event
job
announcement
```

---

# 15. File Management Tables

# media_files

Purpose:

Centralized uploaded file management.

---

## Main Columns

| Column | Type |
|---|---|
| id | bigint |
| file_name | string |
| file_path | string |
| file_type | string |
| file_size | bigint |
| disk | string |
| uploaded_by | bigint |
| created_at | timestamp |

---

# 16. Notification Tables

# notifications

Managed by Laravel notification system.

---

# 17. Audit Tables

# activity_logs

Purpose:

Track important activities.

---

## Main Columns

| Column | Type |
|---|---|
| id | bigint |
| user_id | bigint nullable |
| action | string |
| module | string |
| old_values | json nullable |
| new_values | json nullable |
| ip_address | string nullable |
| user_agent | text nullable |
| created_at | timestamp |

---

# 18. Relationship Overview

## Main Relationships

```text
users → members
members → committee_members
members → monthly_chadas
monthly_chadas → chada_payments
charity_projects → donations
charity_projects → project_images
charity_projects → financial_transactions
help_requests → financial_transactions
```

---

# 19. Financial Architecture Rules

Important financial rules:

- Every income must create financial transaction
- Every expense must create financial transaction
- Donations must remain traceable
- Chada collection must remain traceable
- Adjustments should not delete history
- Soft delete preferred for financial tables

---

# 20. Soft Delete Strategy

Use soft delete for:

- Members
- Projects
- Notices
- Financial transactions

Avoid permanent deletion.

---

# 21. Indexing Strategy

Important indexed columns:

```text
member_code
project_code
phone
email
payment_status
project_status
transaction_date
created_at
```

---

# 22. Migration Philosophy

Migration rules:

- One table per migration
- Clear naming
- Foreign keys required
- Use indexes properly
- Add comments where necessary

---

# 23. Enum Philosophy

Use enums for:

- Status fields
- Payment methods
- Approval states
- Transaction types
- Notice types

---

# 24. Audit & Transparency Principle

This system handles:

- Donations
- Community funds
- Financial help

Therefore:

- Financial history should never disappear
- Activities must remain traceable
- Reports must remain reproducible
- User actions must remain auditable

---

# 25. Future Database Scalability

Database should support future:

- Multi-alumni organization support
- Multi-tenant architecture
- Mobile app integration
- Online payment gateway
- SMS system
- Event registration
- Voting/election system

---

# 26. Next Document

## 04-permission-access-control

Will define:

- Roles
- Permissions
- Access control matrix
- Policy structure
- Middleware strategy
- Admin hierarchy
- Financial permission control
- Approval permission flow
- Dashboard visibility rules

