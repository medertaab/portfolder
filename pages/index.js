import Head from "next/head";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import PageLayout from "../components/ui/PageLayout";
import IndexPage from "../components/index";

export default function Home() {
  const { currentUser } = useAuth();
  const router = useRouter();

  // If signed up but not set up yet -> set up page
  if (currentUser && !currentUser.displayName) {
    router.push("/setup");
  }

  // If signed up and set up -> own page
  if (currentUser && currentUser.displayName) {
    router.push(`/${currentUser.displayName}`);
  }

  // Hero page
  if (!currentUser)
    return (
      <PageLayout>
        <IndexPage />
      </PageLayout>
    );
}
