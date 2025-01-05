import { ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useLocation } from "react-router-dom"

interface AnimatedLayoutProps {
    children: ReactNode
}

export const AnimatedLayout = ({ children }: AnimatedLayoutProps) => {
    const location = useLocation()

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={location.pathname}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    )
}
