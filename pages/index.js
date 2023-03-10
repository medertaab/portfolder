import Head from "next/head";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";

export default function Home() {
  const { currentUser } = useAuth();
  const router = useRouter();

  // If not signed up -> login page
  if (!currentUser) {
    router.push("/login");
  }

  // If signed up but not set up yet -> set up page
  if (currentUser && !currentUser.displayName) {
    router.push("/setup");
  }

  // If signed up and set up -> own page
  if (currentUser && currentUser.displayName) {
    router.push(`/${currentUser.displayName}`);
  }

  return (
    <div>
      <Head>
        <title>PortFolder</title>
        <meta name="description" content="Compact portfolio maker" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/portfolder_favicon.ico" />
      </Head>
    </div>
  );
}
