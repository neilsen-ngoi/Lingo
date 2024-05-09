import { auth } from "@clerk/nextjs/server";

const adminIds = ["user_2fDHRbMtBMIClZ0R4HQRqdbeQ7n"];

export const isAdmin = () => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  return adminIds.indexOf(userId) !== -1;
};
