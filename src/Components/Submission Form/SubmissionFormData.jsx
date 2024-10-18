import SubmissionForm from "./SubmissionForm";

export default function SubmissionFormData() {

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

    const incomeData = [
        {
            id: 1,
            value: "Salary"
        },
        {
            id: 2,
            value: "Outsourcing"
        },
        {
            id: 3,
            value: "Bond"
        },
        {
            id: 4,
            value: "Dividend"
        },
    ]

    return (
        <SubmissionForm expenseData={expenseData} incomeData={incomeData} />
    );
}