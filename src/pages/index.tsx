import { type InferGetServerSidePropsType } from "next";
import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const getUrl = (
  ha_instance: string,
  client_id = "http://localhost:3000",
  redirect_uri = "http://localhost:3000"
) =>
  `${ha_instance}/auth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}`;

const Home = ({
  provider,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: sessionData } = useSession();
  const { query } = useRouter();

  const [url, setUrl] = useState("");

  useEffect(() => {
    const code = query?.code;
    if (code) {
      console.log(code);
    }
  }, [query]);

  return (
    <>
      <Head>
        <title>HA - Dashboard</title>
      </Head>

      <nav className="navbar bg-base-100">
        <div className="navbar-start">
          <a className="btn-ghost btn text-xl normal-case">Home Assistant</a>
        </div>
        <div className="navbar-end">
          {sessionData?.user?.name ? (
            <div className="dropdown-end dropdown">
              <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
                <div className="w-10 rounded-full">
                  <Image
                    src={sessionData.user.image || ""}
                    alt="profile-picture"
                    width={40}
                    height={40}
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu rounded-box menu-sm z-[1] mt-3 w-52 bg-base-100 p-2 shadow"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <button onClick={() => void signOut()}>Logout</button>
                </li>
              </ul>
            </div>
          ) : (
            <button onClick={() => void signIn(provider?.id)} className="btn">
              Sign in with Google
            </button>
          )}
        </div>
      </nav>
      <main className="">
        <div className="flex items-end justify-center gap-2">
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Home Assistant Domain</span>
            </label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="http://homeassistant.local:8123"
              className="input-bordered input-success input w-full max-w-xs placeholder-gray-500"
            />
          </div>
          <a href={getUrl(url)} className="btn-primary btn mt-4">
            Connect
          </a>
        </div>
      </main>
    </>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const provider = await getProviders();

  return {
    props: {
      provider: provider?.google ?? null,
    },
  };
};
