import Link from "next/link";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { ExternalLink, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const pages = [
    {
      name: "Home",
      id: 1,
      link: "dashboard",
    },
    {
      name: "Chamados",
      id: 2,
      link: "dashboard/chamados",
    },
    {
      name: "Portal de Chamados",
      id: 3,
      link: "http://10.71.201.251/apps/suporte_mis/dashboardAdm",
    },
  ];
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };
  return (
    <main className="h-screen bg-[#0C0A09]/80">
      <div className="h-full w-48 border flex flex-col py-8 justify-between items-center">
        <div>
          <div className="space-y-2 my-2 flex flex-col items-center">
            <ul className="flex gap-2">
              <li className="h-5 w-5 rounded-full bg-hidden"></li>
              <li className="h-5 w-5 rounded-full bg-yellow-400"></li>
            </ul>
            <ul className="flex gap-2">
              <li className="h-5 w-5 rounded-full bg-sky-600"></li>
              <li className="h-5 w-5 rounded-full bg-orange-600"></li>
            </ul>
          </div>

          <Separator className="w-full" />
          <Label>Dashboard</Label>
        </div>
        <div>
          <ul className="cursor-pointer">
            {pages.map((page) => {
              return (
                <li
                  key={page.id}
                  className="hover:text-primary text-[0.8rem] mb-1">
                  <Link
                    href={page.link}
                    className="flex gap-1.5"
                    target={page.id == 3 ? "__blank" : ""}>
                    {page.name}
                    {page.id == 3 ? (
                      <ExternalLink width={14} className="relative -top-2" />
                    ) : (
                      ""
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex flex-col items-center gap-5 w-full">
          <Separator className="w-full" />
          <Button className="w-14 " onClick={handleLogout}>
            <LogOut width={20} height={20} />
          </Button>
        </div>
      </div>
    </main>
  );
}
