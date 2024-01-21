import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="mt-10 py-5 flex flex-col lg:flex-row items-center lg:justify-between text-gray-500 mx-auto max-w-screen-xl">
      {/* Info Section */}
      <div className="flex flex-col gap-4 lg:w-1/3 mt-24">
        <div className="flex items-center gap-4">
          <Image src="/images/logo.png" alt="safai stories" width={50} height={50} />
          <h1 className="text-xl font-bold">Safai Stories</h1>
        </div>
        <p className="font-light">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim
          necessitatibus similique aspernatur obcaecati veritatis. Aperiam cum
          porro sequi, totam minima consequuntur, aspernatur deleniti vero
          repellendus dorales.
        </p>
        <div className="flex gap-4">
          <Image src="/images/facebook.png" alt="" width={18} height={18} />
          <Image src="/images/instagram.png" alt="" width={18} height={18} />
          <Image src="/images/tiktok.png" alt="" width={18} height={18} />
          <Image src="/images/youtube.png" alt="" width={18} height={18} />
        </div>
      </div>

      {/* Links Section */}
      <div className="flex gap-10 mt-24">
        <div className="flex flex-col gap-4 font-light">
          <span className="font-bold">Links</span>
          <Link href="/">Homepage</Link>
          <Link href="/">Blog</Link>
          <Link href="/">About</Link>
          <Link href="/">Contact</Link>
        </div>

        <div className="flex flex-col gap-4 font-light">
          <span className="font-bold">Social</span>
          <Link href="/">Facebook</Link>
          <Link href="/">Instagram</Link>
          <Link href="/">Tiktok</Link>
          <Link href="/">Youtube</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
