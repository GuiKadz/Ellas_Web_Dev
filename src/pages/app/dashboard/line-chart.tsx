import { useQuery } from "react-query";
import { subDays } from "date-fns";
import { Loader2, XCircle } from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { violet } from "tailwindcss/colors";

import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { DateRangePicker } from "../../../components/ui/date-range-picker";
import { Label } from "../../../components/ui/label";
import { GetVictimInPeriod } from "@/api/get-victim-in-period";

interface DataPerMonth {
  date: string;
  result: number;
}

export interface ChartProps {
  data: DataPerMonth[];
}

export function VictimDataChart() {
  const [period, setPeriod] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });

  function handleResetPeriod() {
    setPeriod({
      from: subDays(new Date(), 7),
      to: new Date(),
    });
  }

  const {
    data: dailyDataInPeriod,
    isLoading: isLoadingDailyDataInPeriod,
    error: dailyDataError,
  } = useQuery<DataPerMonth[], Error>(
    ["daily-occurences-in-period", period],
    async () => {
      const data = await GetVictimInPeriod({ from: period?.from, to: period?.to });
      return data;
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 60000,
    }
  );

  console.log(dailyDataInPeriod)

  return (
    <Card className="col-span-6 row-span-1 bg-zinc-950 border-zinc-800 text-white">
      <CardHeader className="flex flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="flex items-center gap-2 text-base font-medium">
            Registros no período
            {isLoadingDailyDataInPeriod && (
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            )}
          </CardTitle>
          <CardDescription>Casos diários no período</CardDescription>
        </div>
        <div className="flex items-center gap-3">
          <Label>Período</Label>
          <DateRangePicker
            date={period}
            onDateChange={setPeriod}
            className=""
          />
        </div>
      </CardHeader>
      <CardContent className=" flex flex-col justify-center ">
        {dailyDataInPeriod ? (
          <>
            {dailyDataInPeriod ? (
              <ResponsiveContainer width="100%" height={240} className="left-0">
                <LineChart data={dailyDataInPeriod}>
                  <XAxis
                    dataKey="date"
                    stroke="#888888"
                    tickLine={false}
                    axisLine={false}
                    dy={15}
                  />

                  <YAxis
                    stroke="#888888"
                    tickLine={false}
                    axisLine={false}width={80}
                    
                  />

                  <CartesianGrid className="!stroke-muted" vertical={false} />

                  <Line
                    type="linear"
                    strokeWidth={2}
                    dataKey="result"
                    stroke={violet["500"]}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-[240px] w-full flex-col items-center justify-center gap-0.5">
                <span className="text-sm text-muted-foreground">
                  Nenhum resultado encontrado para o período.
                </span>
                <Button
                  variant="link"
                  size="lg"
                  className="text-violet-500 dark:text-violet-400"
                  onClick={handleResetPeriod}
                >
                  Exibir resultados dos últimos 7 dias
                </Button>
              </div>
            )}
          </>
        ) : dailyDataError ? (
          <div className="flex h-[240px] w-full flex-col items-center justify-center gap-0.5">
            <span className="flex items-center gap-2 text-sm text-red-500 dark:text-red-400">
              <XCircle className="h-4 w-4" />
              Erro ao obter dados do período.
            </span>
            <Button
              variant="link"
              size="lg"
              className="text-violet-500 dark:text-violet-400"
              onClick={handleResetPeriod}
            >
              Recarregar gráfico
            </Button>
          </div>
        ) : (
          <div className="flex h-[240px] w-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
