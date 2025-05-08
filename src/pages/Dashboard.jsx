import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [chartData, setChartData] = useState({
    labels: ['Débito', 'Crédito', 'Efectivo'],
    datasets: [{
      data: [0, 0, 0],
      backgroundColor: [
        '#4CAF50',
        '#2196F3',
        '#FFC107'
      ],
      borderColor: [
        '#388E3C',
        '#1976D2',
        '#FFA000'
      ],
      borderWidth: 1
    }]
  });
  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: '',
    date: '',
    category: 'Débito'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExpense(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEdit = (expense, index) => {
    setIsEditing(true);
    setEditingId(index);
    setNewExpense(expense);
    setIsModalOpen(true);
  };

  const handleDelete = (index) => {
    if (window.confirm('¿Está seguro de que desea eliminar este gasto?')) {
      setExpenses(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newExpense.description || !newExpense.amount || !newExpense.date) {
      alert('Por favor complete todos los campos');
      return;
    }

    if (isEditing) {
      setExpenses(prev => prev.map((expense, i) => 
        i === editingId ? { ...newExpense, amount: parseFloat(newExpense.amount) } : expense
      ));
      setIsEditing(false);
      setEditingId(null);
    } else {
      setExpenses(prev => [...prev, {
        ...newExpense,
        amount: parseFloat(newExpense.amount)
      }]);
    }
    
    setNewExpense({
      description: '',
      amount: '',
      date: '',
      category: 'Débito'
    });
    setIsModalOpen(false);
  };

  useEffect(() => {
    updateChartData();
  }, [expenses]);

  const updateChartData = () => {
    const categoryTotals = {
      'Débito': 0,
      'Crédito': 0,
      'Efectivo': 0
    };

    expenses.forEach(expense => {
      categoryTotals[expense.category] += parseFloat(expense.amount);
    });

    setChartData(prev => ({
      ...prev,
      datasets: [{
        ...prev.datasets[0],
        data: Object.values(categoryTotals)
      }]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl">
            <span className="text-[#87CEEB]">MONEY</span>{' '}
            <span className="text-[#FF0000]">RING</span>
          </h1>
          <nav>
            <button className="px-4 py-2 hover:bg-gray-700 rounded">Dashboard</button>
          </nav>
        </div>
        <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-6">
        <div className="flex justify-center items-center h-[500px]">
          <div className="w-[400px] h-[400px]">
            <Doughnut
              data={chartData}
              options={{
                responsive: true,
                cutout: '70%',
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: {
                      color: 'white'
                    }
                  }
                }
              }}
            />
          </div>
        </div>

        {/* Expense List */}
        <div className="mt-8 bg-gray-800 rounded-lg p-4">
          <div className="grid grid-cols-4 text-white font-semibold p-3 border-b border-gray-700">
            <div>Descripción</div>
            <div className="text-right">Monto</div>
            <div className="text-right">Fecha</div>
            <div className="text-right">Categoría</div>
          </div>
          {expenses.length === 0 ? (
            <div className="text-center text-gray-400 py-8">
              No hay gastos registrados
            </div>
          ) : (
            expenses.map((expense, index) => (
              <div key={index} className="expense-item bg-gray-700 p-3 mt-2 rounded grid grid-cols-4 text-white">
                <div className="flex items-center space-x-2">
                  <span>{expense.description}</span>
                  <div className="flex space-x-2">
                    <button 
                      className="text-gray-400 hover:text-white"
                      onClick={() => handleDelete(index)}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                    <button 
                      className="text-gray-400 hover:text-white"
                      onClick={() => handleEdit(expense, index)}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="text-right">${expense.amount}</div>
                <div className="text-right">{expense.date}</div>
                <div className="text-right">{expense.category}</div>
              </div>
            ))
          )}
        </div>
      </main>
      {/* Add Expense Button and Modal */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-8 right-8 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 shadow-xl transform hover:translate-y-[-8px] transition-all duration-300 ease-in-out animate-pulse hover:animate-none hover:shadow-2xl"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-white">
              {isEditing ? 'Editar Gasto' : 'Agregar Gasto'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Descripción
                </label>
                <input
                  type="text"
                  name="description"
                  value={newExpense.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                  placeholder="Ingrese descripción"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Monto
                </label>
                <input
                  type="number"
                  name="amount"
                  value={newExpense.amount}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                  placeholder="0.00"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Fecha
                </label>
                <input
                  type="date"
                  name="date"
                  value={newExpense.date}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Categoría
                </label>
                <select
                  name="category"
                  value={newExpense.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                >
                  <option value="Débito">Débito</option>
                  <option value="Crédito">Crédito</option>
                  <option value="Efectivo">Efectivo</option>
                </select>
              </div>
              <div className="flex space-x-4 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                >
                  {isEditing ? 'Actualizar' : 'Guardar'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setIsEditing(false);
                    setEditingId(null);
                    setNewExpense({
                      description: '',
                      amount: '',
                      date: '',
                      category: 'Débito'
                    });
                  }}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;