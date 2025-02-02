import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import SummaryCard from "./summary-card";
import { db } from "@/app/_lib/prisma";

interface SummaryCards {
  month: string;
}
const SummaryCards = async ({ month }: SummaryCards) => {
  const where = {
    date: {
      gte: new Date(`2025-${month}-01`), // Primeiro dia do mês
      lt: new Date(`2025-${month}-31`), // Primeiro dia do próximo mês
    },
  };

  const depositsTotal = (
    await db.transaction.aggregate({
      where: { ...where, type: "DEPOSIT" }, //ERRO QUANDO MUDA A PAGINA PARA NOVA ABA COLA {...WHERE}
      _sum: { amount: true },
    })
  )?._sum?.amount;
  const investmentsTotal = (
    await db.transaction.aggregate({
      where: { ...where, type: "INVESTEMENT" },
      _sum: { amount: true },
    })
  )?._sum?.amount;
  const expensesTotal = (
    await db.transaction.aggregate({
      where: { ...where, type: "EXPENSE" },
      _sum: { amount: true },
    })
  )?._sum?.amount;
  const balance =
    Number(depositsTotal) - Number(investmentsTotal) - Number(expensesTotal);

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
};

export default SummaryCards;
