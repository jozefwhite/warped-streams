// src/App.jsx
import React, { useState } from 'react';
import './index.css';

function App() {
  const [minutesListened, setMinutesListened] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [results, setResults] = useState(null);
  const [copyStatus, setCopyStatus] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const calculatedResults = performCalculations(parseFloat(minutesListened));
    setResults(calculatedResults);
    setCurrentStep(2);
  };

  const performCalculations = (minutes) => {
    const totalStreams = minutes / 3.5;
    const perStreamRate = 0.004;
    const totalPayout = totalStreams * perStreamRate;
    const weights = [0.4, 0.25, 0.15, 0.11, 0.09]; // Previously [0.4, 0.25, 0.15, 0.1, 0.1]
    const majorLabelEarnings = weights.map((weight) =>
      (totalPayout * weight * 0.2).toFixed(2)
    );

    const items = [
      { name: 'Chipotle Burritos', price: 8.5 },
      { name: 'Snickers Bars', price: 1.5 },
      { name: 'Bottles of Premium Water', price: 2.0 },
      { name: 'Erewhon Smoothies', price: 22.0 },
      { name: 'Boxes of Band-Aids', price: 3.0 },
      { name: 'Non-Electric Scooters', price: 150.0 },
      { name: 'Years of Spotify Premium', price: 143.88 },
      { name: 'Gallons of Gas', price: 4.0 },
      { name: 'Packs of Guitar Strings', price: 12.0 },
      { name: 'Cups of Artisan Coffee', price: 5.0 },
      { name: 'Boxes of Macarons', price: 18.0 },
      { name: 'Vinyl Records', price: 25.0 },
      { name: 'Pairs of Studio Headphones', price: 120.0 },
      { name: 'Months of Netflix', price: 15.49 },
      { name: 'Packs of Instant Ramen', price: 10.0 },
      { name: 'Movie Tickets', price: 14.0 }
    ];

    const randomItem = items[Math.floor(Math.random() * items.length)];
    const majorLabelItemAmount = (majorLabelEarnings[0] / randomItem.price).toFixed(2);

    // Calculate direct support model earnings
    const directSupportEarnings = (totalPayout * 0.8).toFixed(2);
    const earningsMultiplier = (directSupportEarnings / majorLabelEarnings[0]).toFixed(1);

    const yearlySubscription = 143.88; // Spotify yearly cost
    const albumPrice = 10;
    const concertPrice = 15;
    
    const potentialAlbums = Math.floor(yearlySubscription / albumPrice);
    const potentialConcerts = Math.floor(yearlySubscription / concertPrice);
    const perSongDirectSupport = 0.80; // 80% of a $1 song purchase
    const potentialSongPlays = Math.floor(yearlySubscription / perSongDirectSupport);
    const avgSongLength = 3.1; // minutes
    const potentialListeningTime = Math.floor(potentialSongPlays * avgSongLength);

    // Calculate max streams if full subscription went to one artist
    const maxStreams = Math.floor(yearlySubscription / perStreamRate);
    const maxListeningMinutes = maxStreams * avgSongLength;
    const maxListeningHours = Math.floor(maxListeningMinutes / 60);

    // Calculate percentage of total listening time
    const totalListeningHours = minutes / 60;
    const listeningTimePercentage = Math.round((maxListeningHours / totalListeningHours) * 100);

    return {
      majorLabelEarnings,
      randomItem,
      majorLabelItemAmount,
      directSupportEarnings,
      earningsMultiplier,
      potentialAlbums,
      potentialConcerts,
      potentialSongPlays,
      potentialListeningTime,
      maxListeningHours,
      listeningTimePercentage
    };
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopyStatus(true);
      setTimeout(() => setCopyStatus(false), 2000);
    } catch (err) {
      console.log('Error copying:', err);
      alert('Failed to copy link');
    }
  };

  // Common button classes
  const buttonClasses = "px-6 sm:px-8 py-3 sm:py-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold border border-transparent bg-clip-padding hover:opacity-90 transition-all duration-300 text-sm sm:text-base";

  return (
    <div className="min-h-screen w-screen bg-gradient-to-b from-[#001a15] to-[#03c463] flex items-center justify-center overflow-x-hidden px-4 py-6 sm:py-8">
      <div className="w-full max-w-4xl mx-auto">
        <div className="flex flex-col items-center justify-center">
          {currentStep === 0 && (
            <div className="w-full text-center space-y-6 sm:space-y-8">
              <h1 className="text-3xl sm:text-5xl font-bold mb-3 sm:mb-6 text-white/90 leading-tight sm:leading-relaxed">
                It's that time of year again!
              </h1>
              <p className="text-base sm:text-xl text-gray-300">
                They crunched the numbers, but why stop there?
              </p>
              <button
                onClick={() => setCurrentStep(1)}
                className={`w-full max-w-xs mx-auto ${buttonClasses}`}
              >
                Continue
              </button>
            </div>
          )}

          {currentStep === 1 && (
            <div className="w-full text-center space-y-8">
              <h1 className="text-4xl sm:text-5xl font-bold mb-4 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-500 leading-tight sm:leading-relaxed">
                How much of your subscription did your #1 artist receive?
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
                      placeholder="e.g., 8,000"
                      required
                      className="w-full p-3 sm:p-4 text-base sm:text-lg bg-black/50 border-2 border-gray-700 rounded-lg text-white placeholder-gray-400
                                 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className={`w-full ${buttonClasses}`}
                  >
                    Calculate Earnings
                  </button>
                </form>
              </div>
            </div>
          )}

          {currentStep === 2 && results && (
            <>
              <h2 className="text-4xl sm:text-5xl font-bold mb-4 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-500 leading-tight sm:leading-relaxed">
                Based on your listening habits...
              </h2>
              
              <div className="w-full bg-black/30 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-xl space-y-4 sm:space-y-6 pb-20 sm:pb-24 relative">
                {/* Highlight top artist */}
                <div className="p-3 sm:p-6 rounded-xl bg-black/50 border border-gray-800/50">
                  <p className="text-white mb-1 sm:mb-2">Your #1 Artist Received</p>
                  <p className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 px-2 sm:px-4 py-1 sm:py-2 rounded-lg [text-shadow:_0_1px_3px_rgb(0_0_0_/_40%)] bg-black/40">
                    ${results.majorLabelEarnings[0]}
                  </p>
                </div>

                {/* List remaining artists */}
                <div className="p-4 sm:p-6 rounded-xl bg-black/50 border border-gray-800/50">
                  <p className="text-gray-400 mb-2 sm:mb-4">Other Top Artists</p>
                  <div className="space-y-2 sm:space-y-3">
                    {results.majorLabelEarnings.slice(1).map((earning, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-gray-400">Artist {index + 2}</span>
                        <span className="text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg [text-shadow:_0_1px_3px_rgb(0_0_0_/_40%)] bg-black/40">
                          ${earning}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-base sm:text-lg text-white mb-4 sm:mb-6 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-black/40 inline-block">
                    Your top artist could buy approximately{' '}
                    <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-green-400">
                      {results.majorLabelItemAmount}
                    </span>{' '}
                    <span className="text-gray-200">{results.randomItem.name}</span>!
                  </p>
                </div>

                <button
                  onClick={() => setCurrentStep(1)}
                  className={`fixed bottom-4 sm:bottom-8 left-4 sm:left-8 ${buttonClasses}`}
                >
                  Calculate Again
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  className={`fixed bottom-4 sm:bottom-8 right-4 sm:right-8 ${buttonClasses}`}
                >
                  Continue
                </button>
              </div>
            </>
          )}

          {currentStep === 3 && results && (
            <>
              <h2 className="text-4xl sm:text-5xl font-bold mb-4 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-500 leading-tight sm:leading-relaxed">
                It doesn't have to be this way
              </h2>
              
              <div className="w-full bg-black/30 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-xl space-y-4 sm:space-y-6 pb-24 sm:pb-32 relative">
                {/* Direct support model */}
                <div className="p-4 sm:p-6 rounded-xl bg-black/50 border border-gray-800/50">
                  <p className="text-white mb-1 sm:mb-2">With a direct support model, your #1 artist would have received</p>
                  <p className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 px-2 sm:px-4 py-1 sm:py-2 rounded-lg [text-shadow:_0_1px_3px_rgb(0_0_0_/_40%)] bg-black/40">
                    ${results.directSupportEarnings}
                  </p>
                  <p className="text-gray-400 mt-4">
                    That's <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-yellow-400 to-green-400">{results.earningsMultiplier}x</span> more!
                  </p>
                </div>

                <div className="p-4 sm:p-6 rounded-xl bg-black/50 border border-gray-800/50">
                  <p className="text-white mb-6">Your yearly Spotify subscription could have paid for</p>
                  
                  <div className="space-y-4">
                    <p className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-yellow-400 to-green-400">
                      {results.potentialAlbums} full albums
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-yellow-400 to-green-400">
                      {results.potentialConcerts} concert tickets
                    </p>
                  </div>
                  
                  <div className="mt-8">
                    <p className="text-gray-400 mb-6">or</p>
                    
                    <p className="text-white mb-4">You could've listened to your top song for</p>
                    <p className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 mb-2">
                      {results.maxListeningHours} hours straight
                    </p>
                    <p className="text-sm text-gray-400">
                      ({results.listeningTimePercentage}% of your total listening time)
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setCurrentStep(2)}
                  className={`fixed bottom-4 sm:bottom-8 left-4 sm:left-8 ${buttonClasses}`}
                >
                  Back
                </button>

                <button
                  onClick={handleCopy}
                  className={`fixed bottom-4 sm:bottom-8 right-4 sm:right-8 ${buttonClasses}`}
                >
                  {copyStatus ? 'Link Copied!' : 'Share'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
