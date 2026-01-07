import Link from "next/link";

export default function Signup() {
  return (
    <>
      <table>
        <tbody>
        <tr>
          <td>First Name:</td>
          <td><input type="text" name="fname" /></td>
        </tr>

        <tr>
          <td>Last Name:</td>
          <td><input type="text" name="lname" /></td>
        </tr>

     <tr>
          <td>Username:</td>
          <td><input type="text" name="uname" /></td>
        </tr>

        <tr>
          <td>Email Address:</td>
          <td><input type="email" name="email" /></td>
        </tr>

     <tr>
          <td>Password:</td>
          <td><input type="password" name="password" /></td>
        </tr>

        <tr>
          <td>Confirm Password:</td>
          <td><input type="password" name="confirmPassword" /></td>
        </tr>

        <tr>
          <td></td>
          <td>
            <button type="submit">Signup</button>
          </td>
        </tr>
        </tbody>
      </table>

      <br />
      <Link href="/HomePage/LogIn">
        <button>Already have an account? Login</button>
      </Link>
    </>
  );
}
