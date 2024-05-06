import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "react-query";
import { PersonStandingIcon, Loader2 } from "lucide-react";
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

  return (
    <Card className="bg-zinc-950 h-full border-zinc-800 text-white">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Diferença (mês)
        </CardTitle>
        {isLoadingQuantityTotalInMonth ? (
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
        ) : (
          <PersonStandingIcon className="h-4 w-4 text-muted-foreground" />
        )}
      </CardHeader>
      <CardContent className="space-y-1">
        {quantityTotalInMonth ? (
            <div className="flex items-center">
            <span className="text-3xl font-bold">{quantityTotalInMonth.amount}</span>
            <p className="text-xs text-muted-foreground">
            <span
              className={
                quantityTotalInMonth?.diffFromLastMonth > 0
                  ? 'text-emerald-500'
                  : 'text-red-500'
              }
            >
              {quantityTotalInMonth?.diffFromLastMonth > 0
                ? `+${quantityTotalInMonth?.diffFromLastMonth}`
                : quantityTotalInMonth?.diffFromLastMonth}
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
