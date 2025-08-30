import Link from "next/link";

export default function Home(){
    return (
        <>
        {/* <h1>ABOUT</h1>
        <h5>This is about page</h5> */}
        <Link href="/HomePage/LogIn">
        <button >
          Get Started
        </button>
      </Link>
    
       
        </>
    );
}