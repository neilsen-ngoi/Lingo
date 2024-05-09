// import { authMiddleware } from "@clerk/nextjs";

// export default authMiddleware({
//   publicRoutes: ["/", "/api/webhooks/stripe",],
//   ignoredRoutes: [],
// });

// export const config = {
//   matcher: [
//     "/((?!.+.[w]+$|_next).*)",
//     "/",
//     "/(api|trpc)(.*)",
//     "/((?!api|static|.*\\..*|_next).*)",
//   ],
// };

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/learn(.*)",
  "/courses(.*)",
  "/leaderboard(.*)",
  "/shop(.*)",
  "/quests(.*)",
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
