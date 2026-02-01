export const NODE_ENV = process.env.NODE_ENV ?? "development";
export const PORT = Number(process.env.PORT ?? 3000);

// SAFE DEFAULTS so the app boots without Railway vars.
// You can override later from Railway Variables.
export const DATABASE_URL =
  process.env.DATABASE_URL
  ?? process.env.MYSQL_URL
  ?? "mysql://user:password@localhost:3306/app_db";

export const JWT_SECRET =
  process.env.JWT_SECRET
  ?? "DEV_ONLY_CHANGE_ME_123456789012345678901234";

export const ADMIN_PASSWORD =
  process.env.ADMIN_PASSWORD
  ?? "CHANGE_ME_ADMIN_PASSWORD";
