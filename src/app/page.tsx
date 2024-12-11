'use client';
import { useState } from "react";

export default function Home() {
  const [queue, setQueue] = useState<number[]>([]); // Estado para a fila
  const [inputValue, setInputValue] = useState(""); // Entrada para adicionar valores
  const [removeValue, setRemoveValue] = useState(""); // Entrada para remover valores
  const [history, setHistory] = useState<string[]>([]); // Histórico de operações
  const [total, setTotal] = useState(0); // Saldo total
  const [errorMessage, setErrorMessage] = useState(""); // Mensagem de erro para saques inválidos

  const handleAdd = () => {
    if (inputValue && !isNaN(Number(inputValue))) {
      const value = parseInt(inputValue);

      // Atualizar fila, histórico e saldo total
      setQueue([...queue, value]);
      setHistory([...history, `+${value}`]);
      setTotal(total + value);
      setInputValue("");
      setErrorMessage(""); // Limpar mensagens de erro
    }
  };

  const handleRemove = () => {
    if (removeValue && !isNaN(Number(removeValue))) {
      const value = parseInt(removeValue);

      if (value > total) {
        // Mensagem de erro se o valor a ser removido exceder o saldo
        setErrorMessage("Saldo insuficiente para retirada.");
      } else {
        let amountToRemove = value;
        const newQueue = [...queue];
        const tempHistory: string[] = [];
        
        while (amountToRemove > 0 && newQueue.length > 0) {
          if (amountToRemove >= newQueue[0]) {
            // Quando o valor a ser retirado é maior ou igual ao valor da primeira entrada
            tempHistory.push(`-${newQueue[0]}`); // Adiciona no histórico
            amountToRemove -= newQueue[0]; // Diminui a quantidade retirada
            newQueue.shift(); // Remove da fila
          } else {
            // Se o valor a ser retirado é menor que o valor da primeira entrada
            tempHistory.push(`-${amountToRemove}`); // Adiciona no histórico
            newQueue[0] -= amountToRemove; // Subtrai da entrada atual
            amountToRemove = 0; // Não resta mais valor a ser retirado
          }
        }

        setQueue(newQueue);
        setHistory([...history, ...tempHistory]); // Atualiza o histórico com as retiradas parciais
        setTotal(total - value); // Atualiza o saldo total
        setRemoveValue("");
        setErrorMessage(""); // Limpar mensagens de erro
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">FIFO Queue Simulation</h1>

      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Add Value:</label>
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
          <label className="block text-gray-700 font-medium mb-2">Remove Value:</label>
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

        <h3 className="text-lg font-semibold text-gray-800 mb-2">Current Queue:</h3>
        <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 mb-6">
          {queue.length > 0 ? (
            <pre className="text-gray-700">{JSON.stringify(queue)}</pre>
          ) : (
            <p className="text-gray-500">Queue is empty</p>
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
                    item.startsWith("+") ? "text-blue-500" : "text-red-500"
                  }`}
                >
                  {item}
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
