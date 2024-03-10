import { atom, useAtom } from "jotai";

const sidebarAtom = atom(false);

const useSidebar = () => {
    const [isOpen, setIsOpen] = useAtom(sidebarAtom);

    return { isOpen, setIsOpen };
};

export default useSidebar;
