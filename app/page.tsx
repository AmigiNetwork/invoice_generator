"use client";

import { useState } from "react";

export default function Home() {
  const [client, setClient] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [items, setItems] = useState([
    { description: "", quantity: 1, price: 0 },
  ]);
  const [tax, setTax] = useState(0);

  const handleItemChange = (idx: number, field: string, value: any) => {
    setItems((prev) =>
      prev.map((item, i) =>
        i === idx ? { ...item, [field]: value } : item
      )
    );
  };

  const addItem = () => {
    setItems([...items, { description: "", quantity: 1, price: 0 }]);
  };

  const removeItem = (idx: number) => {
    setItems(items.filter((_, i) => i !== idx));
  };

  const subtotal = items.reduce(
    (sum, item) => sum + Number(item.quantity) * Number(item.price),
    0
  );
  const total = subtotal + Number(tax);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex flex-col items-center py-12 px-4 font-sans">
      <header className="mb-8 flex flex-col items-center">
        <div className="text-3xl font-bold tracking-tight text-gray-900 mb-2">
          Invoice Generator
        </div>
        <div className="text-gray-500 text-sm">Create sleek invoices in seconds</div>
      </header>
      <main className="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl">
        <form
          className="flex flex-col gap-6"
          onSubmit={(e) => {
            e.preventDefault();
            // You can add invoice generation logic here
            alert("Invoice generated!");
          }}
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bill To
              </label>
              <input
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="text"
                placeholder="Client Name"
                value={client}
                onChange={(e) => setClient(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Items
            </label>
            <div className="flex flex-col gap-3">
              {items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex gap-2 items-center bg-gray-50 rounded p-2"
                >
                  <input
                    className="flex-1 border border-gray-300 rounded px-2 py-1"
                    type="text"
                    placeholder="Description"
                    value={item.description}
                    onChange={(e) =>
                      handleItemChange(idx, "description", e.target.value)
                    }
                    required
                  />
                  <input
                    className="w-20 border border-gray-300 rounded px-2 py-1"
                    type="number"
                    min={1}
                    placeholder="Qty"
                    value={item.quantity}
                    onChange={(e) =>
                      handleItemChange(idx, "quantity", e.target.value)
                    }
                    required
                  />
                  <input
                    className="w-24 border border-gray-300 rounded px-2 py-1"
                    type="number"
                    min={0}
                    step="0.01"
                    placeholder="Price"
                    value={item.price}
                    onChange={(e) =>
                      handleItemChange(idx, "price", e.target.value)
                    }
                    required
                  />
                  <button
                    type="button"
                    className="text-red-500 hover:text-red-700 px-2"
                    onClick={() => removeItem(idx)}
                    disabled={items.length === 1}
                    title="Remove item"
                  >
                    &times;
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="text-blue-600 hover:underline text-sm self-start mt-1"
                onClick={addItem}
              >
                + Add Item
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-end justify-between">
            <div className="flex-1"></div>
            <div className="w-full sm:w-64 bg-gray-50 rounded p-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Tax</span>
                <input
                  className="w-20 border border-gray-300 rounded px-2 py-1 text-right"
                  type="number"
                  min={0}
                  step="0.01"
                  value={tax}
                  onChange={(e) => setTax(Number(e.target.value))}
                />
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
          >
            Generate Invoice
          </button>
        </form>
      </main>
      <footer className="mt-10 text-gray-400 text-xs">
        &copy; {new Date().getFullYear()} Invoice Generator. All rights reserved.
      </footer>
    </div>
  );
}
