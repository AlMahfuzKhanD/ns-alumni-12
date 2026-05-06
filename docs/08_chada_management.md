# Alumni Association of NS - 12
## 08 — Monthly Chada Management System Design

---

# 1. Purpose

This document defines the complete Monthly Chada Management architecture for the Alumni Association of NS - 12 platform.

This module is one of the core financial systems of the application.

The module will manage:

- Monthly member subscriptions
- Due generation
- Payment collection
- Pending tracking
- Payment history
- Financial reporting
- Transparency tracking

---

# 2. Module Objectives

The Chada Management module should:

- Automate monthly dues
- Track member payments
- Calculate pending balances
- Support multiple payment methods
- Generate financial reports
- Maintain financial transparency
- Provide member contribution visibility

---

# 3. Chada Philosophy

Monthly chada is recurring community funding.

Therefore the system should ensure:

- Transparency
- Traceability
- Accuracy
- Auditability
- Easy reporting
- Mobile-friendly collection workflow

---

# 4. Core System Components

## Main Components

| Component | Purpose |
|---|---|
| Chada Settings | Monthly configuration |
| Due Generation | Monthly payable creation |
| Payment Collection | Payment recording |
| Pending Calculation | Due tracking |
| Financial Integration | Accounting linkage |
| Member View | Personal contribution tracking |
| Reports | Financial summaries |

---

# 5. Chada Configuration System

## Monthly Chada Settings

Admin/Treasurer can configure:

| Setting | Example |
|---|---|
| Monthly Amount | 100 BDT |
| Effective Year | 2026 |
| Late Fee | Optional |
| Grace Period | Optional |
| Active Status | YES/NO |

---

# 6. Due Generation Flow

## Monthly Due Flow

```text
Month Starts
   ↓
Generate Monthly Chada
   ↓
Assign to Active Members
   ↓
Create Due Records
   ↓
Members View Pending Amount
```

---

# 7. Due Generation Strategy

Recommended:

```text
Automatic Monthly Due Generation
```

using:

- Scheduler (Cron)
OR
- Manual admin trigger

---

# 8. Chada Record Structure

Each monthly record should contain:

| Field | Purpose |
|---|---|
| Member | Owner |
| Month | Due month |
| Year | Due year |
| Payable Amount | Required amount |
| Paid Amount | Paid value |
| Due Amount | Remaining balance |
| Payment Status | Current state |

---

# 9. Payment Status System

## Recommended Statuses

```text
pending
partial
paid
cancelled
```

---

## Status Behavior

| Status | Meaning |
|---|---|
| Pending | No payment |
| Partial | Partially paid |
| Paid | Fully paid |
| Cancelled | Invalid/cancelled entry |

---

# 10. Payment Collection Workflow

## Collection Flow

```text
Member Payment
   ↓
Treasurer Verification
   ↓
Payment Entry
   ↓
Financial Transaction Creation
   ↓
Receipt Generation
```

---

# 11. Supported Payment Methods

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
SSLCommerz
Online Gateway
Card Payment
```

---

# 12. Payment Entry Structure

Each payment should store:

| Field | Purpose |
|---|---|
| Member | Payment owner |
| Chada Record | Related due |
| Amount | Paid amount |
| Payment Method | Collection source |
| Transaction Number | Optional reference |
| Payment Screenshot | Optional proof |
| Collected By | Treasurer/Admin |
| Payment Date | Transaction date |

---

# 13. Payment Screenshot Support

Optional screenshot upload for:

- bKash
- Nagad
- Bank transfer

---

## Upload Rules

| Rule | Value |
|---|---|
| Allowed Types | jpg/png/pdf |
| Max Size | 5MB |

---

# 14. Pending Calculation Logic

## Formula

```text
Due Amount = Payable Amount - Paid Amount
```

---

## Example

```text
Monthly Chada = 100
Paid = 40
Due = 60
Status = Partial
```

---

# 15. Financial Integration Rules

Every chada payment must:

- Create financial transaction
- Remain auditable
- Update member summary
- Affect dashboard reports

---

## Important Rule

Never store financial data in only one table.

Use:

- Chada table
- Payment table
- Financial transaction table

---

# 16. Member Dashboard Integration

Members should see:

- Current pending amount
- Total paid amount
- Monthly history
- Payment receipts
- Payment status

---

# 17. Treasurer Dashboard Integration

Treasurer dashboard should show:

- Monthly collection summary
- Pending total
- Collection trends
- Recent payments
- Payment method summary
- Defaulter statistics

---

# 18. Chada Receipt System

## Receipt Features

Each payment should support:

- Printable receipt
- PDF receipt
- Receipt number
- Member details
- Payment details
- Treasurer information

---

## Suggested Receipt Format

```text
NS12-CHADA-2026-0001
```

---

# 19. Bulk Collection Support

Treasurer may need:

- Bulk payment entry
- Batch payment processing
- Quick collection UI

---

# 20. Member Defaulter Tracking

System should identify:

- Members with long pending dues
- Inactive contributors
- Payment gaps

---

## Possible Usage

- Reminder notifications
- Follow-up communication
- Membership review

---

# 21. Chada Reminder System (Future)

Possible future notifications:

- SMS reminders
- Email reminders
- Push notifications
- WhatsApp integration

---

# 22. Chada Adjustment Rules

If correction needed:

- Avoid hard deletion
- Use adjustment entries
- Maintain financial history

---

## Example

```text
Wrong Entry
   ↓
