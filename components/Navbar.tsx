import { UserButton } from "@clerk/nextjs";

import MobileSideBar from "./MobileSIdebar";
import { getApiLimitCount } from "@/lib/api-limit";
const Navbar = async () => {
  const apiLimitCount = await getApiLimitCount();
  return (
    <div className="flex items-center p-4">
      <MobileSideBar apiLimitCount={apiLimitCount} />

      <div
        className="flex
            z w-full justify-end"
      >
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;
