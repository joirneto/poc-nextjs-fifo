"use client";
import { useState } from "react";

export default function Home() {
  const [queue, setQueue] = useState<{ key: string; points: number; money: number }[]>([]); // Fila com { key, points, money }
  const [inputPoints, setInputPoints] = useState(""); // Entrada para pontos a adicionar
  const [inputMoney, setInputMoney] = useState(""); // Entrada para reais a adicionar
  const [inputKey, setInputKey] = useState(""); // Entrada para o nome da key
  const [removePoints, setRemovePoints] = useState(""); // Entrada para pontos a remover
  const [removeMoney, setRemoveMoney] = useState(""); // Entrada para reais a remover
  const [history, setHistory] = useState<{ key: string; points: number; money: number }[]>([]); // Histórico de operações
  const [totalPoints, setTotalPoints] = useState(0); // Saldo total de pontos
  const [totalMoney, setTotalMoney] = useState(0); // Saldo total em reais
  const [errorMessage, setErrorMessage] = useState(""); // Mensagem de erro
  const [keyCounter, setKeyCounter] = useState(1); // Contador para gerar chaves únicas
  
  const handleAdd = () => {
    const points = Number(inputPoints);
    const money = Number(inputMoney);

    if ((points <= 0 || isNaN(points)) && (money <= 0 || isNaN(money))) {
      setErrorMessage("Please enter a positive value for points or money.");
      return;
    }

    const newKey = inputKey || `key${keyCounter}`; // Usa o nome da chave fornecido ou gera uma chave única
    const somaPontos = queue.reduce((acc, item) => acc + item.points, 0) + (points || 0);
    const somaDinheiro = queue.reduce((acc, item) => acc + item.money, 0) + (money || 0);
    const media = (somaDinheiro / somaPontos) * 1000;
    
    setQueue([...queue, { key: newKey, points: points || 0, money: money || 0 }]);
    setHistory([...history, { key: newKey, points: points || 0, money: money || 0 }]);
    setTotalPoints(totalPoints + (points || 0));
    setTotalMoney(media);
    setInputPoints("");
    setInputMoney("");
    setInputKey(""); // Limpa o campo de nome da chave
    setKeyCounter(keyCounter + 1);
    setErrorMessage("");
  };

  const handleRemove = () => {
    const pointsToRemove = Number(removePoints);
    const moneyToRemove = Number(removeMoney);

    if (pointsToRemove <= 0 || isNaN(pointsToRemove)) {
      setErrorMessage("Please enter a positive value for points or money.");
      return;
    }

    if (pointsToRemove > totalPoints) {
      setErrorMessage("Insufficient balance for removal.");
      return;
    }

    let remainingPoints = pointsToRemove;
    const newQueue = [...queue];
    const tempHistory: { key: string; points: number; money: number }[] = [];

    while ((remainingPoints > 0) && newQueue.length > 0) {
      const current = newQueue[0] as { key: string; points: number; money: number };
      const pointsUsed = Math.min(current.points, remainingPoints);

      if (pointsUsed > 0) {
        tempHistory.push({ key: current.key, points: -pointsUsed, money: moneyToRemove });
      }

      current.points -= pointsUsed;
      remainingPoints -= pointsUsed;

      if (current.points === 0) {
        newQueue.shift();
      }
    }

    setQueue(newQueue);
    setHistory(prevHistory => {
      return [...prevHistory, ...tempHistory];
    });
    setTotalPoints(totalPoints - pointsToRemove);
    if(totalPoints - pointsToRemove === 0){
      setTotalMoney(0);
    }

    setRemovePoints("");
    setRemoveMoney("");
    setErrorMessage("");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Simulation</h1>

      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        {/* Add Points and Money */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Add Points and Money:</label>
          <div className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="Key (Optional)"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              className="text-gray-700 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Points"
              value={inputPoints}
              onChange={(e) => setInputPoints(e.target.value)}
              className="text-gray-700 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Money"
              value={inputMoney}
              onChange={(e) => setInputMoney(e.target.value)}
              className="text-gray-700 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleAdd}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Add
            </button>
          </div>
        </div>

        {/* Remove Points and Money */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Remove Points:</label>
          <div className="flex flex-col gap-2">
            <input
              type="number"
              placeholder="Points"
              value={removePoints}
              onChange={(e) => setRemovePoints(e.target.value)}
              className="text-gray-700 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button
              onClick={handleRemove}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Remove
            </button>
          </div>
          {errorMessage && (
            <p className="text-red-500 mt-2">{errorMessage}</p>
          )}
        </div>

        {/* Totals */}
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Totals:</h3>
        <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 mb-6">
          <p className="text-lg text-gray-800">Points: {totalPoints}</p>
          <p className="text-lg text-gray-800">Average Money: {totalMoney.toFixed(2)} for 1K points</p>
        </div>

        {/* History */}
        <h3 className="text-lg font-semibold text-gray-800 mb-2">History:</h3>
        <div className="bg-gray-100 border border-gray-300 rounded-lg p-4">
          {history.length > 0 ? (
            <ul>
              {history.map((item, index) => (
                <li
                  key={index}
                  className={`text-lg ${item.points > 0 ? "text-blue-500" : "text-red-500"}`}
                >
                  {item.points !== 0 && `${item.points > 0 ? "+" : ""}${item.points} pts `}
                  {item.points > 0 && `${item.money > 0 ? "+" : ""}${item.money.toFixed(2)} R$ `}
                  (from {item.key})
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
