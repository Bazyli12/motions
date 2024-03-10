"use client";

import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import useSidebar from "../hooks/use-sidebar";

const Header = () => {
    const { isOpen, setIsOpen } = useSidebar();

    return (
        <header className="flex justify-center py-4">
            <nav className="container flex justify-start items-center">
                <Menu
                    className={cn(
                        "text-neutral-800 hover:text-neutral-500 cursor-pointer transition-colors duration-200 ease-in-out"
                    )}
                    onClick={() => setIsOpen((isOpen) => !isOpen)}
                />
            </nav>
        </header>
    );
};

export default Header;
