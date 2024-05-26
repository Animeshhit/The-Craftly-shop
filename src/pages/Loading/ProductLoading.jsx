import React from "react";
import { SklLoading } from "../../components";

const ProductLoading = () => {
  return (
    <section>
      <div className="container mx-auto px-4 sm:px-0 my-6">
        <SklLoading styles="w-[350px] h-[40px]" innerStyles="rounded-md" />
        <div className="flex gap-12 justify-between my-6">
          <SklLoading styles="w-1/2 h-[400px]" />
          <div className="w-1/2">
            <SklLoading styles="w-full h-[40px]" innerStyles="rounded-md" />
            <SklLoading
              styles="w-full my-3 h-[40px]"
              innerStyles="rounded-md"
            />
            <SklLoading styles="w-2/4 h-[40px]" innerStyles="rounded-md" />
            <SklLoading
              styles="w-full mt-8 h-[20px]"
              innerStyles="rounded-md"
            />
            <SklLoading
              styles="w-full mt-2 h-[20px]"
              innerStyles="rounded-md"
            />
            <SklLoading
              styles="w-full mt-2 h-[20px]"
              innerStyles="rounded-md"
            />
            <SklLoading
              styles="w-full mt-2 h-[20px]"
              innerStyles="rounded-md"
            />
            <SklLoading
              styles="w-full mt-2 h-[20px]"
              innerStyles="rounded-md"
            />
            <SklLoading
              styles="w-full mt-2 h-[20px]"
              innerStyles="rounded-md"
            />
            <SklLoading styles="w-2/4 mt-2 h-[20px]" innerStyles="rounded-md" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductLoading;
