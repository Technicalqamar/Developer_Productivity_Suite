# Authentication Testing

Manual testing documentation for all authentication features completed so far.

---

## Phase 3.2A - Initial Admin Seeder

### Checklist

- [ ] Admin is automatically created if no admin exists.
- [ ] Admin is created only once.
- [ ] Server starts successfully after seeding.
- [ ] Restarting the server does not create another admin.
- [ ] Console displays:
  - `✔ Initial admin created successfully.`
  - `✔ Initial admin already exists.`
- [ ] Admin role is correctly stored in MongoDB.

### Status

Completed ✅

---

## Phase 3.2B - Developer Registration

### Checklist

- [ ] Developer registration API returns HTTP 201.
- [ ] Duplicate email returns HTTP 409.
- [ ] Invalid input returns HTTP 400.
- [ ] Password confirmation validation works.
- [ ] Password is stored as a bcrypt hash.
- [ ] Password is never returned in API responses.
- [ ] Backend ignores any incoming role value.
- [ ] Sending `role=admin` still stores `role=developer`.
- [ ] Developer account is successfully stored in MongoDB.

### Status

Completed ✅
