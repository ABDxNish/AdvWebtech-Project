import Link from "next/link";

export default function Login() {
  return (
    <>
      <table>
        <tr>
          <td>Username:</td>
          <td><input type="text" name="username" /></td>
        </tr>

        <tr>
          <td>Password:</td>
          <td><input type="password" name="password" /></td>
        </tr>

        <tr>
          <td></td>
          <td>
            <Link href="/HomePage/AdminDashboard">
            <button type="submit">Login</button>
            </Link>
          </td>
        </tr>
      </table>

      <br />
      <Link href="/HomePage">
        <button>Home</button>
      </Link>
    </>
  );
}