Adjustment Transaction
   ↓
Updated Balance
```

---

# 23. Refund Rules

Refunds should:

- Create adjustment transaction
- Maintain audit history
- Require permission

---

# 24. Chada Reporting System

## Suggested Reports

| Report | Purpose |
|---|---|
| Monthly Collection | Financial overview |
| Pending Report | Due tracking |
| Member Contribution Report | Transparency |
| Payment Method Report | Collection analysis |
| Defaulter Report | Follow-up |
| Yearly Summary | Long-term reporting |

---

# 25. Search & Filters

## Suggested Filters

| Filter | Purpose |
|---|---|
| Month | Monthly tracking |
| Year | Annual reporting |
| Payment Status | Pending/paid filtering |
| Member | Individual tracking |
| Payment Method | Financial analysis |

---

# 26. Chada Permission Rules

## Treasurer Permissions

Can:

- Collect payment
- View reports
- Export reports
- Verify payments

Cannot:

- Delete financial history
- Modify protected settings

---

## Member Permissions

Can:

- View own payments
- Download receipts
- View pending dues

Cannot:

- Modify payment records

---

# 27. Audit Tracking Requirements

Track:

- Payment collection
- Payment updates
- Adjustments
- Refunds
- Cancellation
- Treasurer activity

---

# 28. API Structure

## Suggested APIs

```text
/api/v1/chadas
/api/v1/chada-payments
/api/v1/chada-reports
/api/v1/member-chada-summary
```

---

# 29. Frontend Pages

## Admin/Treasurer Side

```text
Chada Dashboard
Monthly Due List
Collect Payment
Payment History
Defaulter List
Reports
```

---

## Member Side

```text
My Chada
Payment History
Pending Summary
Download Receipts
```

---

# 30. UI Recommendations

## Collection UI

Should support:

- Quick member search
- Payment method selection
- Instant calculation
- Mobile-friendly form
- Receipt preview

---

## Chada List UI

Features:

- Search
- Filter
- Export
- Status badges
- Quick payment actions

---

# 31. Mobile Optimization Rules

Because many payments may happen via mobile:

- Large payment buttons
- Mobile-friendly forms
- Responsive tables
- Optimized payment history pages
- Fast loading dashboard

---

# 32. Future Expansion Possibilities

Future support may include:

- Auto-generated invoices
- Online payment gateway
- Auto reminder system
- Subscription automation
- QR payment support
- Mobile app collection

---

# 33. Important Financial Rules

The system must NEVER:

- Hard delete payment history
- Allow unauthorized edits
- Lose transaction traceability
- Skip audit logs

---

# 34. Important Development Rules

Codex-generated code must NEVER:

- Directly modify balances without transactions
- Store duplicate financial logic randomly
- Skip payment validation
- Allow unrestricted deletion

---

# 35. Chada Management Summary

This module provides:

- Organized monthly subscription management
- Financial transparency
- Member contribution tracking
- Treasurer operational workflow
- Reporting infrastructure
- Scalable financial architecture

---

# 36. Next Document

## 09-charity-project-management

Will define:

- Charity project architecture
- Fundraising workflow
- Beneficiary management
- Donation collection system
- Project transparency system
- Expense tracking
- Project gallery
- Public project pages
- Project reporting
- Financial integration

