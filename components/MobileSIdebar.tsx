'use client'
import { GiHamburgerMenu } from 'react-icons/gi';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import Sidebar from './Sidebar';
import { useState, useEffect } from 'react';

const MobileSideBar = () => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return null
    }



    return (
        <Sheet>
            <SheetTrigger>
                <Button
                    className="
                md:hidden
                "
                    variant='ghost'
                    size='icon'
                >
                    <GiHamburgerMenu className="w-6 h-6" />
                </Button>
            </SheetTrigger>
            <SheetContent side='left' className="p-0">
                <Sidebar />
            </SheetContent>
        </Sheet>
    );
}

export default MobileSideBar;