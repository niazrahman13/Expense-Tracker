/* eslint-disable react/prop-types */
import { useState } from 'react';
import ExpenseData from '../Expense/ExpenseData';
import IncomeData from '../Income/IncomeData';
import TotalBalance from '../Total Balance/TotalBalance';

export default function SubmissionForm({ expenseData, incomeData }) {
    const [activeTab, setActiveTab] = useState("expense");
    const [formData, setFormData] = useState({
        category: "",
        amount: "",
        date: "",
        id: null
    });


    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);


    const [incomeEntries, setIncomeEntries] = useState([]);
    const [expenseEntries, setExpenseEntries] = useState([]);

    const handleTabSwitch = (tab) => {
        setActiveTab(tab);
        resetForm();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleIncomeDelete = (amount) => {
        const parsedAmount = parseFloat(amount);
        if (!isNaN(parsedAmount)) {
            setTotalIncome((prev) => prev - parsedAmount);
        }
    };

    const handleExpenseDelete = (amount) => {
        setTotalExpense((prev) => prev - amount);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { category, amount, date, id } = formData;

        if (!category || !amount || !date) {
            alert("Please fill out all the fields.");
            return;
        }

        const parsedAmount = parseFloat(amount);
        if (isNaN(parsedAmount)) {
            alert("Please enter a valid amount.");
            return;
        }

        if (activeTab === "expense") {
            if (id) {

                const existingEntry = expenseEntries.find(entry => entry.id === id);
                if (existingEntry) {
                    setTotalExpense(prev => prev - existingEntry.amount);
                }


                setExpenseEntries((prev) =>
                    prev.map(entry =>
                        entry.id === id
                            ? { ...entry, category, amount: parsedAmount, date }
                            : entry
                    )
                );
            } else {
                setExpenseEntries((prev) => [
                    ...prev,
                    { id: Date.now(), category, amount: parsedAmount, date }
                ]);
            }
            setTotalExpense((prev) => prev + parsedAmount);
        } else {
            if (id) {

                const existingEntry = incomeEntries.find(entry => entry.id === id);
                if (existingEntry) {
                    setTotalIncome(prev => prev - existingEntry.amount);
                }


                setIncomeEntries((prev) =>
                    prev.map(entry =>
                        entry.id === id
                            ? { ...entry, category, amount: parsedAmount, date }
                            : entry
                    )
                );
            } else {
                setIncomeEntries((prev) => [
                    ...prev,
                    { id: Date.now(), category, amount: parsedAmount, date }
                ]);
            }
            setTotalIncome((prev) => prev + parsedAmount);
        }


        resetForm();
    };

    const resetForm = () => {
        setFormData({
            category: "",
            amount: "",
            date: "",
            id: null
        });
    };

    return (
        <>
            <div className="p-6 py-8 bg-[#F9FAFB] border rounded-md">
                <h2 className="text-3xl font-semibold leading-7 text-gray-800 text-center">Expense Tracker</h2>

                <form onSubmit={handleSubmit}>

                    <div className="flex divide-x divide-slate-400/20 overflow-hidden rounded-md bg-white text-[0.8125rem] font-medium leading-5 text-slate-700 shadow-sm ring-1 ring-slate-700/10 mt-6">
                        <div
                            onClick={() => handleTabSwitch("expense")}
                            className={`cursor-pointer text-center flex-1 px-4 py-2 hover:bg-slate-50 hover:text-slate-900 ${activeTab === "expense" ? "active bg-slate-100 text-slate-900" : ""}`}
                        >
                            Expense
                        </div>
                        <div
                            onClick={() => handleTabSwitch("income")}
                            className={`cursor-pointer text-center flex-1 px-4 py-2 hover:bg-slate-50 hover:text-slate-900 ${activeTab === "income" ? "active bg-slate-100 text-slate-900" : ""}`}
                        >
                            Income
                        </div>
                    </div>


                    <div className="mt-3">
                        <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">Category</label>
                        <div className="mt-2">
                            <select
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                            >
                                <option value="">Select a category</option>
                                {activeTab === "expense"
                                    ? expenseData.map((data) => (
                                        <option key={data.id} value={data.value}>
                                            {data.value}
                                        </option>
                                    ))
                                    : incomeData.map((data) => (
                                        <option key={data.id} value={data.value}>
                                            {data.value}
                                        </option>
                                    ))}
                            </select>
                        </div>
                    </div>

                    <div className="mt-3">
                        <label htmlFor="amount" className="block text-sm font-medium leading-6 text-gray-900">Amount</label>
                        <div className="mt-2">
                            <input
                                type="number"
                                name="amount"
                                id="amount"
                                value={formData.amount}
                                onChange={handleInputChange}
                                placeholder="Enter amount"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    {/* Date input */}
                    <div className="mt-3">
                        <label htmlFor="date" className="block text-sm font-medium leading-6 text-gray-900">Date</label>
                        <div className="mt-2">
                            <input
                                type="date"
                                name="date"
                                id="date"
                                value={formData.date}
                                onChange={handleInputChange}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    {/* Submit button */}
                    <button
                        type="submit"
                        className="mt-6 rounded-md bg-teal-600 px-8 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 w-full"
                    >
                        {formData.id ? 'Update' : 'Save'}
                    </button>
                </form>
            </div>

            <div className="lg:col-span-2">
                <TotalBalance totalIncome={totalIncome} totalExpense={totalExpense} />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">

                    <IncomeData incomeEntries={incomeEntries} setIncomeEntries={setIncomeEntries} setFormData={setFormData} onIncomeDelete={handleIncomeDelete} />
                    <ExpenseData expenseEntries={expenseEntries} setExpenseEntries={setExpenseEntries} setFormData={setFormData} onExpenseDelete={handleExpenseDelete} />

                </div>
            </div>
        </>
    );
}
