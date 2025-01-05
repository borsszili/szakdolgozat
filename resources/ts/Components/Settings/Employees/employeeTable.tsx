import React, { useState } from "react"
import { Link, useNavigate } from "react-router";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table";
import { Button } from "@/src/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/src/components/ui/alert-dialog";
import { Edit, Plus, Trash2 } from 'lucide-react';
import { deleteEmployee } from "@/ts/Actions/Settings/Employees/useDeleteEmployee";
import { motion } from "framer-motion";

interface Employee {
    id: string
    name: string
    email: string
}

const employees: Employee[] = [
    {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
    },
    {
        id: "2",
        name: "Jane Smith",
        email: "jane@example.com",
    },
]

export const EmployeeTable = () => {
    const navigate = useNavigate();
    const [isDeleting, setIsDeleting] = useState<string | null>(null);

    const MotionTableRow = motion.create(TableRow);

    const handleDelete = async (id: string) => {
        setIsDeleting(id);
        try {
            await deleteEmployee(id);
            navigate(0);
        } catch (error) {
            console.error("Failed to delete employee:", error);
        } finally {
            setIsDeleting(null);
        }
    }

    return (
        <div className="flex flex-col">
            <Button asChild className="w-30 self-end mb-5 bg-gradient-to-r from-orange-400 to-amber-500" >
                <Link to="/settings/employee/create">
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Employee
                </Link>
            </Button>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead className="w-[100px]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {employees.map((employee, index) => (
                            <MotionTableRow
                                key={employee.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                                <TableCell className="font-medium">{employee.name}</TableCell>
                                <TableCell>{employee.email}</TableCell>
                                <TableCell className="flex items-center gap-2">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        asChild
                                    >
                                        <Link to={`/settings/employees/edit/${employee.id}`}>
                                            <Edit className="h-4 w-4"/>
                                            <span className="sr-only">Edit {employee.name}</span>
                                        </Link>
                                    </Button>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <Trash2 className="h-4 w-4 text-red-500"/>
                                                <span className="sr-only">Delete {employee.name}</span>
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Delete Employee</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Are you sure you want to delete {employee.name}? This action cannot
                                                    be undone.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction
                                                    onClick={() => handleDelete(employee.id)}
                                                    disabled={isDeleting === employee.id}
                                                    className="bg-red-500 hover:bg-red-600"
                                                >
                                                    {isDeleting === employee.id ? "Deleting..." : "Delete"}
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
