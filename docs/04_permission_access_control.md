# Alumni Association of NS - 12
## 04 — Permission & Access Control Design

---

# 1. Purpose

This document defines the complete authorization and access control architecture for the Alumni Association of NS - 12 platform.

The system handles:

- Member information
- Donations
- Financial transactions
- Charity projects
- Committee management
- Administrative operations

Therefore, a strong permission architecture is critical.

---

# 2. Access Control Philosophy

The system will use:

- Role-based access control (RBAC)
- Permission-based authorization
- Policy-driven security
- Module-level restrictions
- Action-level restrictions

---

# 3. Recommended Package

Use:

```text
spatie/laravel-permission
```

---

# 4. Authorization Layers

The system should enforce authorization in multiple layers.

| Layer | Purpose |
|---|---|
| Middleware | Route protection |
| Policies | Model authorization |
| Permissions | Action authorization |
| UI Restrictions | Hide unauthorized UI |
| Service Validation | Business rule protection |

---

# 5. Core Roles

## Super Admin

Highest level access.

Can:

- Manage everything
- Manage system settings
- Manage permissions
- Manage all users
- View all financial records
- Override restrictions

---

## Admin

Administrative operations manager.

Can:

- Manage members
- Manage notices
- Manage projects
- Manage committee
- View accounting
- Approve requests

Cannot:

- Modify core system settings
- Manage super admin

---

## Treasurer

Financial operations role.

Can:

- Collect chada
- Manage financial entries
- Manage donations
- Record expenses
- View reports
- Generate financial summaries

Cannot:

- Manage users
- Manage permissions

---

## Committee Member

Operational committee role.

Can:

- View members
- Review help requests
- Create projects
- Publish notices
- Review donations

Cannot:

- Access core accounting settings
- Manage permissions

---

## Advisor

Senior advisory role.

Can:

- View reports
- Review projects
- Review financial summaries
- Give recommendations

Cannot:

- Modify financial transactions
- Delete records

---

## General Member

Regular alumni member.

Can:

- View own dashboard
- View notices
- View projects
- Donate
- View own chada history
- Submit help requests
- Update own profile

Cannot:

- Access admin panel modules
- Modify financial data

---

# 6. Role Hierarchy

```text
Super Admin
   ↓
Admin
   ↓
Treasurer / Committee
   ↓
Advisor
   ↓
Member
```

---

# 7. Permission Naming Strategy

Permission names should follow:

```text
action-module
```

Examples:

```text
view-members
create-members
edit-members
delete-members
approve-members
```

---

# 8. Member Module Permissions

```text
view-members
view-member-details
create-members
edit-members
delete-members
approve-members
export-members
manage-member-documents
```

---

# 9. Committee Module Permissions

```text
view-committee
create-committee
edit-committee
delete-committee
assign-committee-members
```

---

# 10. Chada Module Permissions

```text
view-chada
create-chada
collect-chada
edit-chada-payment
cancel-chada-payment
export-chada-report
```

---

# 11. Donation & Project Permissions

```text
view-projects
create-projects
edit-projects
delete-projects
approve-projects
manage-project-gallery
manage-project-documents
view-donations
manage-donations
```

---

# 12. Accounting Permissions

```text
view-accounting
create-income
create-expense
edit-transactions
delete-transactions
view-financial-report
export-financial-report
```

---

# 13. Notice Permissions

```text
view-notices
create-notices
edit-notices
delete-notices
publish-notices
```

---

# 14. Dashboard Permissions

```text
view-admin-dashboard
view-treasurer-dashboard
view-member-dashboard
view-committee-dashboard
```

---

# 15. System Permissions

```text
manage-settings
manage-roles
manage-permissions
manage-system-configurations
view-audit-logs
```

---

# 16. Recommended Permission Groups

| Group | Purpose |
|---|---|
| Members | Member management |
| Committee | Committee management |
| Chada | Monthly collection |
| Projects | Charity projects |
| Donations | Donation tracking |
| Accounting | Financial management |
| Notices | Communication |
| Reports | Reporting |
| Settings | System management |

---

# 17. Policy Architecture

Laravel Policies should be used for:

