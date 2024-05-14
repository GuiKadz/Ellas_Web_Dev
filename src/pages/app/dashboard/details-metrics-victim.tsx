import { GetVictimDetails } from "@/api/get-victim-details";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BarChart, Loader2 } from "lucide-react";
import { useState } from "react";
import { useQuery } from "react-query";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, TooltipProps } from "recharts";
  
const COLORS = [
    '#7e22ce',
    '#FF1493', // Deep Pink
    '#00FFFF', // Cyan
    '#FFD700', // Gold
    '#00FF00', // Lime
    '#1E90FF', // Dodger Blue
    '#FF8C00', // Dark Orange
    '#FF00FF', // Magenta
    '#32CD32', // Lime Green
    '#8A2BE2', // Blue Violet
    '#FF4500', // Orange Red
  ];
  

function CustomTooltip({ active, payload }: TooltipProps<number, number>) {
    if (active && payload && payload.length) {
      return (
        <div className="flex flex-col gap-2 rounded-lg border bg-purple-700 p-4 text-card-foreground shadow-sm">
          <span className="text-base font-semibold text-center">Dado: {payload[0].name}</span>
          <div className="flex flex-col gap-1">
            <span className="">
              <span className="font-semibold">Casos:</span> {payload[0].value}
            </span>
          </div>
        </div>
      )
    }
  
    return null
  }

export function DetailsVictimCard() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const { data: VictimDetails, isFetching: isLoadingData } = useQuery(
    ["victimDetails", selectedCategory], 
    () => GetVictimDetails(selectedCategory)
  );
  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <Card className="bg-zinc-950 col-span-3 gap-3 h-full border-zinc-800 text-white">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Relátorios de Vítimas
        </CardTitle>
        {isLoadingData ? (
          <Loader2 className="animate-spin text-muted-foreground" />
        ) : (
            <BarChart className="h-4 w-4 text-muted-foreground" />
        )}
      </CardHeader>
      <CardContent>
        <div className="gap-10 flex flex-col">
          <Select defaultValue="bairro" onValueChange={(e: string) => handleSelectCategory(e)}>
            <SelectTrigger className="h-11 mx-auto">
              <SelectValue placeholder="Selecione um dado especifico" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bairro">Bairro</SelectItem>
              <SelectItem value="idade">Idade</SelectItem>
              <SelectItem value="etnia">Etnia</SelectItem>
              <SelectItem value="aux_gov">Auxilios</SelectItem>
              <SelectItem value="filhos">Filhos</SelectItem>
              <SelectItem value="renda">Renda</SelectItem>
              <SelectItem value="escolaridade">Escolaridade</SelectItem>
              <SelectItem value="deficiencias">Deficiencias</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {VictimDetails ? (
          <ResponsiveContainer width="100%" height={240}>
            <PieChart style={{ fontSize: 14 }}>
              <Pie
                data={VictimDetails}
                dataKey="count"
                nameKey="data"
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={86}
                innerRadius={64}
                strokeWidth={3}
                
                fill={'#4B0082'}
                label={({
                  cx,
                  cy,
                  midAngle,
                  innerRadius,
                  outerRadius,
                  value,
                  index,
                }) => {
                  const RADIAN = Math.PI / 180;
                  const radius = 12 + innerRadius + (outerRadius - innerRadius);
                  const x = cx + radius * Math.cos(-midAngle * RADIAN);
                  const y = cy + radius * Math.sin(-midAngle * RADIAN);

                  return (
                    <text
                      x={x}
                      y={y}
                      className="fill-muted-foreground text-xs text-white"
                      textAnchor={x > cx ? "start" : "end"}
                      dominantBaseline="central"
                    >
                      {VictimDetails[index].data
                        .substring(0, 12)
                        .concat("...")}{" "}
                      ({value})
                    </text>
                  );
                }}
                
              >
                {VictimDetails.map((_ , index) => {
                  return (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      className="stroke-background hover:opacity-80 text-white"
                    />
                  );
                })}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-[240px] w-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
