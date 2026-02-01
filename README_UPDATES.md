# What's included in this update

Generated: 2026-02-01T01:12:09.352357Z

- Added `nixpacks.toml` to make Railway builds reliable with pnpm (no frozen lockfile).
- Added simple password-based admin login endpoint: POST `/api/admin/login`.
- Updated `/admin` page to use password login (no OAuth required).
- Replaced heavy images in `client/public/images` with tiny placeholders (same filenames) to keep the repo lightweight.
- Added Arabic deployment guide: `README_RAILWAY_AR.md`.
