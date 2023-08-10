import Image from "next/image";

export const Loader = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900">
        <Image alt="logo" src="/logo.png" width={48} height={48} />
      </div>
    </div>
  );
};
