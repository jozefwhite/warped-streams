// src/App.jsx
import React, { useState } from 'react';
import './index.css';

function App() {
  const [minutesListened, setMinutesListened] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const calculatedResults = performCalculations(parseFloat(minutesListened));
    setResults(calculatedResults);
    setShowResults(true);
  };

  const performCalculations = (minutes) => {
    // Convert minutes to streams (average song length 3.5 minutes)
    const totalStreams = minutes / 3.5;
    
    // Spotify pays around $0.003 - $0.005 per stream
    const perStreamRate = 0.004;
    
    // Calculate total payout from streams
    const totalPayout = totalStreams * perStreamRate;
    
    // Weighted percentages for top 5 artists
    const weights = [0.4, 0.25, 0.15, 0.1, 0.1];
  
    // Major label payout (20% of total)
    const majorLabelEarnings = weights.map((weight) =>
      (totalPayout * weight * 0.2).toFixed(2)
    );
  
    // Random item comparison
    const items = [
      { name: 'Chipotle Burrito', price: 8.5 },
      { name: 'Snickers Bar', price: 1.5 },
      { name: 'Bottle of Evian Water', price: 2.0 },
      { name: 'Erewhon Smoothie', price: 22.0 },
      { name: 'Box of Band-Aids', price: 3.0 },
      { name: 'Non-Electric Scooter', price: 150.0 },
      { name: 'Year of Spotify Premium', price: 143.88 },
    ];
  
    const randomItem = items[Math.floor(Math.random() * items.length)];
    const majorLabelItemAmount = (majorLabelEarnings[0] / randomItem.price).toFixed(2);
  
    // Add console.log for debugging
    console.log({
      minutes,
      totalStreams,
      totalPayout,
      majorLabelEarnings,
      majorLabelItemAmount
    });
  
    return {
      majorLabelEarnings,
      randomItem,
      majorLabelItemAmount,
    };
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-b from-[#003d33] to-[#00ffd1] flex items-center justify-center overflow-x-hidden">
      <div className="w-full max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="flex flex-col items-center justify-center">
          {!showResults ? (
            <div className="w-full text-center space-y-8">
              <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
                How much of your subscription did your favorite artist recieve?
              </h1>
              <p className="text-lg sm:text-xl text-gray-300">
                Enter your total minutes listened this year to find out!
              </p>

              <div className="w-full max-w-2xl mx-auto bg-black/30 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-white text-lg mb-2">Minutes Listened</label>
                    <input
                      type="number"
                      value={minutesListened}
                      onChange={(e) => setMinutesListened(e.target.value)}
                      placeholder="e.g., 90000"
                      required
                      className="w-full p-4 text-lg bg-black/50 border-2 border-gray-700 rounded-lg text-white placeholder-gray-400
                                 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold 
                               border border-transparent bg-clip-padding hover:opacity-90 transition-all duration-300"
                  >
                    Calculate Earnings
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div className="w-full bg-black/30 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl space-y-8">
              <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
                Based on your listening habits...
              </h2>
              
              <div className="p-6 rounded-xl bg-black/50 border border-gray-800/50">
                <p className="text-gray-400 mb-2">Your Number 1 Artist Received</p>
                <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
                  ${results.majorLabelEarnings[0]}
                </p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-blue-400 mb-4">Top Artists</h4>
                <ol className="space-y-2">
                  {results.majorLabelEarnings.map((earning, index) => (
                    <li key={index} className="flex justify-between p-2 bg-black/30 rounded-lg">
                      <span className="text-gray-300">Artist {index + 1}</span>
                      <span className="font-mono font-bold text-blue-400">${earning}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="text-center">
                <p className="text-lg text-gray-300 mb-8">
                  Your top artist could buy approximately{' '}
                  <span className="font-bold text-blue-400">{results.majorLabelItemAmount}</span>{' '}
                  <span className="text-gray-400">{results.randomItem.name}(s)</span>!
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-8 py-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold 
                             border border-transparent bg-clip-padding hover:opacity-90 transition-all duration-300"
                >
                  Calculate Again
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
