"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import '../app/globals.css';

interface CurrencyData {
  [key: string]: number;
}

export default function Home() {
  const [value1, setValue1] = useState<number | string>('');
  const [value2, setValue2] = useState<number | string>('');
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('INR');
  const [currencies, setCurrencies] = useState<CurrencyData>({});

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get('https://open.er-api.com/v6/latest/USD');
        setCurrencies(response.data.rates);
      } catch (error) {
        console.error('Error fetching currencies', error);
      }
    };

    fetchCurrencies();
  }, []);

  const convertFromValue1 = async (value: number | string) => {
    if (value === '') {
      setValue2('');
      return;
    }
    try {
      const response = await axios.get(`https://open.er-api.com/v6/latest/${fromCurrency}`);
      const rate = response.data.rates[toCurrency];
      const result = Number(value) * rate;
      setValue2(result.toFixed(2));
    } catch (error) {
      console.error('Error fetching conversion rate', error);
    }
  };

  const convertFromValue2 = async (value: number | string) => {
    if (value === '') {
      setValue1('');
      return;
    }
    try {
      const response = await axios.get(`https://open.er-api.com/v6/latest/${toCurrency}`);
      const rate = response.data.rates[fromCurrency];
      const result = Number(value) * rate;
      setValue1(result.toFixed(2));
    } catch (error) {
      console.error('Error fetching conversion rate', error);
    }
  };

  const handleValue1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue1(e.target.value);
    convertFromValue1(e.target.value);
  };

  const handleValue2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue2(e.target.value);
    convertFromValue2(e.target.value);
  };

  const handleFromCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFromCurrency(e.target.value);
    if (value1 !== '') convertFromValue1(value1);
  };

  const handleToCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setToCurrency(e.target.value);
    if (value2 !== '') convertFromValue2(value2);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-2">
      <h1 className="text-4xl font-bold mb-8">Currency Converter</h1>
      <div className="flex space-x-8">
        <div className="flex flex-col">
          <label className="text-lg font-medium mb-2">Currency 1:</label>
          <select
            value={fromCurrency}
            onChange={handleFromCurrencyChange}
            className="p-2 border rounded custom-select"
          >
            {Object.keys(currencies).map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
          <input
            type="number"
            value={value1}
            onChange={handleValue1Change}
            className="p-2 border rounded mt-2"
            placeholder="Enter a value"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-medium mb-2">Currency 2:</label>
          <select
            value={toCurrency}
            onChange={handleToCurrencyChange}
            className="p-2 border rounded custom-select"
          >
            {Object.keys(currencies).map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
          <input
            type="number"
            value={value2}
            onChange={handleValue2Change}
            className="p-2 border rounded mt-2"
            placeholder="Enter a value"
          />
        </div>
      </div>
      <button
        onClick={() => {
          setValue1('');
          setValue2('');
        }}
        className="px-4 py-2 bg-gray-500 text-white rounded mt-4 ml-2"
      >
        Clear
      </button>
    </div>
  );
}