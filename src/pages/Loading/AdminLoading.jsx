import { SklLoading } from "../../components";

const AdminLoading = () => {
  return (
    <>
      <div className="container mx-auto px-4 sm:px-0">
        <SklLoading
          styles="w-[400px] h-[40px] mt-12"
          innerStyles="rounded-full"
        />
        <div className="flex items-center gap-6 mt-12">
          <SklLoading
            styles="w-1/3 h-[200px] rounded-none"
            innerStyles="rounded-md"
          />
          <SklLoading
            styles="w-1/3 h-[200px] rounded-none"
            innerStyles="rounded-md"
          />
          <SklLoading
            styles="w-1/3 h-[200px] rounded-none"
            innerStyles="rounded-md"
          />
        </div>
        <div className="flex items-center justify-end">
          <SklLoading
            styles="w-[400px] h-[40px] mt-12"
            innerStyles="rounded-full"
          />
        </div>
        <div className="flex items-center">
          <SklLoading
            styles="w-[400px] h-[40px] mt-12"
            innerStyles="rounded-full"
          />
        </div>
        <div className="flex items-center gap-3 flex-wrap my-12">
          {Array.from({ length: 12 }).map((item) => (
            <SklLoading styles="w-[300px] h-[300px]" innerStyles="rounded-md" />
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminLoading;
