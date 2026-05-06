# Alumni Association of NS - 12
## 05 — Authentication Flow & Security Architecture

---

# 1. Purpose

This document defines the complete authentication and security flow for the Alumni Association of NS - 12 platform.

The goal is to ensure:

- Secure login system
- Controlled member onboarding
- Role-based authentication
- Secure session management
- Proper account verification
- Scalable authentication architecture

---

# 2. Authentication Philosophy

The authentication system should be:

- Secure
- Simple
- Mobile friendly
- Maintainable
- Scalable
- User-friendly

---

# 3. Recommended Authentication Stack

## Backend

- Laravel Sanctum
- Laravel Authentication
- Laravel Policies
- Laravel Middleware

---

## Frontend

- Vue 3
- Axios
- Pinia authentication store

---

# 4. Authentication Type

Use:

```text
Session-based authentication
```

NOT JWT initially.

---

## Why Session-Based?

Because:

- Easier for hybrid Laravel architecture
- More secure for admin systems
- Simpler deployment
- Simpler CSRF protection
- Better for web dashboards

---

# 5. Authentication Flow Overview

```text
Login Page
   ↓
Credential Validation
   ↓
User Status Check
   ↓
Role & Permission Loading
   ↓
Session Creation
   ↓
Dashboard Redirect
```

---

# 6. User Types

The system supports:

| User Type | Description |
|---|---|
| Super Admin | Full system control |
| Admin | Operational management |
| Treasurer | Financial management |
| Committee | Committee operations |
| Advisor | Advisory role |
| Member | General alumni member |

---

# 7. Login Fields

Recommended login options:

```text
Email + Password
OR
Phone + Password
```

---

## Recommended Initial Login

```text
Phone Number + Password
```

Reason:

Many alumni users may not use email regularly.

---

# 8. Registration Strategy

## Recommended Flow

Member self-registration with admin approval.

---

## Registration Flow

```text
Member Registration
   ↓
Basic Information Submission
   ↓
Pending Approval
   ↓
Admin Review
   ↓
Approval/Rejection
   ↓
Account Activation
```

---

# 9. Registration Fields

## Basic Required Fields

| Field | Required |
|---|---|
| Full Name | YES |
| Phone Number | YES |
| Password | YES |
| Batch Year | YES |
| Address | YES |

---

## Optional Fields

| Field | Optional |
|---|---|
| Email | YES |
| Blood Group | YES |
| Profession | YES |
| Organization | YES |
| Profile Image | YES |
| Bio | YES |

---

# 10. Member Approval Workflow

New members should NOT become active immediately.

---

## Approval Flow

```text
Registration Submitted
   ↓
Status = Pending
   ↓
Admin Verification
   ↓
Approve / Reject
```

---

## Possible Verification

Admin may verify:

- Batch year
- Identity
- Phone number
- Alumni status

---

# 11. Account Status System

## Recommended Statuses

```text
pending
active
inactive
suspended
blocked
```

---

## Status Rules

| Status | Login Allowed |
|---|---|
| Pending | NO |
| Active | YES |
| Inactive | NO |
| Suspended | NO |
| Blocked | NO |

---

# 12. Password Rules

## Recommended Rules

- Minimum 8 characters
- At least 1 uppercase
- At least 1 lowercase
- At least 1 number
- At least 1 special character

---

# 13. Password Hashing

Use:

```text
Laravel default hashing
```

Recommended:

```text
bcrypt or argon2
```

---

# 14. Forgot Password Flow

## Recommended Flow

```text
Forgot Password
   ↓
Phone or Email Verification
   ↓
OTP or Reset Link
   ↓
Password Reset
```

---

## Initial Version Recommendation

Use:

```text
Email reset link
```

Later:

```text
SMS OTP
```

---

# 15. Session Management

Recommended:

- Session regeneration after login
- Automatic session invalidation after logout
- CSRF protection enabled
- Secure cookies

---

# 16. Login Security Rules

## Security Features

- Rate limiting
- Login throttling
- Failed login protection
- Secure session cookies
- CSRF protection
- XSS protection

---

## Login Attempt Rule

Example:

```text
5 failed attempts
→ temporary lock
```

---

# 17. Middleware Architecture

## Middleware Types

