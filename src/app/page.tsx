'use client';
import { useState } from "react";

export default function Home() {
  const [queue, setQueue] = useState<{ key: string; value: number }[]>([]); // Fila agora é um array de objetos { key, value }
  const [inputValue, setInputValue] = useState(""); // Entrada para adicionar valores
  const [removeValue, setRemoveValue] = useState(""); // Entrada para remover valores
  const [history, setHistory] = useState<{ key: string; value: number }[]>([]); // Histórico de operações
  const [total, setTotal] = useState(0); // Saldo total
  const [errorMessage, setErrorMessage] = useState(""); // Mensagem de erro para saques inválidos
  const [keyCounter, setKeyCounter] = useState(1); // Contador para gerar chaves únicas

  const handleAdd = () => {
    const value = Number(inputValue);

    if (value <= 0 || isNaN(value)) {
      // Verificar se o valor é positivo e válido
      setErrorMessage("Please enter a positive value.");
      return;
    }

    const newKey = `key${keyCounter}`;
    setQueue([...queue, { key: newKey, value }]);
    setHistory([...history, { key: newKey, value }]);
    setTotal(total + value);
    setInputValue("");
    setKeyCounter(keyCounter + 1);
    setErrorMessage(""); // Limpar mensagens de erro
  };

  const handleRemove = () => {
    const value = Number(removeValue);

    if (value <= 0 || isNaN(value)) {
      // Verificar se o valor é positivo e válido
      setErrorMessage("Please enter a positive value.");
      return;
    }

    if (Math.abs(value) > total) {
      // Mensagem de erro se o valor a ser removido exceder o saldo
      setErrorMessage("Insufficient balance for withdrawal.");
    } else {
      let amountToRemove = Math.abs(value);
      const newQueue = [...queue];
      const tempHistory: { key: string; value: number }[] = [];

      while (amountToRemove > 0 && newQueue.length > 0) {
        if (amountToRemove >= newQueue[0].value) {
          tempHistory.push({ key: newQueue[0].key, value: -newQueue[0].value });
          amountToRemove -= newQueue[0].value;
          newQueue.shift();
        } else {
          tempHistory.push({ key: newQueue[0].key, value: -amountToRemove });
          newQueue[0].value -= amountToRemove;
          amountToRemove = 0;
        }
      }

      setQueue(newQueue);
      setHistory([...history, ...tempHistory]);
      setTotal(total - Math.abs(value));
      setRemoveValue("");
      setErrorMessage(""); // Limpar mensagens de erro
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">FIFO Queue Simulation</h1>

      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <div className="mb-4">
          <label className="block font-medium mb-2">Add Value:</label>
          <div className="flex">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleAdd}
              className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition"
            >
              Add
            </button>
          </div>
        </div>

        <div className="mb-6">
          <label className="block font-medium mb-2">Remove Value:</label>
          <div className="flex">
            <input
              type="number"
              value={removeValue}
              onChange={(e) => setRemoveValue(e.target.value)}
              className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button
              onClick={handleRemove}
              className="bg-red-500 text-white px-4 py-2 rounded-r-lg hover:bg-red-600 transition"
            >
              Remove
            </button>
          </div>
          {errorMessage && (
            <p className="text-red-500 mt-2">{errorMessage}</p>
          )}
        </div>

        <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Balance:</h3>
        <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 mb-6">
          <p className="text-lg text-gray-800">{total}</p>
        </div>

        <h3 className="text-lg font-semibold text-gray-800 mb-2">History:</h3>
        <div className="bg-gray-100 border border-gray-300 rounded-lg p-4">
          {history.length > 0 ? (
            <ul>
              {history.map((item, index) => (
                <li
                  key={index}
                  className={`text-lg ${
                    item.value > 0 ? "text-blue-500" : "text-red-500"
                  }`}
                >
                  {item.value > 0
                    ? `+${item.value} (from ${item.key})`
                    : `${item.value} (from ${item.key})`}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No history available</p>
          )}
        </div>
      </div>
    </div>
  );
}
