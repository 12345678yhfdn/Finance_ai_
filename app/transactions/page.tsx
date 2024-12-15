import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/data-table";
import { transactioncolumns } from "./_columns";
import UpsertTransactionButton from "../_components/add-transaction-button";
import Navbar from "../_components/navbar";

const transactionsPage = async () => {
  //aessar as transações do banco de dados
  const transactions = await db.transaction.findMany({});
  return (
    <>
      <Navbar></Navbar>
      <div className="space-y-6 p-6">
        {/*titulo e botão*/}
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold">Transações </h1>
          <UpsertTransactionButton />
        </div>
        <DataTable
          columns={transactioncolumns}
          data={JSON.parse(JSON.stringify(transactions))}
        />
      </div>
    </>
  );
};

export default transactionsPage;
