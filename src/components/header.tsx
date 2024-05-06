import { FolderPlus, LineChart, Search, UserRoundPlus } from "lucide-react";
import { NavLink } from "./nav-link";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { AccountMenu } from "./account-menu";

export default function Header() {
  return (
    <div className="border-b border-zinc-800">
      <div className="flex h-20 items-center gap-6 px-6">
        <img
          src="/logo.png"
          alt="logo dashboard"
          className="w-14 cursor-pointer"
        />
        <Separator orientation="vertical" className="h-10 " />
        <nav className="flex items-center space-x-4 lg:space-x-6">
          <NavLink to="/"><LineChart/> Dashboard</NavLink>
          <Popover>
            <PopoverTrigger className="flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-foreground data-[current=true]:text-foreground">
              <UserRoundPlus />
              Registrar Pessoa
            </PopoverTrigger>
            <PopoverContent className="gap-3 grid">
              <h1 className="font-medium text-md">Você deseja registrar</h1>
              <Separator orientation="horizontal" />
              <div className="flex justify-around">
                <NavLink to="/create/victim">
                  <Button className="hover:bg-purple-700 hover:text-white">
                    Vitima
                  </Button>
                </NavLink>
                <NavLink to="/create/aggressor">
                  <Button className="hover:bg-purple-700 hover:text-white">
                    Agressor
                  </Button>
                </NavLink>
              </div>
            </PopoverContent>
          </Popover>
          <NavLink to="/create/ocurrence">
            <FolderPlus />
            Registrar Caso
          </NavLink>
          <NavLink to="/search">
            <Search />
            Proucurar
          </NavLink>
        </nav>
        <Separator orientation="vertical" className="h-10 ml-auto" />
        <div className="flex items-center">
          <AccountMenu />
        </div>
      </div>
    </div>
  );
}
