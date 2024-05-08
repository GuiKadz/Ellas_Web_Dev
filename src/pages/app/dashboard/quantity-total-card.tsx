import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "react-query";
import { Loader2, AlignHorizontalDistributeCenter } from "lucide-react";
import { CardSkeleton } from "./card-skeleton";
import { getTotalOcurrences } from "@/api/get-total-occurences";

export function QuantityTotalCard() {
  const { data: quantityTotal, isFetching: isLoadingQuantityTotalInMonth } =
    useQuery({
      staleTime: Infinity,
      queryFn: getTotalOcurrences,
    });

  const count = quantityTotal?.count ?? 0;
  return (
    <Card className="bg-zinc-950 row-span-3 col-span-1 h-full border-zinc-800 text-white">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Registros totais
        </CardTitle>
        {isLoadingQuantityTotalInMonth ? (
          <Loader2 className="animate-spin text-muted-foreground" />
        ) : (
          <AlignHorizontalDistributeCenter className="text-muted-foreground" />
        )}
      </CardHeader>
      <CardContent className="space-y-1">
        {quantityTotal ? (
          <span className="text-3xl font-bold">{count}</span>
        ) : (
          <CardSkeleton />
        )}
      </CardContent>
    </Card>
  );
}
