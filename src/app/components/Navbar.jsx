// Next Link makes Next prefetch the page in the browser, so user clicks on link and super fast load.
import Link from "next/link";
import Image from "next/image";
import Logo from "./dojo-logo.png";

export default function Navbar() {
  return (
    <nav>
      {/* Image: if we don't supply height, it's autoscaled. Default quality isn't 100. Blur looks at colors in the image and creates a blur effect while the img loads */}
      <Image
        src={Logo}
        alt="Dojo Helpdesk logo"
        width={70}
        quality={100}
        placeholder="blur"
      />
      <h1>Dojo Helpdesk</h1>
      <Link href="/">Dashboard</Link>
      <Link href="/tickets">Tickets</Link>
    </nav>
  );
}
