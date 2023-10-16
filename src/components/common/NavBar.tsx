import Link from "next/link";

const links = [
  { name: "Main", href: "/" },
  { name: "About", href: "/about" },
  { name: "Posts", href: "/posts" },
];

export default function NavBar() {
  return (
    <div className="flex gap-2 mx-2 my-4">
      {links.map((link) => (
        <Link key={link.name} href={link.href} className="underline text-lg text-teal-400 hover:text-teal-500">
          {link.name}
        </Link>
      ))}
    </div>
  );
}
