import { useState, useEffect } from 'react'

//Functional component for expense form which has three props.
const ExpenseForm = ({ onAdd, onUpdate, editingExpense }) => {

    //Declares three state variables
    const [amount, setAmount] = useState('')
    const [desc, setDesc] = useState('')
    const [category, setCategory] = useState('Needs')

    //Effect to sync form with editing data
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

    //Just to handle submit button if any of the field is empty gives the error and stops
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!amount || !desc) return alert('Please fill in all fields.')

        //Creates a new object for the new expense
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

        //Resets the form after submission to their default value.
        setAmount('')
        setDesc('')
        setCategory('Needs')
    }

    //To handle the scroll value change on the input field
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
                className="w-full p-2 sm:p-3 border rounded-lg text-sm sm:text-base cursor-pointer"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            >
                <option value="Needs">Needs</option>
                <option value="Wants">Wants</option>
            </select>
            <button
                type="submit"
                className="w-full bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 cursor-pointer"
            >
                {editingExpense ? 'Update Expense' : 'Add Expense'}
            </button>
        </form>
    )
}

export default ExpenseForm
