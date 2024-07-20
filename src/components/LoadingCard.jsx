import { Skeleton } from "@/shadcnui/ui/skeleton";

const LoadingCard = () => {
  return (
    <div className="rounded-lg inline-block w-full">
      <div className="product__image__container relative h-[300px]">
        <Skeleton className="w-full h-full rounded-md bg-zinc-800" />
      </div>
      <div className="product__info mt-1 pt-1 pb-3">
        <Skeleton className="w-full h-4 bg-zinc-800 rounded-full" />
        <div className="flex items-center mt-2 gap-4">
          <Skeleton className="w-full h-4 bg-zinc-800 rounded-full" />
          <Skeleton className="w-full h-4 bg-zinc-800 rounded-full" />
          <Skeleton className="w-full h-4 bg-zinc-800 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default LoadingCard;
