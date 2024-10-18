/* eslint-disable react/prop-types */
import Income from "./Income";

export default function IncomeData({ incomeEntries, setIncomeEntries, setFormData, onIncomeDelete }) {

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
        <Income incomeData={incomeData} sortingData={sortingData} incomeEntries={incomeEntries} setIncomeEntries={setIncomeEntries} setFormData={setFormData} onIncomeDelete={onIncomeDelete} />
    );
}