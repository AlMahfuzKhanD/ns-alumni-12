# Alumni Association of NS - 12
## 16 — Codex Development Rules & AI Implementation Guide

---

# 1. Purpose

This document defines the development rules and Codex AI implementation strategy for the Alumni Association of NS - 12 platform.

The goal is to make Codex generate code that is:

- Clean
- Modular
- Secure
- Maintainable
- Scalable
- Consistent
- Production-ready

---

# 2. Development Philosophy

This project must follow a documentation-first development approach.

Before coding any module:

- Read the related documentation
- Understand module boundaries
- Follow architecture rules
- Keep business logic separated
- Keep financial logic traceable
- Keep UI components reusable

---

# 3. Codex Usage Strategy

Codex should be used module by module.

Do NOT ask Codex to build the whole application at once.

---

## Correct Approach

```text
Step 1: Build authentication
Step 2: Build roles and permissions
Step 3: Build member module
Step 4: Build committee module
Step 5: Build chada module
Step 6: Build project/donation module
Step 7: Build accounting module
```

---

# 4. Important Codex Instruction Format

Every Codex prompt should include:

- Module name
- Existing architecture rule
- Required files
- Expected output
- Validation rules
- Permission rules
- Testing expectation

---

# 5. General Backend Coding Rules

Codex must follow:

- Laravel 12 conventions
- Thin controllers
- Service layer for business logic
- Form Request validation
- API Resources for responses
- Policies for authorization
- Database transactions for financial operations

---

# 6. Controller Rules

Controllers should only:

- Receive request
- Call Form Request validation
- Call service/action class
- Return standardized response

---

## Controllers Must NOT

- Contain large business logic
- Directly calculate financial balances
- Directly process complex uploads
- Skip authorization

---

# 7. Service Layer Rules

Services should contain business logic.

Example services:

```text
MemberService
CommitteeService
ChadaService
ProjectService
DonationService
AccountingService
DashboardService
MediaService
```

---

# 8. Action Class Rules

Use action classes for specific complex operations.

Examples:

```text
GenerateMonthlyChadaAction
CollectChadaPaymentAction
CreateDonationProjectAction
ApproveHelpRequestAction
RecordProjectExpenseAction
```

---

# 9. Validation Rules

Use Form Request classes.

Examples:

```text
StoreMemberRequest
UpdateMemberRequest
StoreProjectRequest
StoreDonationRequest
StoreExpenseRequest
```

---

## Validation Must Include

- Required fields
- Data types
- File types
- File size
- Enum validation
- Permission-sensitive rules

---

# 10. Authorization Rules

Every protected action must validate:

- Authenticated user
- Role/permission
- Policy rule

---

## Codex Must NEVER

- Trust frontend permission only
- Hardcode admin checks randomly
- Allow unrestricted financial access
- Skip policy checks

---

# 11. API Response Rules

All API responses must follow one standard format.

---

## Success Response

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

---

## Error Response

```json
{
  "success": false,
  "message": "Something went wrong",
  "errors": {}
}
```

---

# 12. Database Rules

Codex must:

- Use migrations properly
- Add foreign keys
- Add indexes where needed
- Use soft deletes for important tables
- Avoid unsafe nullable fields unless justified
- Keep financial records traceable

---

# 13. Financial Coding Rules

Financial modules are high-risk.

These include:

- Chada payments
- Donations
- Project expenses
- Financial transactions
- Adjustments
- Refunds

---

## Financial Operations Must Use

```text
DB::transaction()
```

---

# 14. Financial Safety Rules

Codex must NEVER:

- Update balances without transaction records
- Hard delete financial history
- Allow direct manual balance editing
- Skip audit logs
- Mix financial logic inside Vue components

---

# 15. Audit Log Rules

Important actions must create audit logs.

Examples:

- Member approval
- Chada collection
- Donation verification
- Expense creation
- Role changes
- Project approval
- Transaction adjustments

---

# 16. File Upload Rules

Codex must validate:

- File MIME type
- File size
- Storage disk
- Permission
- Visibility

---

## Protected Files

Protected files must NOT be publicly accessible.

Examples:

- Medical documents
- Payment screenshots
- Financial reports
- Internal documents

---

# 17. Frontend Coding Rules

Frontend must use:

- Vue 3 Composition API
- Reusable components
- Pinia stores
- API service layer
- Tailwind CSS
- Loading states
- Error states

---

# 18. Vue Component Rules

Components should be:

- Small
- Focused
- Reusable
- Easy to read
- Not overloaded with business logic

---

## Avoid

- Huge single-file components
- Duplicate form logic
- Direct API calls scattered everywhere
- Hardcoded permission logic in many places

---

# 19. Frontend API Rules

Frontend should call APIs through service files.

Example:

```text
services/memberService.js
services/projectService.js
services/accountingService.js
```

---

# 20. State Management Rules

