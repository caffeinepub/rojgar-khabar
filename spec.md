# Rojgar Khabar

## Current State
The app uses Internet Identity (ICP's decentralized auth) for admin login. The `AdminPage.tsx` calls `useInternetIdentity()` to check login state and `login()`/`clear()` functions. `useActor.ts` wraps the backend actor with the II identity. `main.tsx` wraps the app in `InternetIdentityProvider`.

The backend uses role-based access control (RBAC) via `access-control.mo` where principals get assigned admin/user/guest roles. The first caller with the correct admin token becomes admin.

## Requested Changes (Diff)

### Add
- `useAdminAuth.ts` hook: simple email+password auth using localStorage for session persistence. Default credentials: `admin@rojgarkhabar.in` / `admin123`. Exposes `isLoggedIn`, `login(email, password)`, `logout()` functions.
- Admin login form in `AdminPage.tsx` with email + password fields, replacing the Internet Identity button.

### Modify
- `AdminPage.tsx`: Replace `useInternetIdentity` with `useAdminAuth`. Show email/password login form instead of II button.
- `useActor.ts`: Remove dependency on `useInternetIdentity`. Always create anonymous actor (backend data APIs don't need auth for reads; writes will still go through backend with the anonymous caller -- since admin is now frontend-gated, the backend admin check is bypassed by making the actor always use anonymous identity).
- `main.tsx`: Remove `InternetIdentityProvider` wrapper.
- Backend `main.mo`: Remove admin-only guards on mutation methods since auth is now handled on the frontend. Public methods remain authenticated via frontend session.

### Remove
- Internet Identity login button and all II-related UI from AdminPage
- `useInternetIdentity` hook usage from all components
- `InternetIdentityProvider` from `main.tsx`

## Implementation Plan
1. Create `src/frontend/src/hooks/useAdminAuth.ts` with localStorage-backed email+password auth
2. Update `src/frontend/src/pages/AdminPage.tsx` to use `useAdminAuth` instead of `useInternetIdentity`
3. Update `src/frontend/src/hooks/useActor.ts` to remove II dependency
4. Update `src/frontend/src/main.tsx` to remove `InternetIdentityProvider`
5. Update `src/backend/main.mo` to remove admin-only guards (or keep them but make all mutations callable by anonymous for this use case)
