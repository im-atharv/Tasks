import { useEffect, useRef, useState } from "react"
import ExpenseForm from "./components/ExpenseForm"
import ExpenseList from "./components/ExpenseList"
import Summary from "./components/Summary"
import DownloadButtons from "./components/DownloadButtons"

const LOCAL_STORAGE_KEY = "expenses-v1"
const SALARY_KEY = "monthly-salary"

function App() {
  const [expenses, setExpenses] = useState(() => {
    try {
      const data = localStorage.getItem(LOCAL_STORAGE_KEY)
      return data ? JSON.parse(data) : []
    } catch (err) {
      console.error("Failed to load expenses from localStorage", err)
      return []
    }
  })

  const [salary, setSalary] = useState(() => {
    return localStorage.getItem(SALARY_KEY) || ""
  })

  const [editingExpense, setEditingExpense] = useState(null)
  const expenseRefs = useRef({})  // map of id -> ref

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(expenses))
  }, [expenses])

  useEffect(() => {
    localStorage.setItem(SALARY_KEY, salary)
  }, [salary])

  const addExpense = (expense) => {
    const currentDate = new Date().toLocaleDateString()
    const newExpense = { ...expense, id: Date.now(), date: currentDate }

    setExpenses(prev => {
      const updated = [...prev, newExpense]
      return updated
    })

    // Delay scroll until after render
    setTimeout(() => {
      const ref = expenseRefs.current[newExpense.id]
      if (ref?.scrollIntoView) {
        ref.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 100)
  }

  const updateExpense = (updated) => {
    setExpenses(prev =>
      prev.map(exp => exp.id === updated.id ? updated : exp)
    )
    setEditingExpense(null)

    // Scroll to updated item
    setTimeout(() => {
      const ref = expenseRefs.current[updated.id]
      if (ref?.scrollIntoView) {
        ref.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 100)
  }

  const handleEdit = (expense) => {
    setEditingExpense(expense)

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const clearExpenses = () => {
    if (confirm("Are you sure you want to clear all expenses?")) {
      setExpenses([])
      localStorage.removeItem(LOCAL_STORAGE_KEY)
    }
  }

  const handleWheel = (e) => {
    e.target.blur()
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-100 to-blue-100 px-4 py-6 sm:py-10">
      <div className="w-full max-w-3xl mx-auto bg-white p-4 sm:p-6 rounded-2xl shadow-2xl space-y-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-indigo-600">
          Expense Tracker
        </h1>

        <div className="space-y-1">
          <label className="block text-sm text-gray-600 font-medium">Monthly Salary</label>
          <input
            type="number"
            placeholder="Enter your monthly salary"
            className="w-full p-2 sm:p-3 border rounded-lg text-sm sm:text-base"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            onWheel={handleWheel}
          />
        </div>

        <ExpenseForm
          onAdd={addExpense}
          onUpdate={updateExpense}
          editingExpense={editingExpense}
        />

        <ExpenseList
          expenses={expenses}
          onEdit={handleEdit}
          expenseRefs={expenseRefs}
        />

        <Summary expenses={expenses} salary={parseFloat(salary || 0)} />

        <button
          onClick={clearExpenses}
          className="w-full mt-2 sm:mt-4 bg-red-500 hover:bg-red-600 text-white text-sm sm:text-base p-2 sm:p-3 rounded-lg transition"
        >
          Clear All Expenses
        </button>
      </div>

      <DownloadButtons />
    </div>
  )
}

export default App
