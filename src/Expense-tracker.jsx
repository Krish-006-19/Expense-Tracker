import { useState } from "react";
import { useAddTransaction } from "./hooks/useAddTransaction";
import { useGetTransaction } from "./hooks/useGetTransaction";
import { useInfo } from "./hooks/useInfo";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "./config/firebase-config";
function ExpenseTracker() {
  const [description, setDescription] = useState("");
  const [transAmount, setTransAmount] = useState(0);
  const [transType, setTransType] = useState("expense");
  const { addTransaction } = useAddTransaction();
  const { transaction } = useGetTransaction();
  let { name, profilePic } = useInfo();

  const onSubmit = (e) => {
    e.preventDefault();
    if (description && transAmount) {
      addTransaction({
        description,
        transAmount,
        transType,
      });
      setDescription("");
      setTransAmount(0);
      setTransType("expense");
    }
  };

  let income = 0,
    expense = 0;
  transaction?.forEach(({ transAmount, transType }) => {
    if (transType === "income") {
      income += Number(transAmount);
    } else {
      expense += Number(transAmount);
    }
  });
  let navigate = useNavigate()
  const balance = income - expense

  let signout =async()=>{
    try{
      await signOut(auth)
      localStorage.clear()
    }catch(err){
      throw err
    }
    navigate('/')

  }

  return (
    <div className="flex flex-col items-center bg-gradient-to-r from-blue-600 to-purple-500 min-h-screen text-white p-6">
      <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 w-full max-w-2xl shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">{name}'s Expense Tracker</h1>
          {profilePic && <img src={profilePic} className="w-14 h-14 rounded-full border-2 border-white" alt="Profile" />}
          <button onClick={signout} className="p-3 bg-purple-600 hover:bg-red-700 transition-all rounded-xl text-lg font-bold">SignOut</button>
        </div>

        {/* Balance Summary */}
        <div className="mt-5 p-4 bg-white bg-opacity-20 rounded-lg shadow-md">
          <h3 className="text-lg">Your Balance</h3>
          <h2 className="text-2xl font-bold">₹{balance}</h2>
          <div className="flex justify-between mt-3">
            <div>
              <h4 className="text-sm">Income</h4>
              <p className="text-green-300 font-semibold">₹{income}</p>
            </div>
            <div>
              <h4 className="text-sm">Expense</h4>
              <p className="text-red-300 font-semibold">₹{expense}</p>
            </div>
          </div>
        </div>

        {/* Transaction Form */}
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <input
            type="text"
            className="w-full p-3 rounded-xl text-black placeholder-gray-200 focus:outline-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            required
          />
          <input
            type="number"
            className="w-full p-3 rounded-xl text-black placeholder-gray-200 focus:outline-none"
            value={transAmount}
            onChange={(e) => setTransAmount(Number(e.target.value))}
            placeholder="Amount"
            required
          />
          <div className="flex items-center gap-4">
            <label className="cursor-pointer">
              <input
                type="radio"
                onChange={(e) => setTransType(e.target.value)}
                value="expense"
                checked={transType === "expense"}
                required
              />
              <div className="peer-checked:bg-red-500 bg-gray-200 p-2 rounded-lg text-sm text-gray-800 peer-checked:text-white">
                Expense
              </div>
            </label>
            <label className="cursor-pointer">
              <input
                type="radio"
                onChange={(e) => setTransType(e.target.value)}
                value="income"
                checked={transType === "income"}
                required
              />
              <div className="peer-checked:bg-green-500 bg-gray-200 p-2 rounded-lg text-sm text-gray-800 ">
                Income
              </div>
            </label>
          </div>
          <button className="w-full p-3 bg-purple-600 hover:bg-purple-700 transition-all rounded-xl text-lg font-bold">
            Add Transaction
          </button>
        </form>
      </div>

      {/* Transactions List */}
      <div className="mt-8 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 w-full max-w-2xl shadow-lg">
        <h3 className="text-xl font-bold">Transactions</h3>
        <table className="w-full mt-3">
          <thead>
            <tr className="bg-white bg-opacity-20 text-white">
              <th className="px-4 py-2 text-left">Description</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Type</th>
            </tr>
          </thead>
          <tbody>
            {transaction?.map((trans) => {
              let { id, description, transAmount, transType } = trans;
              return (
                <tr key={id} className="border-t border-white border-opacity-20">
                  <td className="px-4 py-2">{description}</td>
                  <td className="px-4 py-2">₹{transAmount}</td>
                  <td
                    className={`px-4 py-2 font-bold ${
                      transType === "expense" ? "text-red-400" : "text-green-400"
                    }`}
                  >
                    {transType}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ExpenseTracker;
