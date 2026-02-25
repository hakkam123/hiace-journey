import { Link, useLocation } from "react-router-dom";
import { Bus } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
    { to: "/", label: "Home" },
    { to: "/rute", label: "Rute" },
    { to: "/jadwal", label: "Jadwal" },
    { to: "/bantuan", label: "Bantuan" },
];

const Navbar = () => {
    const { pathname } = useLocation();

    return (
        <header className="sticky top-0 z-50 bg-[hsl(220,15%,12%)]/95 backdrop-blur-xl border-b border-white/10">
            <div className="container flex items-center justify-between h-16 px-4">
                <Link to="/" className="flex items-center gap-2.5 group">
                    <img src="/image/3rhiace logo.png" alt="3RHiace" className="h-9 w-auto" />
                    <span className="font-bold text-lg text-white/90 group-hover:text-white transition-colors tracking-tight">3RHiace</span>
                </Link>
                <nav className="hidden sm:flex items-center gap-8 text-sm font-medium text-white/60">
                    {navLinks.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={cn(
                                "hover:text-white transition-colors",
                                pathname === link.to && "text-white font-semibold"
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