Use Pinia for:

- Authentication state
- User permissions
- Dashboard state
- Notification state

Avoid storing sensitive financial data globally unless necessary.

---

# 21. UI/UX Rules

Codex-generated UI must include:

- Loading state
- Empty state
- Error state
- Mobile responsiveness
- Status badges
- User-friendly validation messages

---

# 22. Permission-Based UI Rules

Frontend should hide unauthorized menus and buttons.

But backend must still enforce real permission.

---

# 23. Table Rules

All major tables should support:

- Search
- Filters
- Pagination
- Sorting
- Status badges
- Responsive behavior

---

# 24. Form Rules

Forms should:

- Group fields logically
- Show validation errors clearly
- Disable submit while loading
- Confirm destructive actions
- Use reusable form inputs

---

# 25. Dashboard Rules

Dashboard logic should:

- Stay in DashboardService
- Use dedicated dashboard APIs
- Use optimized queries
- Respect permission rules
- Avoid exposing unauthorized data

---

# 26. Naming Convention Rules

Use clear naming.

Examples:

```text
MemberService
StoreMemberRequest
MemberResource
MemberPolicy
```

---

# 27. Git Workflow Rules

Recommended branches:

```text
main
staging
development
feature/module-name
```

---

# 28. Commit Message Rules

Use meaningful commits.

Examples:

```text
feat: add member registration flow
fix: correct chada due calculation
refactor: move donation logic to service
```

---

# 29. Testing Rules

Codex should generate tests for important modules.

Priority tests:

- Authentication
- Role/permission
- Member approval
- Chada payment
- Donation collection
- Expense creation
- Financial reports

---

# 30. Minimum Test Types

Use:

- Feature tests
- Unit tests for services
- Authorization tests
- Financial calculation tests

---

# 31. Error Handling Rules

Backend should:

- Catch expected errors
- Return proper status codes
- Log critical errors
- Avoid exposing internal server details

---

# 32. Security Rules

Codex must never generate code that:

- Stores raw passwords
- Skips CSRF/session protection
- Allows unrestricted uploads
- Exposes private files
- Trusts request user IDs blindly
- Allows mass assignment vulnerabilities

---

# 33. Laravel Model Rules

Models should define:

- Fillable fields
- Relationships
- Casts
- Scopes where useful
- Soft deletes where needed

---

# 34. Enum Rules

Use enums or constants for:

- Payment methods
- Status values
- Transaction types
- Notice types
- Project status

---

# 35. Reusable Helper Rules

Common logic should be reusable.

Examples:

- Standard API response helper
- File upload helper/service
- Permission helper
- Date formatting helper

---

# 36. Refactoring Rules

After each module:

- Remove duplicate logic
- Move reusable code to services/components
- Check authorization
- Check validation
- Check query performance

---

# 37. Performance Rules

Codex must:

- Avoid N+1 queries
- Use eager loading
- Add pagination
- Avoid loading unnecessary columns
- Use indexes for reports

---

# 38. Deployment-Aware Rules

Code should be deployment friendly.

Avoid:

- Hardcoded local paths
- Hardcoded URLs
- Debug code
- Console logs in production
- Untracked environment assumptions

---

# 39. Recommended Codex Prompt Template

Use this template:

```text
You are working on Alumni Association of NS - 12.
Follow docs: [document name].
Tech stack: Laravel 12, Vue 3, Tailwind CSS, MySQL.
Architecture rules:
- Thin controllers
- Service layer
- Form Requests
- API Resources
- Spatie permission
- Standard API response

Task:
[Describe exact task]

Requirements:
[List requirements]

Do not:
[List restrictions]

Output:
[List expected files]
```

---

# 40. Example Codex Prompt

```text
Build the Member Management backend module.
Follow 06-member-management and 14-api-structure.
Create migrations, models, requests, controller, service, resource and policy.
Use Laravel 12 conventions.
Do not put business logic in controller.
Use standard API response format.
Use permissions for protected actions.
```

---

# 41. Development Order Recommendation

Recommended implementation order:

```text
1. Project setup
2. Authentication
3. Roles & permissions
4. Member module
5. Committee module
6. Chada module
7. Charity project module
8. Donation module
9. Accounting module
10. Notice module
11. Dashboard module
12. Media module
13. Reports
14. Testing
15. Deployment
```

---

# 42. Final Codex Rule

Codex is a coding assistant, not the architect.

The architecture must come from documentation.

Codex should implement according to the documented plan.

---

# 43. Summary

This document ensures Codex-generated development remains:

- Structured
- Secure
- Maintainable
- Scalable
- Financially safe
- Consistent with project architecture

---

# 44. Next Document

## 17-testing-strategy

Will define:

- Testing architecture
- Feature test strategy
- Unit test strategy
- Permission testing
- Financial testing
- API testing
- Frontend testing
- Manual QA checklist
- Release readiness checklist

