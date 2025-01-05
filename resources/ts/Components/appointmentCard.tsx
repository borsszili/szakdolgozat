import React, {useEffect} from "react";
import {Card, CardContent} from "@/src/components/ui/card";
import {Sheet, SheetTrigger, SheetContent, SheetDescription, SheetHeader, SheetTitle} from "@/src/components/ui/sheet";
import {Popover, PopoverTrigger, PopoverContent} from "@/src/components/ui/popover";
import {Button} from "@/src/components/ui/button";
import {MoreVertical} from "lucide-react";
import {useAppSelector} from "@/ts/Hooks/useAppDispatch";
import {format} from "date-fns";

interface AppointmentCardProps {
    id: number
    title: string
    date: Date
    instructor: string
    employee_has_service: EmployeeHasService
}

interface EmployeeHasService {
    employee_id: number,
    id: number,
    service_id: number,
    employee: Employee,
    service: Service
}

interface Employee {

}

interface Service {

}

export const AppointmentCard = ({id, title, date, start, end, duration, employee_has_service, location, price, currency}: AppointmentCardProps) =>  {
    const handleCancel = (id: number) => {

    }

    const isMobile = useAppSelector((state) => state.mobile.isMobile)
    const startParsed = new Date(start);

    const AppointmentDetails = () => (
        <div className="space-y-2">
            {/*<p><strong>Date:</strong> {format(date, 'MMMM d, yyyy')}</p>
                <p><strong>Time:</strong> {format(date, 'h:mm a')}</p>
*/}
            {/*<p><strong>Instructor:</strong> {instructor}</p>*/}
            <p><strong>Location:</strong> {location}</p>
            <Button
                variant="destructive"
                onClick={() => handleCancel(id)}
                className="mt-4"
            >
                Cancel Appointment
            </Button>
        </div>
    )

    const DetailsDesktop = () => (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <AppointmentDetails />
            </PopoverContent>
        </Popover>
    )

    const DetailsMobile = () => (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                </Button>
            </SheetTrigger>
            <SheetContent side="bottom">
                <SheetHeader>
                    <SheetTitle>{title}</SheetTitle>
                    <SheetDescription>
                        <AppointmentDetails />
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )

    return (
        <Card className="flex items-stretch gap-4 p-4 w-full relative">
                <div
                    className="flex min-w-[80px] flex-col items-center justify-center rounded-lg bg-orange-400 p-2 text-white self-stretch"
                >
                    {/*<span className="text-2xl font-bold">{format(date, 'd')}</span>
                        <span className="text-sm">{format(date, 'EEEE')}</span>
            <span className="text-sm font-semibold">{format(date, 'MMMM')}</span>*/}
                </div>
                <div className="flex flex-col space-y-1 flex-grow">
                    <h3 className="font-semibold">{title}</h3>
                    {/*<p className="text-sm text-muted-foreground">{employee_has_service.employee.name}</p>*/}
                    <p className="text-sm">
                        {format(start, 'HH:ii')} - {format(end, 'HH:ii')} {/*duration*/}
                    </p>
                    <div className="flex items-center gap-2">
                        <span className="font-semibold">{currency}{price}</span>
                    </div>
                </div>
                {isMobile ? <DetailsMobile/> : <DetailsDesktop/>}
        </Card>
    )
}
