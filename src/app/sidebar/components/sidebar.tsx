"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, stagger, useAnimate } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import useSidebar from "../hooks/use-sidebar";

const sidebar = [
    [
        {
            title: "Home",
            href: "/",
        },
        {
            title: "Blog",
            href: "/blog",
        },
        {
            title: "Portfolio",
            href: "/portfolio",
        },
        {
            title: "Services",
            href: "/services",
        },
        {
            title: "Testimonials",
            href: "/testimonials",
        },
        {
            title: "FAQ",
            href: "/faq",
        },
        {
            title: "Pricing",
            href: "/pricing",
        },
        {
            title: "Team",
            href: "/team",
        },
    ],
    [
        {
            title: "Careers",
            href: "/careers",
        },
        {
            title: "Terms",
            href: "/terms",
        },
        {
            title: "Privacy",
            href: "/privacy",
        },
        {
            title: "About",
            href: "/about",
        },
        {
            title: "Contact",
            href: "/contact",
        },
    ],
];

const Sidebar = () => {
    const [selected, setSelected] = useState<null | number>(null);
    const { isOpen, setIsOpen } = useSidebar();
    const [scope, animate] = useAnimate();
    const pathname = usePathname();

    useEffect(() => {
        animate([
            [
                "#backdrop",
                {
                    opacity: isOpen ? 1 : 0,
                    backgroundColor: isOpen
                        ? "rgba(0, 0, 0, 0.3)"
                        : "rgba(0, 0, 0, 0.0)",
                },
                { duration: 0.5, ease: "easeInOut" },
            ],
        ]);
        animate(
            isOpen
                ? [
                      [
                          "#sheet .stagger",
                          {
                              transform: "translateY(100%)",
                              opacity: 0,
                          },
                          { duration: 0.0 },
                      ],
                      [
                          "#sheet",
                          { width: "450px" },
                          { ease: [0.65, 0, 0.35, 1], duration: 0.5 },
                      ],
                      [
                          "#sheet .stagger",
                          {
                              transform: "translateY(0%)",
                              opacity: 1,
                          },
                          {
                              ease: "backInOut",
                              duration: 0.5,
                              delay: stagger(0.05, { startDelay: -0.5 }),
                          },
                      ],
                  ]
                : [
                      [
                          "#sheet .stagger",
                          {
                              opacity: 0,
                          },
                          { duration: 0.1 },
                      ],
                      [
                          "#sheet",
                          { width: "0" },
                          { ease: "easeInOut", duration: 0.5, delay: -0.1 },
                      ],
                  ]
        );
    }, [isOpen]);

    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    return (
        <div ref={scope}>
            <div
                id="backdrop"
                className="fixed pointer-events-none z-40 top-0 left-0 h-screen w-screen"
            />
            <div
                id="sheet"
                className={cn(
                    "z-50 bg-foreground w-0 fixed left-0 h-screen overflow-hidden py-8"
                )}
            >
                <div className="stagger pl-10 absolute top-6">
                    <X
                        className={cn("text-white cursor-pointer size-8")}
                        onClick={() => setIsOpen((isOpen) => !isOpen)}
                    />
                </div>
                <ul className="px-12 mb-12 pt-24">
                    {sidebar[0].map((item, index) => (
                        <li key={index} className="stagger flex">
                            <motion.div
                                className="flex"
                                animate={{
                                    color:
                                        selected === null
                                            ? "rgba(255, 255, 255, 1.0)"
                                            : selected === index
                                            ? "rgba(255, 255, 255, 1.0)"
                                            : "rgba(255, 255, 255, 0.4)",
                                }}
                                onMouseOver={() => {
                                    setSelected(index);
                                }}
                                onMouseOut={() => {
                                    setSelected(null);
                                }}
                            >
                                <Link
                                    href={"/sidebar" + item.href}
                                    className={cn(
                                        "py-2 text-[30px]/[42px] font-semibold"
                                    )}
                                >
                                    {item.title}
                                </Link>
                            </motion.div>
                        </li>
                    ))}
                </ul>
                <ul className="px-12">
                    {sidebar[1].map((item, index) => (
                        <li key={index} className="stagger flex">
                            <motion.div
                                className="flex"
                                animate={{
                                    color:
                                        selected === null
                                            ? "rgba(255, 255, 255, 1.0)"
                                            : selected ===
                                              sidebar[0].length + index
                                            ? "rgba(255, 255, 255, 1.0)"
                                            : "rgba(255, 255, 255, 0.4)",
                                }}
                                transition={{ duration: 0.2 }}
                                onMouseOver={() => {
                                    setSelected(sidebar[0].length + index);
                                }}
                                onMouseOut={() => {
                                    setSelected(null);
                                }}
                            >
                                <Link
                                    href={"/sidebar" + item.href}
                                    className={cn(
                                        "text-[16px]/[32px] font-normal"
                                    )}
                                >
                                    {item.title}
                                </Link>
                            </motion.div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