- Members
- Projects
- Donations
- Transactions
- Notices
- Help requests

---

## Example Policies

```text
MemberPolicy
ProjectPolicy
DonationPolicy
AccountingPolicy
NoticePolicy
```

---

# 18. Important Authorization Rule

Never rely ONLY on frontend UI restrictions.

Every sensitive operation must validate:

- Role
- Permission
- Policy

inside backend.

---

# 19. Financial Security Rules

Financial operations require stronger restrictions.

Examples:

- Only treasurer/admin can modify transactions
- Financial deletion should be restricted
- Adjustments preferred over deletion
- Audit logs required

---

# 20. Approval Workflow Permissions

## Help Request Approval

Flow:

```text
Member Request
   ↓
Committee Review
   ↓
Admin/Treasurer Approval
   ↓
Fund Disbursement
```

---

## Project Approval

Flow:

```text
Committee Creates Project
   ↓
Admin Review
   ↓
Publish Project
```

---

# 21. Dashboard Visibility Rules

Different users should see different dashboard widgets.

---

## Member Dashboard Widgets

- Pending chada
- Donation history
- Notices
- Running projects
- My contributions

---

## Treasurer Dashboard Widgets

- Monthly collection
- Expense summary
- Current balance
- Pending dues
- Recent transactions

---

## Admin Dashboard Widgets

- Total members
- Active members
- Total donations
- Running projects
- Pending approvals
- Financial summary

---

# 22. Route Protection Strategy

Use middleware groups.

Example:

```php
Route::middleware(['auth', 'permission:view-members'])
```

---

# 23. Module Access Strategy

Each module should:

- Check permission before access
- Restrict buttons/actions dynamically
- Prevent unauthorized API access

---

# 24. UI Restriction Strategy

Frontend should:

- Hide unauthorized menus
- Hide unauthorized buttons
- Hide restricted pages
- Restrict dashboard widgets

---

## Example

A member should NOT see:

- Accounting menu
- User management menu
- Permission settings

---

# 25. Audit Log Permissions

Only authorized users can view audit logs.

Recommended:

```text
Super Admin
Admin
```

---

# 26. Soft Delete Permission Rules

Deletion rules:

| Module | Strategy |
|---|---|
| Members | Soft delete |
| Projects | Soft delete |
| Transactions | No hard delete |
| Donations | No hard delete |
| Notices | Soft delete |

---

# 27. File Access Control

Protected files should require authorization.

Examples:

- Medical documents
- Payment screenshots
- Internal reports

---

## Public Files

Examples:

- Profile image
- Public project gallery
- Public notice images

---

# 28. Session Security Rules

Recommended:

- Auto logout on inactivity
- Password hashing using bcrypt/argon
- Session regeneration after login
- Login throttling
- Strong password validation

---

# 29. Future Multi-Tenant Preparation

Future expansion may support:

- Multiple alumni organizations
- Separate organization admins
- Isolated financial data

Therefore:

Architecture should remain modular.

---

# 30. Access Control Principles

The system should prioritize:

1. Financial safety
2. Data privacy
3. Transparency
4. Controlled administration
5. Auditability
6. Least privilege access

---

# 31. Recommended Seed Strategy

Create seeders for:

- Default roles
- Default permissions
- Initial admin account
- Basic system settings

---

# 32. Recommended Initial Roles

```text
Super Admin
Admin
Treasurer
Committee Member
Advisor
Member
```

---

# 33. Recommended Initial Permission Count

Expected:

```text
40–80 permissions
```

depending on module depth.

---

# 34. Important Development Rule

Codex-generated code must NEVER:

- Skip authorization checks
- Hardcode admin conditions
- Mix role logic randomly
- Allow unrestricted financial editing

---

# 35. Architecture Summary

This access control architecture ensures:

- Secure financial operations
- Safe member management
- Controlled administration
- Scalable permission system
- Audit-friendly workflows
- Proper community transparency

---

# 36. Next Document

## 05-authentication-flow

Will define:

- Login architecture
- Registration workflow
- Password reset flow
- Session management
- Sanctum integration
- Member onboarding
- Profile completion flow
- Authentication middleware
- Security flow
- Login UI behavior

