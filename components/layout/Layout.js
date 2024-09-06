import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

//svg
import { VscListSelection } from "react-icons/vsc";
import { BiMessageSquareAdd } from "react-icons/bi";
import { RxDashboard } from "react-icons/rx";
import { FiLogOut } from "react-icons/fi";

function Layout({ children }) {
  const { status } = useSession();

  const logOutHandler = () => {
    signOut();
  };

  return (
    <div className="container">
      <header className="header">
        <h2> ALI736-WDS | Todo App </h2>

        {status === "authenticated" ? (
          <button onClick={logOutHandler}>
            Logout <FiLogOut />
          </button>
        ) : null}
      </header>

      <div className="container--main">
        <aside>
          <p> Welcome Todo </p>
          <ul>
            <li>
              <VscListSelection />
              <Link href="/"> Todos </Link>
            </li>
            <li>
              <BiMessageSquareAdd />
              <Link href="/add-todo"> Add Todo </Link>
            </li>
            <li>
              <RxDashboard />
              <Link href="/profile"> Profile </Link>
            </li>
          </ul>
        </aside>

        <section> {children} </section>
      </div>
    </div>
  );
}

export default Layout;
