import Nav from "@/components/navbar";
import Menu from "@/components/menu";
import Foot from "@/components/foot";

export default function MenuLayout({
  children, // will be a page or nested layout
}) {
  return (
    <div className="flex">
      <Menu></Menu>
      <div className="w-full">
        <Nav></Nav>
        {children}
        <Foot></Foot>
      </div>
    </div>
  );
}
