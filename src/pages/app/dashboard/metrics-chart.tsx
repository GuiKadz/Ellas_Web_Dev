import React, { useState } from "react";
import { useQuery } from "react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell } from "recharts";
import { GetVictimDetails } from "@/api/get-victim-details";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

const COLORS = [
  "#1890ff",
  "#2fc25b",
  "#facc15",
  "#f50",
  "#2db7f5",
  "#87d068",
  "#a0d911",
  "#f57f17",
  "#13c2c2",
  "#304ffe",
  "#001529",
  "#c23531",
  "#6a5acd",
  "#976000",
  "#ffd700",
];

interface ReportData {
  [key: string]: {
    [key: string]: number;
  };
}

const ReportCard: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>("vítima");
  const [reportData, setReportData] = useState<ReportData>({});

  const handleSelectChange = (value: string) => {
    setSelectedType(value);
  };

  const fetchReportData = async () => {
    switch (selectedType) {
      case "vítima":
        return GetVictimDetails();
      case "agressor":
        return 1; //getAggressorReport();
      case "ocorrência":
        return 2; //getOccurrenceReport();
      default:
        return {};
    }
  };

  const { data, isLoading } = useQuery(
    ["reportData", selectedType],
    fetchReportData
  );

  React.useEffect(() => {
    if (data) {
      setReportData(data);
    }
  }, [data]);

  return (
    <Card className="col-span-3 text-white">
      <CardHeader>
        <CardTitle>Relatorios detalhados</CardTitle>
        <Select
          value={selectedType}
          onValueChange={handleSelectChange}
          defaultValue="vítima"
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione um relatório" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="vítima">Vítima</SelectItem>
            <SelectItem value="agressor">Agressor</SelectItem>
            <SelectItem value="ocorrência">Ocorrência</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center h-full">
        {isLoading && (
          <div>
            <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
          </div>
        )}
        {reportData && (
          <PieChart width={400} height={400}>
            <Pie
              data={Object.entries(reportData).map(([key, value]) => ({
                name: key,
                value,
              }))}
              cx={200}
              cy={200}
              outerRadius={100}
              labelLine={false}
              label={({ percent }) => `${percent}%`}
              dataKey="value"
            >
              {Object.entries(reportData).map(([key], index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        )}
      </CardContent>
    </Card>
  );
};

export default ReportCard;