| Middleware | Purpose |
|---|---|
| auth | Authentication check |
| guest | Guest restriction |
| verified | Verification check |
| permission | Permission check |
| role | Role check |

---

# 18. Role-Based Redirect System

After login:

| Role | Redirect |
|---|---|
| Super Admin | Admin Dashboard |
| Admin | Admin Dashboard |
| Treasurer | Treasurer Dashboard |
| Committee | Committee Dashboard |
| Advisor | Advisor Dashboard |
| Member | Member Dashboard |

---

# 19. Member Dashboard Authentication

Members should only access:

- Own profile
- Own chada history
- Own donations
- Public projects
- Public notices
- Help requests

---

# 20. Admin Authentication Rules

Admins should access:

- Member management
- Project management
- Financial management
- Reports
- Notices
- Settings

based on permissions.

---

# 21. Authentication Store Structure

Frontend authentication store should manage:

```text
User Information
Roles
Permissions
Authentication Status
Token/Session State
```

---

# 22. Recommended Pinia Auth Store

```text
stores/authStore.js
```

Should manage:

- login()
- logout()
- fetchUser()
- hasPermission()
- hasRole()

---

# 23. User Profile Flow

## Member Profile Completion

Flow:

```text
Registration
   ↓
Basic Profile
   ↓
Profile Completion
   ↓
Admin Approval
```

---

# 24. Profile Update Rules

Members can update:

- Phone
- Address
- Bio
- Profession
- Organization
- Profile image

Sensitive updates may require approval.

---

# 25. Profile Image Upload Rules

## Validation Rules

| Rule | Value |
|---|---|
| Allowed Type | jpg, png, webp |
| Max Size | 2MB |
| Compression | Recommended |

---

# 26. Logout Flow

```text
Logout Request
   ↓
Session Invalidation
   ↓
Token Cleanup
   ↓
Redirect to Login
```

---

# 27. Activity Tracking

Track:

- Login time
- Logout time
- IP address
- Device information
- Failed attempts

---

# 28. Remember Me Strategy

Optional:

```text
Remember Me Checkbox
```

Use securely.

---

# 29. Email Verification

Optional initially.

Recommended later:

```text
Email verification for password recovery and notifications.
```

---

# 30. Mobile Authentication Considerations

Many users will use:

- Android phones
- Facebook browser
- Low-end devices

Therefore:

- Keep login simple
- Avoid complicated onboarding
- Optimize mobile forms
- Use large touch-friendly inputs

---

# 31. Authentication API Endpoints

Recommended structure:

```text
/api/v1/auth/login
/api/v1/auth/logout
/api/v1/auth/register
/api/v1/auth/forgot-password
/api/v1/auth/reset-password
/api/v1/auth/profile
```

---

# 32. Authentication Response Structure

## Success Response

```json
{
  "success": true,
  "message": "Login successful",
  "data": {}
}
```

---

## Error Response

```json
{
  "success": false,
  "message": "Invalid credentials",
  "errors": {}
}
```

---

# 33. Security Recommendations

## Important Rules

- Never expose sensitive user data
- Never store plain passwords
- Validate all requests
- Restrict sensitive routes
- Sanitize uploads
- Prevent brute force attacks

---

# 34. Future Authentication Expansion

Possible future upgrades:

- SMS OTP login
- Google login
- Facebook login
- Two-factor authentication
- Mobile app authentication
- Biometric authentication

---

# 35. Recommended Initial Admin Setup

Create initial:

```text
Super Admin Seeder
```

with:

- Full permissions
- Strong password
- Initial system configuration access

---

# 36. Important Development Rule

Codex-generated authentication code must NEVER:

- Skip validation
- Store raw passwords
- Hardcode roles
- Expose permissions insecurely
- Skip CSRF/session protection

---

# 37. Authentication Summary

This authentication architecture ensures:

- Secure login system
- Controlled onboarding
- Proper access control
- Scalable security architecture
- Mobile-friendly experience
- Safe financial administration

---

# 38. Next Document

## 06-member-management

Will define:

- Member module architecture
- Member lifecycle
- Profile management
- Member approval flow
- Member search/filter system
- Member directory
- Profile image management
- Member dashboard data
- Member activity tracking
- Member reporting system

