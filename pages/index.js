import Head from "next/head";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";

export default function Home() {
  const { currentUser, theme } = useAuth();
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
    <div className="h-screen">
      <Head>
        <title>PortFolder</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
}
