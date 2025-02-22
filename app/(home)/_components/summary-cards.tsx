import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import SummaryCard from "./summary-card";

return (
  <div className="space-y-6">
    {/* Primeiro Card */}
    <SummaryCard
      icon={<WalletIcon size={16} />}
      title="Saldo"
      amount={balance}
      size="large"
    />

    {/* Outros Cards */}
    <div className="grid grid-cols-3 gap-6">
      <SummaryCard
        icon={<PiggyBankIcon size={14} />}
        title="Investido"
        amount={Number(investmentsTotal) || 0}
        size={"small"}
      />

      <SummaryCard
        icon={<TrendingUpIcon size={14} className="text-primary" />}
        title="Receita"
        amount={Number(depositsTotal) || 0}
        size={"small"}
      />

      <SummaryCard
        icon={<TrendingDownIcon size={14} className="text-red-500" />}
        title="Despesas"
        amount={Number(expensesTotal) || 0}
        size={"small"}
      />
    </div>
  </div>
);

export default SummaryCards;
