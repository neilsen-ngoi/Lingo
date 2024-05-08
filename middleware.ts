import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "/api/webhooks/stripe"],
  ignoredRoutes: [],
});

export const config = {
  matcher: [
    "/((?!.+.[w]+$|_next).*)",
    "/",
    "/(api|trpc)(.*)",
    "/((?!api|static|.*\\..*|_next).*)",
  ],
};
