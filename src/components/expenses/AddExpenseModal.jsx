import React, { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';

const AddExpenseModal = ({ isOpen, onClose, onAdd }) => {
  const [expenseData, setExpenseData] = useState({
    description: '',
    amount: '',
    date: '',
    category: 'Débito'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpenseData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      ...expenseData,
      amount: parseFloat(expenseData.amount)
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-white">Agregar Gasto</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Descripción"
            type="text"
            name="description"
            value={expenseData.description}
            onChange={handleChange}
            placeholder="Ingrese la descripción..."
          />
          <Input
            label="Monto"
            type="number"
            name="amount"
            value={expenseData.amount}
            onChange={handleChange}
            placeholder="0.00"
          />
          <Input
            label="Fecha"
            type="date"
            name="date"
            value={expenseData.date}
            onChange={handleChange}
          />
          <div className="mb-4">
            <label className="block text-sm mb-2 text-white">Categoría</label>
            <select
              name="category"
              value={expenseData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="Débito">Débito</option>
              <option value="Crédito">Crédito</option>
              <option value="Efectivo">Efectivo</option>
            </select>
          </div>
          <div className="flex space-x-4">
            <Button type="submit" fullWidth>
              Agregar
            </Button>
            <Button 
              type="button" 
              onClick={onClose}
              fullWidth 
              className="bg-gray-600 hover:bg-gray-700"
            >
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExpenseModal;