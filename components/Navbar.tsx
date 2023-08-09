
import { UserButton } from "@clerk/nextjs";

import MobileSideBar from "./MobileSIdebar";
const Navbar = () => {
    return (
        <div className="flex items-center p-4">

            <MobileSideBar />


            <div className="flex
            z w-full justify-end">
                <UserButton afterSignOutUrl='/' />
            </div>
        </div>

    );


}


export default Navbar;