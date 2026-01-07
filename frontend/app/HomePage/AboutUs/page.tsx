import Link from "next/link";

export default function AboutUs() {
  return (
    <>
      <h1>About Us</h1>
      <p>
        Welcome to <b>Tour Plan Management System</b> – your trusted platform for 
        discovering, planning, and booking tours with ease. Our system connects 
        customers with different travel agencies that provide tour packages, tickets, 
        and custom travel services.
      </p>

      <h2>Our Mission</h2>
      <p>
        We aim to make travel planning simple, reliable, and affordable by 
        partnering with trusted agencies and offering customers a smooth booking 
        experience.
      </p>

      <h2>Our Policy</h2>
      <ul>
        <li>✅ Transparent pricing with no hidden fees</li>
        <li>✅ Secure and verified bookings</li>
        <li>✅ 24/7 customer support</li>
        <li>✅ Easy cancellation and refund process</li>
      </ul>

      <h2>Contact Us</h2>
      <p>
        📍 Address: House #12, Road #5, Uttara, Dhaka, Bangladesh <br />
        📞 Phone: +880 1234 567 890 <br />
        📧 Email: support@tourplan.com
      </p>

      <br />
      <Link href="/HomePage">
        <button>🏠 Back to Home</button>
      </Link>
    </>
  );
}
