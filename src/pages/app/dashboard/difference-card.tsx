import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "react-query";
import { Loader2, Smile, Frown } from "lucide-react";
import { CardSkeleton } from "./card-skeleton";
import { getDifferencePreviousMonth } from "@/api/get-difference-month";


export function DiffereneCard() {
  const {
    data: quantityTotalInMonth,
    isFetching: isLoadingQuantityTotalInMonth,
  } = useQuery({
    staleTime: Infinity,
    queryFn: getDifferencePreviousMonth,
  });

  const diff = quantityTotalInMonth?.diffFromLastMonth ?? 0
  const total = quantityTotalInMonth?.amount ?? 0
  return (
    <Card className="bg-zinc-950 row-span-3 col-span-1 h-full border-zinc-800 text-white">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Diferença (mês)
        </CardTitle>
        {isLoadingQuantityTotalInMonth ? (
          <Loader2 className=" animate-spin text-muted-foreground" />
        ) : (
            <>
              {diff > 0
                  ? <Smile/>
                  : <Frown/>}
            </>
  
        )}
      </CardHeader>
      <CardContent className="space-y-1">
        {quantityTotalInMonth ? (
            <div className="flex items-center">
            <span className="text-3xl font-bold">{total}</span>
            <p className="text-md text-muted-foreground">
            <span
              className={
                diff > 0
                  ? 'text-emerald-500'
                  : 'text-red-500'
              }
            >
              %
            </span>{'  '}
            em relação ao mês passado
          </p></div>
        ) : (
          <CardSkeleton />
        )}
      </CardContent>
    </Card>
  );
}
