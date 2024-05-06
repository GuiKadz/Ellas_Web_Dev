import { DiffereneCard } from "./difference-card";
import { VictimDataChart } from "./line-chart";

import { QuantityTotalInMonthCard } from "./quantity-total-month-card";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex">
        <h1 className="text-3xl grid-rows-3 font-semibold tracking-tight">Dashboard</h1>
      </div>
      <div className="grid grid-cols-4 gap-3">
        <QuantityTotalInMonthCard/>
        <DiffereneCard/>
      </div>
      <div className="grid-cols-99  grid gap-3">
        <VictimDataChart/>

      </div>
    </div>
  );
}
