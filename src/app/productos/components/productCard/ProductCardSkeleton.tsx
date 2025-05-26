import { Skeleton } from "@/components/ui/skeleton";

const ProductCardSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <Skeleton className="h-72 w-full max-w-72" />
      <Skeleton className="h-10 w-48" />
      <div className="flex gap-2 justify-between">
        <Skeleton className="h-10 w-16" />
        <Skeleton className="h-10 w-24" />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
