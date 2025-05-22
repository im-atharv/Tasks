import { useState, useEffect } from 'react'

const ExpenseForm = ({ onAdd, onUpdate, editingExpense }) => {
    const [amount, setAmount] = useState('')
    const [desc, setDesc] = useState('')
    const [category, setCategory] = useState('Needs')

    useEffect(() => {
        if (editingExpense) {
            setAmount(editingExpense.amount.toString())
            setDesc(editingExpense.desc)
            setCategory(editingExpense.category)
        } else {
            setAmount('')
            setDesc('')
            setCategory('Needs')
        }
    }, [editingExpense])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!amount || !desc) return alert('Please fill in all fields.')

        const newExpense = {
            amount: parseFloat(amount),
            desc,
            category,
            date: editingExpense ? editingExpense.date : new Date().toLocaleDateString(),
            id: editingExpense ? editingExpense.id : undefined
        }

        if (editingExpense) {
            onUpdate(newExpense)
        } else {
            onAdd(newExpense)
        }

        setAmount('')
        setDesc('')
        setCategory('Needs')
    }

    const handleWheel = (e) => {
        e.target.blur()
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-3 mb-6">
            <input
                type="number"
                placeholder="Amount"
                className="w-full p-2 border rounded-lg"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                onWheel={handleWheel}
            />
            <input
                type="text"
                placeholder="Description"
                className="w-full p-2 border rounded-lg"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
            />
            <select
                className="w-full p-2 sm:p-3 border rounded-lg text-sm sm:text-base"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            >
                <option value="Needs">Needs</option>
                <option value="Wants">Wants</option>
            </select>
            <button
                type="submit"
                className="w-full bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700"
            >
                {editingExpense ? 'Update Expense' : 'Add Expense'}
            </button>
        </form>
    )
}

export default ExpenseForm
