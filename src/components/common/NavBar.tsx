import Link from "next/link";

const links = [
  { name: "Posts", href: "/posts" },
  { name: "About", href: "/about" },
];

export default function NavBar() {
  return (
    <div className="flex mx-4 my-4 justify-between">
      <Link href={"/"} className="text-xl font-bold">
        Main
      </Link>
      <div className="flex gap-4">
        {links.map((link) => (
          <Link key={link.name} href={link.href} className="underline text-lg text-teal-400 hover:text-teal-500">
            {link.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
