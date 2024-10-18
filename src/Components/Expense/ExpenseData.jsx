/* eslint-disable react/prop-types */
import Expense from "./Expense";


export default function ExpenseData({ expenseEntries, setExpenseEntries, setFormData, onExpenseDelete }) {
    const expenseData = [
        {
            id: 1,
            value: "Education"
        },
        {
            id: 2,
            value: "Food"
        },
        {
            id: 3,
            value: "Health"
        },
        {
            id: 4,
            value: "Bill"
        },
        {
            id: 5,
            value: "Insurance"
        },
        {
            id: 6,
            value: "Tax"
        },
        {
            id: 7,
            value: "Transport"
        },
        {
            id: 8,
            value: "Telephone"
        },
    ]

    const sortingData = [
        {
            id: 1,
            value: "Low to High"
        },
        {
            id: 2,
            value: "High to Low"
        }
    ]

    return (
        <Expense expenseData={expenseData} sortingData={sortingData} expenseEntries={expenseEntries} setExpenseEntries={setExpenseEntries} setFormData={setFormData} onExpenseDelete={onExpenseDelete} />
    );
}