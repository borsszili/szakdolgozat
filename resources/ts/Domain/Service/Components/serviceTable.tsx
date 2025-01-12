import React, { useState } from "react"
import { Link, useNavigate } from "react-router";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../../src/components/ui/table"
import { Button } from "../../../../src/components/ui/button"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../../../../src/components/ui/alert-dialog"
import { Edit, Plus, Trash2 } from 'lucide-react'
import { deleteService } from "../Actions/useDeleteService"
import { motion } from "framer-motion";

interface Service {
    id: string
    name: string
    price: number
    description: string
}

const services: Service[] = [
    {
        id: "1",
        name: "Manual Lesson",
        price: 50,
        description: "Learn to change the gears yourself",
    },
    {
        id: "2",
        name: "Automatic Lesson",
        price: 45,
        description: "Learn without the gear change",
    },
    {
        id: "3",
        name: "Manual Lesson",
        price: 50,
        description: "Learn to change the gears yourself",
    },
    {
        id: "4",
        name: "Automatic Lesson",
        price: 45,
        description: "Learn without the gear change",
    },
    {
        id: "5",
        name: "Manual Lesson",
        price: 50,
        description: "Learn to change the gears yourself",
    },
    {
        id: "6",
        name: "Automatic Lesson",
        price: 45,
        description: "Learn without the gear change",
    },
    {
        id: "7",
        name: "Manual Lesson",
        price: 50,
        description: "Learn to change the gears yourself",
    },
    {
        id: "8",
        name: "Automatic Lesson",
        price: 45,
        description: "Learn without the gear change",
    },
]

export const ServiceTable = () => {
    const navigate = useNavigate();
    const [isDeleting, setIsDeleting] = useState<string | null>(null)

    const handleDelete = async (id: string) => {
        setIsDeleting(id)
        try {
            await deleteService(id)
            navigate(0);
        } catch (error) {
            console.error("Failed to delete service:", error)
        } finally {
            setIsDeleting(null)
        }
    }

    const MotionTableRow = motion.create(TableRow);

    return (
        <div className="flex flex-col">
            <Button asChild className="w-30 self-end mb-5 bg-gradient-to-r from-orange-400 to-amber-500" >
                <Link to="/settings/service/create">
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Service
                </Link>
            </Button>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead className="hidden md:table-cell">Description</TableHead>
                            <TableHead className="w-[100px]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {services.map((service, index) => (
                            <MotionTableRow
                                key={service.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                                <TableCell className="font-medium">{service.name}</TableCell>
                                <TableCell>${service.price}</TableCell>
                                <TableCell className="hidden md:table-cell max-w-[300px] truncate">
                                    {service.description}
                                </TableCell>
                                <TableCell className="flex items-center gap-2">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        asChild
                                    >
                                        <Link to={`/settings/services/edit/${service.id}`}>
                                            <Edit className="h-4 w-4" />
                                            <span className="sr-only">Edit {service.name}</span>
                                        </Link>
                                    </Button>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <Trash2 className="h-4 w-4 text-red-500" />
                                                <span className="sr-only">Delete {service.name}</span>
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Delete Service</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Are you sure you want to delete {service.name}? This action cannot be undone.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction
                                                    onClick={() => handleDelete(service.id)}
                                                    disabled={isDeleting === service.id}
                                                    className="bg-red-500 hover:bg-red-600"
                                                >
                                                    {isDeleting === service.id ? "Deleting..." : "Delete"}
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </TableCell>
                            </MotionTableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
