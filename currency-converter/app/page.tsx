// app/page.tsx
"use client";

import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [value, setValue] = useState<number | string>('');
  const [fromCurrency, setFromCurrency] = useState<string>('');
  const [toCurrency, setToCurrency] = useState<string>('');
  const [convertedValue, setConvertedValue] = useState<number | null>(null);

  const handleConvert = async () => {
    try {
      const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
      const rate = response.data.rates[toCurrency];
      const result = Number(value) * rate;
      setConvertedValue(Number(result.toFixed(2)));
    } catch (error) {
      console.error('Error fetching conversion rate', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-2">
      <h1 className="text-4xl font-bold mb-8">Currency Converter</h1>
      <div className="flex flex-col items-center space-y-4">
        <div className="flex flex-col">
          <label className="text-lg font-medium mb-2">Value:</label>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-medium mb-2">From Currency:</label>
          <input
            type="text"
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="p-2 border rounded"
            placeholder="e.g., USD"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-medium mb-2">To Currency:</label>
          <input
            type="text"
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="p-2 border rounded"
            placeholder="e.g., EUR"
          />
        </div>
        <button
          onClick={handleConvert}
          className="px-4 py-2 bg-blue-500 text-white rounded mt-4"
        >
          Convert
        </button>
        {convertedValue !== null && (
          <div className="text-xl font-bold mt-4">
            Converted Value: {convertedValue} {toCurrency}
          </div>
        )}
      </div>
    </div>
  );
}