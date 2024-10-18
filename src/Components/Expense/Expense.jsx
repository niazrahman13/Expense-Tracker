/* eslint-disable react/prop-types */
import { useState } from 'react';
import { ExpenseSvgFive, ExpenseSvgFour, ExpenseSvgOne, ExpenseSvgThree, ExpenseSvgTwo } from "./ExpenseSVG";

export default function Expense({ expenseData, expenseEntries, setExpenseEntries, setFormData, onExpenseDelete }) {
    const [isSorting, setIsSorting] = useState(false);
    const [isFilter, setIsFilter] = useState(false);
    const [selectedSorting, setSelectedSorting] = useState('desc');
    const [selectedCategories, setSelectedCategories] = useState(new Set());

    const toggleDropdownSorting = () => {
        setIsSorting(!isSorting);
    };

    const toggleDropdownFilter = () => {
        setIsFilter(!isFilter);
    };

    // Handle sorting
    const handleSorting = (sortOption) => {
        setSelectedSorting(sortOption);
        setIsSorting(false);
    };

    // Handle filtering
    const handleFilterChange = (category) => {
        const updatedCategories = new Set(selectedCategories);
        if (updatedCategories.has(category)) {
            updatedCategories.delete(category);
        } else {
            updatedCategories.add(category);
        }
        setSelectedCategories(updatedCategories);
    };

    // Filtered and sorted entries
    const filteredEntries = expenseEntries.filter(entry =>
        selectedCategories.size === 0 || selectedCategories.has(entry.category)
    );

    const handleEdit = (data) => {
        setFormData({
            category: data.category,
            amount: data.amount,
            date: data.date,
            id: data.id
        });
    };

    const handleDelete = (id, amount) => {
        setExpenseEntries(expenseEntries.filter((entry) => entry.id !== id));
        onExpenseDelete(amount)
    };

    const sortedEntries = [...filteredEntries].sort((a, b) => {
        if (selectedSorting === 'asc') {
            return a.amount - b.amount;
        } else if (selectedSorting === 'desc') {
            return b.amount - a.amount;
        }
        return 0;
    });

    return (
        <div className="border rounded-md">
            <div className="flex items-center justify-between gap-2 bg-[#F9FAFB] py-4 px-4 rounded-md">
                <div className="flex items-center gap-2">
                    <div className="h-10 w-10 bg-pink-600 text-white rounded-md text-center object-center place-content-center text-base">
                        <ExpenseSvgOne />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold leading-7 text-gray-800">Expense</h3>
                    </div>
                </div>

                <div>
                    <div className="relative inline-block text-left">
                        <div>
                            <button
                                type="button"
                                className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                id="menu-button2"
                                aria-expanded={isSorting}
                                aria-haspopup="true"
                                onClick={toggleDropdownSorting}
                            >
                                <ExpenseSvgTwo />
                            </button>
                        </div>

                        {
                            isSorting && (
                                <div
                                    className="absolute z-10 mt-2 left-5 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                    role="menu2"
                                    aria-orientation="vertical"
                                    aria-labelledby="menu-button2"
                                    tabIndex="-1"
                                >
                                    <div className="py-1" role="none">
                                        <a
                                            href="#"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-all"
                                            role="menuitem"
                                            tabIndex="-1"
                                            onClick={() => handleSorting('asc')}
                                        >
                                            Low to High
                                        </a>
                                        <a
                                            href="#"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-all"
                                            role="menuitem"
                                            tabIndex="-1"
                                            onClick={() => handleSorting('desc')}
                                        >
                                            High to Low
                                        </a>
                                    </div>
                                </div>
                            )
                        }
                    </div>

                    <div className="relative inline-block text-left">
                        <div>
                            <button
                                type="button"
                                className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                id="filter-button-2"
                                aria-expanded={isFilter}
                                aria-haspopup="true"
                                onClick={toggleDropdownFilter}
                            >
                                <ExpenseSvgThree />
                            </button>
                        </div>
                        {
                            isFilter && (
                                <div
                                    className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                    role="menu"
                                    aria-orientation="vertical"
                                    aria-labelledby="filter-button-2"
                                    tabIndex="-1"
                                    id="filter-dropdown2"
                                >
                                    <div className="py-1" role="none">
                                        {expenseData.map((data) => (
                                            <label className="inline-flex items-center px-4 py-2 text-sm text-gray-700" key={data.id}>
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox h-4 w-4 rounded-md text-gray-600"
                                                    id={`filter-option-${data.id}`}
                                                    checked={selectedCategories.has(data.value)}
                                                    onChange={() => handleFilterChange(data.value)}
                                                />
                                                <span className="ml-2">{data.value}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>

            <div className="p-4 divide-y">
                {
                    sortedEntries.map((data) => (
                        <div className="flex justify-between items-center py-2 relative group cursor-pointer" key={data.id}>
                            <div>
                                <h3 className="text-base font-medium leading-7 text-gray-600">{data.category}</h3>
                                <p className="text-xs text-gray-600">{data.date}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <p className="text-base font-semibold text-gray-600 transition-all group-hover:-translate-x-14">
                                    {data.amount}
                                </p>
                                <div
                                    className="translate-x-5 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 absolute right-0 top-1/2 -translate-y-1/2 transition-all"
                                >
                                    <button
                                        onClick={() => handleEdit(data)}
                                        className="hover:text-teal-600"
                                        title="Edit Button"
                                    >
                                        <ExpenseSvgFour />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(data.id, data.amount)}
                                        className="hover:text-red-600"
                                        title="Delete Button"
                                    >
                                        <ExpenseSvgFive />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
