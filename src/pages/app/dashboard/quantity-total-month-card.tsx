import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "react-query";
import { PersonStandingIcon, Loader2 } from "lucide-react";
import { CardSkeleton } from "./card-skeleton";
import { getTotalMonth } from "@/api/get-total-month";

export function QuantityTotalInMonthCard() {
  const {
    data: quantityTotalInMonth,
    isFetching: isLoadingQuantityTotalInMonth,
  } = useQuery({
    staleTime: Infinity,
    queryFn: getTotalMonth,
  });

  const count = quantityTotalInMonth?.count;
  return (
    <Card className="bg-zinc-950 h-full border-zinc-800 text-white">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Registros totais (mês)
        </CardTitle>
        {isLoadingQuantityTotalInMonth ? (
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
        ) : (
          <PersonStandingIcon className="h-4 w-4 text-muted-foreground" />
        )}
      </CardHeader>
      <CardContent className="space-y-1">
        {quantityTotalInMonth ? (
          <span className="text-3xl font-bold">{count}</span>
        ) : (
          <CardSkeleton />
        )}
      </CardContent>
    </Card>
  );
}
