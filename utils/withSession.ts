import { withIronSession } from "next-iron-session";

export default function withSession(handler: any) {
  return withIronSession(handler, {
    password: '215210a6-ad5c-45a8-99db-ae25dca79eaf',
    cookieName: "schwipe.cookie",
    cookieOptions: {
      // the next line allows to use the session in non-https environements like
      // Next.js dev mode (http://localhost:3000)
      secure: process.env.NODE_ENV === "production",
    },
  });
}