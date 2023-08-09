// import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

const Navbar = () => {
    return (
        <div className="flex items-center p-4">

            <div className="flex
            z w-full justify-end">
                <UserButton afterSignOutUrl='/' />
            </div>




        </div>

    );


}


export default Navbar;