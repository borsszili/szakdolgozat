import {Sheet, SheetContent, SheetTrigger} from "@/src/components/ui/sheet";
import {Button} from "@/src/components/ui/button";
import {Link} from "react-router";
import {LogOut, Menu} from "lucide-react";

export const SiteHeader  = () => {
    const handleLogout = () => {
        // Implement logout logic here
        console.log("Logout clicked")
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center justify-between pl-4 pr-4 min-w-full">
                <div className="flex items-center">
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
                        <SheetContent side="left" className="pr-0">
                            <nav className="flex flex-col space-y-4">
                                <Link to="/calendar">Calendar</Link>
                                <Link to="/book">Book an appointment</Link>
                                <Link to="/profile">Profile</Link>
                            </nav>
                        </SheetContent>
                    </Sheet>
                    <div className="mr-4 hidden md:flex">
                        <Link to="/dashboard" className="mr-6 flex items-center space-x-2 ml-2">
                            <span className="hidden font-bold sm:inline-block">
                                Driving School Dashboard
                            </span>
                        </Link>
                        <nav className="flex items-center space-x-6 text-sm font-medium">
                            <Link to="/calendar">Calendar</Link>
                            <Link to="/book">Book an appointment</Link>
                            <Link to="/profile">Profile</Link>
                        </nav>
                    </div>
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    className="ml-auto flex items-center gap-2"
                    onClick={handleLogout}
                >
                    <LogOut className="h-4 w-4" />
                    <span className="hidden sm:inline">Log out</span>
                </Button>
            </div>
        </header>
    )
}
