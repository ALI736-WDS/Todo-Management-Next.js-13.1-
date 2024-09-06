import { /* useEffect, */ useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn /* , useSession */ } from "next-auth/react";
import Head from "next/head";

//toast
import { toast } from "react-toastify";

function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  // const { status } = useSession();

  //authenticated in client
  // useEffect(() => {
  //   if (status === "authenticated") router.replace("/");
  // }, [status]);

  const loginHandler = async () => {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    // console.log(res);

    if (res.ok) {
      router.push("/profile");
      toast.success("You Login Successfully!");
    }
    if (res.error) {
      toast.error("The User Doesn't Exist !");
    }
  };

  return (
    <>
      <Head>
        <title> Login </title>
      </Head>

      <div className="signin-form">
        <h3> Login Form </h3>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={loginHandler}> Login </button>

        <div>
          <p> Create an account? </p>
          <Link href="/signup"> Sign up </Link>
        </div>
      </div>
    </>
  );
}

export default SignInPage;
