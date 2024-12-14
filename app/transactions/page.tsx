import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/data-table";
import { transactioncolumns } from "./_columns";
import AddTransactionButton from "../_components/add-transaction-button";

const transactionsPage = async () => {
  //aessar as transações do banco de dados
  const transactions = await db.transaction.findMany({});
  return (
    <div className="space-y-6 p-6">
      {/*titulo e botão*/}
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Transações </h1>
        <AddTransactionButton />
      </div>
      <DataTable columns={transactioncolumns} data={transactions} />
    </div>
  );
};

export default transactionsPage;
