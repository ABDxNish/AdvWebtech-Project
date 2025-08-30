import Link from "next/link";

export default function Login(){
    return (
        <>
        {/* <h1>Company</h1>
        <h5>This is Company</h5>
         <Link href="./">About</Link> */}
          <form>
        <label>
          Username:
          <input type="text" name="username" />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>

      
      <Link href="/HomePage">
        <button>Home</button>
      </Link>
        </>
    );
}