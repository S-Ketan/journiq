'use client';
import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');
  const [formError, setFormError] = useState('');

  const categories = ['Accommodation', 'Transportation', 'Food', 'Activities', 'Other'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category) {
      setFormError('Please select a category');
      return;
    }
    if (!amount || amount <= 0) {
      setFormError('Please enter a positive amount');
      return;
    }
    if (!date) {
      setFormError('Please select a date');
      return;
    }
    setFormError('');
    const newExpense = {
      id: uuid(),
      category,
      amount: parseFloat(amount),
      date: new Date(date),
      description
    };
    setExpenses([...expenses, newExpense]);
    setCategory('');
    setAmount('');
    setDate(new Date().toISOString().split('T')[0]);
    setDescription('');
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const categorySummaries = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  const sortedExpenses = [...expenses].sort((a, b) => b.date - a.date);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Expense Tracker</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Form Section */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Add Expense</h2>
          {formError && <p className="text-red-500 mb-2">{formError}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount"
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Description</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                className="w-full p-2 border rounded"
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Add Expense
            </button>
          </form>
        </div>
        {/* Summary Section */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Summary</h2>
          <p className="text-gray-700">Total Expenses: <span className="font-bold">${totalExpenses.toFixed(2)}</span></p>
          <h3 className="font-semibold mt-4 text-gray-700">By Category:</h3>
          <ul className="list-disc list-inside text-gray-600">
            {Object.entries(categorySummaries).map(([cat, total]) => (
              <li key={cat}>{cat}: ${total.toFixed(2)}</li>
            ))}
          </ul>
        </div>
      </div>
      {/* Expenses List */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Expenses</h2>
        {sortedExpenses.length === 0 ? (
          <p className="text-gray-600">No expenses recorded yet.</p>
        ) : (
          <ul className="space-y-4">
            {sortedExpenses.map((expense) => (
              <li key={expense.id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
                <div>
                  <p className="font-semibold text-gray-800">{expense.category}</p>
                  <p className="text-gray-600">${expense.amount.toFixed(2)}</p>
                  <p className="text-gray-500 text-sm">{expense.date.toLocaleDateString()}</p>
                  <p className="text-gray-500 text-sm">{expense.description}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ExpenseTracker;