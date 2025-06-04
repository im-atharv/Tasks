import { useState, useEffect } from 'react';

const ExpenseForm = ({ onAdd, onUpdate, editingExpense, onFinishEditing, refreshSalary }) => {
    // Salary states
    const [salaryAmount, setSalaryAmount] = useState('');
    const [currency, setCurrency] = useState('USD');
    const [salaryError, setSalaryError] = useState('');
    const [salarySuccessMessage, setSalarySuccessMessage] = useState('');
    const [isSalarySet, setIsSalarySet] = useState(false);
    const [isEditingSalary, setIsEditingSalary] = useState(false);

    // Expense states
    const [amount, setAmount] = useState('');
    const [desc, setDesc] = useState('');
    const [category, setCategory] = useState('Needs');
    const [expenseError, setExpenseError] = useState('');

    // Fetch current salary on mount
    useEffect(() => {
        const fetchSalary = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/salary');
                if (response.ok) {
                    const data = await response.json();
                    if (data && data.amount) {
                        setSalaryAmount(data.amount);
                        setCurrency(data.currency);
                        setIsSalarySet(true);
                        setIsEditingSalary(false);
                    }
                }
            } catch (error) {
                console.error('Error fetching salary:', error);
            }
        };
        fetchSalary();
    }, []);

    // Handle salary submit (set or update)
    const handleSalarySubmit = async (e) => {
        e.preventDefault();
        if (!salaryAmount || !currency) {
            setSalaryError('Please fill in all fields for salary.');
            return;
        }
        if (isNaN(salaryAmount) || salaryAmount <= 0) {
            setSalaryError('Salary amount must be a valid positive number.');
            return;
        }
        setSalaryError('');
        try {
            const response = await fetch('http://localhost:4000/api/salary', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: parseFloat(salaryAmount), currency }),
            });
            if (!response.ok) throw new Error('Failed to save salary');
            await response.json();
            setSalarySuccessMessage('Salary saved successfully!');
            setIsSalarySet(true);
            setIsEditingSalary(false);

            // Refresh the page after salary is saved
            window.location.reload();

            if (refreshSalary) {
                refreshSalary();
            }
        } catch (error) {
            console.error('Error saving salary:', error);
            setSalaryError('Failed to save salary. Please try again.');
        }
    };


    // Handle expense submit (add or update)
    const handleExpenseSubmit = (e) => {
        e.preventDefault();
        if (!amount || !desc) {
            setExpenseError('Please fill in all fields.');
            return;
        }
        if (isNaN(amount) || amount <= 0) {
            setExpenseError('Amount must be a valid positive number.');
            return;
        }
        setExpenseError('');
        const newExpense = {
            amount: parseFloat(amount),
            desc,
            category,
            date: editingExpense ? editingExpense.date : new Date().toLocaleDateString(),
            id: editingExpense ? editingExpense.id : undefined,
        };
        if (editingExpense) {
            onUpdate(newExpense);
            onFinishEditing(); // Clear editing mode after update
        } else {
            onAdd(newExpense);
        }
        // Reset expense form fields
        setAmount('');
        setDesc('');
        setCategory('Needs');
    };

    // When editingExpense changes, pre-fill form fields
    useEffect(() => {
        if (editingExpense) {
            setAmount(editingExpense.amount?.toString() || '');
            setDesc(editingExpense.desc || '');
            setCategory(editingExpense.category || 'Needs');
        } else {
            setAmount('');
            setDesc('');
            setCategory('Needs');
        }
    }, [editingExpense]);

    return (
        <div className="space-y-8 max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            {/* Salary Section */}
            <div>
                <h2 className="text-2xl font-bold mb-4">Salary</h2>

                {salaryError && <p className="text-red-600 text-sm mb-2">{salaryError}</p>}
                {salarySuccessMessage && <p className="text-green-600 text-sm mb-2">{salarySuccessMessage}</p>}

                {isSalarySet && !isEditingSalary ? (
                    <div className="flex items-center justify-between bg-gray-100 p-4 rounded-md">
                        <p className="text-gray-800 font-semibold text-lg">
                            Current Salary: <span className="text-indigo-600">{salaryAmount} {currency}</span>
                        </p>
                        <button
                            className="text-indigo-600 hover:text-indigo-800 font-medium"
                            onClick={() => {
                                setIsEditingSalary(true);
                                setSalarySuccessMessage('');
                                setSalaryError('');
                            }}
                        >
                            Edit
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSalarySubmit} className="space-y-4">
                        <input
                            type="number"
                            placeholder="Salary Amount"
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={salaryAmount}
                            onChange={(e) => setSalaryAmount(e.target.value)}
                        />
                        <div className="flex space-x-3">
                            <button
                                type="submit"
                                className="flex-grow bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition"
                            >
                                {isSalarySet ? 'Update Salary' : 'Set Salary'}
                            </button>
                            {isSalarySet && (
                                <button
                                    type="button"
                                    className="bg-gray-300 text-gray-700 py-3 px-5 rounded-md hover:bg-gray-400 transition"
                                    onClick={() => {
                                        setIsEditingSalary(false);
                                        setSalaryError('');
                                        setSalarySuccessMessage('');
                                    }}
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                )}
            </div>

            {/* Expense Section */}
            <div>
                <h2 className="text-2xl font-bold mb-4">{editingExpense ? 'Edit Expense' : 'Add Expense'}</h2>
                {expenseError && <p className="text-red-600 text-sm mb-2">{expenseError}</p>}
                <form onSubmit={handleExpenseSubmit} className="space-y-4">
                    <input
                        type="number"
                        placeholder="Amount"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                    />
                    <select
                        className="w-full p-3 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="Needs">Needs</option>
                        <option value="Wants">Wants</option>
                    </select>
                    <div className="flex space-x-3">
                        <button
                            type="submit"
                            className="flex-grow bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition"
                        >
                            {editingExpense ? 'Update Expense' : 'Add Expense'}
                        </button>
                        {editingExpense && (
                            <button
                                type="button"
                                className="bg-gray-300 text-gray-700 py-3 px-5 rounded-md hover:bg-gray-400 transition"
                                onClick={() => onFinishEditing()}
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ExpenseForm;
