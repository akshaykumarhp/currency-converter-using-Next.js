"use client";
import Head from 'next/head';
import { useState, useEffect } from 'react';
import axios from 'axios';
import '../app/globals.css';
import React from 'react';

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
    <>
      <Head>
        <title>Currency Converter</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className="min-h-screen flex flex-col items-center justify-center py-2 bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl w-full">
          <div className="flex flex-col items-center mb-4">
            <img src="/favicon.png" alt="Currency Converter Logo" className="h-20 w-20 mb-4" />
            <h1 className="text-4xl font-bold mb-8 text-center">Currency Converter</h1>
          </div>
          <div className="flex justify-between space-x-8">
            <div className="flex-1 flex flex-col space-y-4">
              <div className="flex flex-col mb-4">
                <label className="text-lg font-medium mb-2">Currency 1:</label>
                <select
                  value={fromCurrency}
                  onChange={handleFromCurrencyChange}
                  className="p-2 border rounded custom-select bg-gray-50 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
                  className="p-2 border rounded mt-2 bg-gray-50 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter amount"
                />
              </div>
            </div>
            <div className="flex-1 flex flex-col space-y-4">
              <div className="flex flex-col mb-4">
                <label className="text-lg font-medium mb-2">Currency 2:</label>
                <select
                  value={toCurrency}
                  onChange={handleToCurrencyChange}
                  className="p-2 border rounded custom-select bg-gray-50 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
                  className="p-2 border rounded mt-2 bg-gray-50 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter amount"
                />
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              setValue1('');
              setValue2('');
            }}
            className="px-4 py-2 bg-red-500 text-white rounded mt-4 hover:bg-red-600"
          >
            Clear
          </button>
        </div>
      </div>
    </>
  );
}