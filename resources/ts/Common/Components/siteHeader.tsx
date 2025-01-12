import {Sheet, SheetContent, SheetTrigger} from "../../../src/components/ui/sheet";
import {Button} from "../../../src/components/ui/button";
import {Link, useNavigate} from "react-router";
import {ChevronDown, LogOut, Menu} from "lucide-react";
import {useState} from "react";
import React from "react";
import {NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuList} from "../../../src/components/ui/navigation-menu";
import {motion} from "framer-motion";
import {useFetchSubmit} from "../Hooks/useFetch";
import api from "../Config/axios";
import {Collapsible, CollapsibleTrigger, CollapsibleContent} from "@radix-ui/react-collapsible";
import {useAppSelector} from "../Hooks/useAppDispatch";

export const SiteHeader  = () => {
    const user = useAppSelector((state) => state.user.user);

    const navigate = useNavigate();
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const getUnderlineDirection = (currentPath: string, targetPath: string) => {
        const links = ["/book", "/profile", "/settings"]
        const currentIndex = links.indexOf(currentPath)
        const targetIndex = links.indexOf(targetPath)
        return currentIndex < targetIndex ? "right" : "left"
    }

    const logoutRequest = async () => {
        return await api.post("/logout");
    };

    const {data, loading , error, execute} = useFetchSubmit(logoutRequest);

    const handleLogout = async () => {
        await execute();

        if(!error) {
            navigate('/login');
        }
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center justify-between pl-4 pr-4 min-w-full">
                <div className="flex items-center">

                    {/* -------- MOBILE MENU -------- */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
                            >
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Toggle Menu</span>
                            </Button>
                        </SheetTrigger>

                        { user?.isAdmin &&
                            <SheetContent side="left" className="pr-0">
                                <nav className="flex flex-col space-y-4">
                                    <Link to="/book">Book an appointment</Link>
                                    <Link to="/profile">Profile</Link>
                                    <Collapsible
                                        open={isSettingsOpen}
                                        onOpenChange={setIsSettingsOpen}
                                        className="w-full"
                                    >
                                        <CollapsibleTrigger asChild>
                                            <button className="flex w-2/5 items-center justify-between text-sm">
                                                <span className="text-link">Settings</span>
                                                <ChevronDown
                                                    className={`h-4 w-4 transition-transform duration-200 ${
                                                        isSettingsOpen ? "rotate-180" : ""
                                                    }`}
                                                />
                                            </button>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent className="space-y-2">
                                            <Link to="/settings/services">
                                                <div className="pl-4 pt-2">Services</div>
                                            </Link>
                                            <Link to="/settings/employees">
                                                <div className="pl-4 pt-2">Employees</div>
                                            </Link>
                                        </CollapsibleContent>
                                    </Collapsible>
                                </nav>
                            </SheetContent>
                        }
                    </Sheet>
                    {/* -------- MOBILE MENU -------- */}

                    <div className="mr-4 hidden md:flex">
                        <Link to="/dashboard" className="mr-6 flex items-center space-x-2 ml-2">
                            <span className="hidden font-bold sm:inline-block">
                                Driving School Dashboard
                            </span>
                        </Link>
                        <nav className="flex items-center space-x-6 text-sm font-medium">
                            <div className="relative flex space-x-6">
                                {[
                                    {to: "/book", label: "Book an appointment"},
                                    {to: "/profile", label: "Profile"},
                                ].map((link) => (
                                    <Link
                                        key={link.to}
                                        to={link.to}
                                        className={`relative px-3 py-2 transition-colors hover:text-orange-600`}
                                        onMouseEnter={() => setHoveredLink(link.to)}
                                        onMouseLeave={() => setHoveredLink(null)}
                                    >
                                        {link.label}
                                        {hoveredLink === link.to && (
                                            <motion.div
                                                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-orange-400 to-amber-500"
                                                layoutId="underline"
                                                initial={{
                                                    width: "0%",
                                                    x: getUnderlineDirection(hoveredLink, link.to) === "right" ? "-50%" : "50%"
                                                }}
                                                animate={{
                                                    width: "100%",
                                                    x: 0
                                                }}
                                                transition={{type: "spring", stiffness: 380, damping: 30}}
                                            />
                                        )}
                                    </Link>
                                ))}
                                {user?.isAdmin &&
                                    <NavigationMenu>
                                        <NavigationMenuList>
                                            <NavigationMenuItem>
                                                <NavigationMenuTrigger
                                                    className="h-9 px-3 py-2 transition-colors hover:text-orange-600 bg-transparent hover:bg-transparent"
                                                    onMouseEnter={() => setHoveredLink("/settings")}
                                                    onMouseLeave={() => setHoveredLink(null)}
                                                    hideChevron
                                                >
                                                    Settings
                                                    {hoveredLink === "/settings" && (
                                                        <motion.div
                                                            className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-orange-400 to-amber-500"
                                                            layoutId="underline"
                                                            initial={{
                                                                width: "0%",
                                                                x: getUnderlineDirection(hoveredLink, "/settings") === "right" ? "-50%" : "50%"
                                                            }}
                                                            animate={{
                                                                width: "100%",
                                                                x: 0
                                                            }}
                                                            transition={{type: "spring", stiffness: 380, damping: 30}}
                                                        />
                                                    )}
                                                </NavigationMenuTrigger>
                                                <NavigationMenuContent>
                                                    <div className="grid gap-3 p-6 md:w-[100px] lg:w-[300px]">
                                                        <div className="grid gap-6">
                                                            <div className="grid gap-4">
                                                                <div className="grid">
                                                                    <Link
                                                                        to="/settings/service"
                                                                        className="text-orange-600 font-medium hover:underline"
                                                                    >
                                                                        Services
                                                                    </Link>
                                                                    <p className="text-sm text-muted-foreground">
                                                                        Manage and create services
                                                                    </p>
                                                                </div>
                                                                <div className="grid">
                                                                    <Link
                                                                        to="/settings/employee"
                                                                        className="text-orange-600 font-medium hover:underline"
                                                                    >
                                                                        Employees
                                                                    </Link>
                                                                    <p className="text-sm text-muted-foreground">
                                                                        Manage and create employees
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </NavigationMenuContent>
                                            </NavigationMenuItem>
                                        </NavigationMenuList>
                                    </NavigationMenu>
                                }
                            </div>
                        </nav>
                    </div>
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    className="ml-auto flex items-center gap-2"
                    onClick={handleLogout}
                >
                    <LogOut className="h-4 w-4"/>
                    <span className="hidden sm:inline">Log out</span>
                </Button>
            </div>
        </header>
    )
}
