import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Head from "next/head";

//toast
import { toast } from "react-toastify";

function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") router.replace("/");
  }, [status]);

  const signUpHandler = async () => {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    // console.log(data);

    if (data.status === "success") {
      toast.success(data.message);
      router.push("/signin");
    } else {
      toast.error(data.message);
      // console.log(data.error);
    }
  };

  return (
    <>
      <Head>
        <title> Register </title>
      </Head>

      <div className="signin-form">
        <h3> Registration Form </h3>
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

        <button onClick={signUpHandler}> Register </button>

        <div>
          <p> have an Account? </p>
          <Link href="/signin"> Sign in </Link>
        </div>
      </div>
    </>
  );
}

export default SignUpPage;
