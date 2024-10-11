import GetCurrentUser from "@/components/GetCurrentUser";
import Loading from "@/components/Loading";
import { cookies } from "next/headers";
import React, { Suspense, ReactNode } from "react";

// Define the type for the HomeLayout props, including 'children'
interface HomeLayoutProps {
  children: ReactNode; // Explicitly type 'children' as ReactNode
}

const HomeLayout = async ({ children }: HomeLayoutProps) => {
  // Get cookies in the server environment
  const cookiesList = cookies();
  const token = cookiesList.get("token");

  return (
    <>
      {token ? (
        // Fetch user data conditionally if token is present
        <Suspense fallback={<Loading />}>
          <GetCurrentUser />
        </Suspense>
      ) : null}
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </>
  );
};

export default HomeLayout;
