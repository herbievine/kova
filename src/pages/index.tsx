import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import { useSession, signIn, signOut } from "next-auth/react";
import Folder from "../components/Folder";
import Header from "../components/Header";
import Spacer from "../components/Spacer";
import Folders from "../layouts/Folders";

const Home: NextPage = () => {
  const user = useSession();
  const { data: rootFolder } = trpc.useQuery(["root.get"]);

  return (
    <>
      <Head>
        <title>KOVA</title>
        <meta name="description" content="KOVA" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-full h-screen bg-neutral-100">
        {user.status === "authenticated" ? (
          <div className="w-11/12 max-w-lg mx-auto h-full py-6 flex flex-col items-center text-black">
            <Header title="Folders" />
            <Spacer />
            <Folders
              folderTitle="Favorites"
              folders={rootFolder?.favorites ?? []}
            />
            <Spacer />
            <Folders folderTitle="Recents" folders={rootFolder?.recent ?? []} />
          </div>
        ) : (
          <div className="w-full h-screen flex justify-center items-center">
            <button onClick={() => signIn("github")}>Login</button>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
