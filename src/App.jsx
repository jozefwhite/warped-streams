// src/App.jsx
import React, { useState } from 'react';
import './index.css';
import trLogo from '/Asset 1.svg'

// Update Logo component with higher z-index and better positioning
const Logo = () => (
  <a 
    href="https://www.tabularasarecords.com"
    target="_blank" 
    rel="noopener noreferrer"
    className="block w-7 h-7 fixed bottom-4 left-1/2 -translate-x-1/2 hover:opacity-80 transition-opacity -z-50"
  >
    <img src={trLogo} alt="Tabula Rasa Logo" className="w-full h-full" />
  </a>
);

function App() {
  const [minutesListened, setMinutesListened] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [results, setResults] = useState(null);
  const [copyStatus, setCopyStatus] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const calculatedResults = performCalculations(parseFloat(minutesListened));
    setResults(calculatedResults);
    setCurrentStep(2);
  };

  // Update performCalculations function
  const performCalculations = (minutes) => {
    // Yearly subscription amount
    const yearlySubscription = 143.88;

    // Current pro-rata streaming rates
    const subscriptionStreamRate = 0.004;
    const directSupportStreamRate = 0.01;

    // Total streams your subscription could cover
    const totalStreamsFromSubscription = yearlySubscription / subscriptionStreamRate;

    // Total minutes these streams represent (assuming 3.1-minute songs)
    const totalMinutesFromSubscription = totalStreamsFromSubscription * 3.1;

    // Total hours (this is what your subscription could pay for)
    const totalHoursFromSubscription = totalMinutesFromSubscription / 60;

    // Format the hours to one decimal place
    const potentialArtistHireHours = totalHoursFromSubscription.toFixed(1);

    // Calculate earnings for user's actual minutes listened
    const totalStreams = minutes / 3.1;
    const totalPayout = totalStreams * subscriptionStreamRate;
    
    // Artist earnings calculations  
    const weights = [0.4, 0.25, 0.15, 0.11, 0.09];
    const majorLabelEarnings = weights.map((weight) =>
      (totalPayout * weight * 0.2).toFixed(2)
    );

    // Direct support model
    const directTotalPayout = totalStreams * directSupportStreamRate;
    const directSupportEarnings = (directTotalPayout * 0.8).toFixed(2);

    // Earnings multiplier
    const earningsMultiplier = (directSupportEarnings / majorLabelEarnings[0]).toFixed(1);

    // Random item calculation
    const items = [
      { name: 'cups of coffee', price: 3 },
      { name: 'guitar strings', price: 10 },
      { name: 'vinyl records', price: 25 },
      { name: 'tickets to a concert', price: 20 },
    ];
    const randomItem = items[Math.floor(Math.random() * items.length)];
    const majorLabelItemAmount = (majorLabelEarnings[0] / randomItem.price).toFixed(2);

    // Add album and concert calculations (example values - adjust as needed)
    const potentialAlbums = Math.floor(yearlySubscription / 10); // Assuming $10 per album
    const potentialConcerts = Math.floor(yearlySubscription / 15); // Assuming $15 per ticket
    
    // Calculate work days
    const workDays = (potentialArtistHireHours / 8).toFixed(1);

    return {
      majorLabelEarnings,
      directSupportEarnings,
      earningsMultiplier,
      potentialArtistHireHours,
      randomItem,
      majorLabelItemAmount,
      potentialAlbums,
      potentialConcerts,
      workDays,
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

  // Update existing AssumptionsModal to handle different content based on type
  const AssumptionsModal = ({ onClose, type = 'current' }) => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-black/90 rounded-xl p-6 max-w-lg w-full border border-gray-800/50 shadow-xl">
        <h3 className="text-xl font-bold text-white mb-4">How we calculated this:</h3>
        <ul className="space-y-3 text-gray-300 mb-6">
          {type === 'current' ? (
            <>
              
              <li>• All dollar amounts US</li>
              <li>• Streaming services pay about $0.004 per stream</li>
              <li>• Artists get about 20% of their portion</li>
              <li>• Your top artist gets about 40% of your streams</li>
              <li>• The next 4 artists get 25%, 15%, 11%, and 9%</li>
              <li>• Assuming 100% of streams go to your top 5 artists <span className="text-[0.9em]">(otherwise we'd end up with a bunch of $0.00 results, which is more accurate but boring & worse)</span></li>
            </>
          ) : (
            <>
              <li>• All dollar amounts US</li>
              <li>• Average song length: 3.1 minutes</li>
              <li>• Direct support pays $0.01 per stream</li>
              <li>• Artists get 80% of each stream</li>
              <li>• 20% platform share for operating costs</li>
              <li>• For this number we assume no label or intermediary <span className="text-[0.9em]">(even if there was a label cut it would still be over a 10x increase)</span></li>
            </>
          )}
        </ul>
        <button 
          onClick={onClose}
          className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold hover:opacity-90 transition-all"
        >
          Close
        </button>
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen w-screen bg-gradient-to-b from-[#001a15] to-[#03c463] flex items-center justify-center overflow-x-hidden px-3 py-3 sm:px-4 sm:py-8">
      <Logo /> {/* Move Logo here, at root level */}
      <div className="w-full max-w-4xl mx-auto">
        <div className="flex flex-col items-center justify-center">
          {currentStep === 0 && (
            // Step 0
            <div className="w-full text-center space-y-4 sm:space-y-8">
              <h1 className="text-3xl sm:text-5xl font-bold mb-2 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-500 leading-tight sm:leading-relaxed">
                It's that time of year again!
              </h1>
              <p className="text-base sm:text-xl text-gray-300">
                They crunched the numbers <span className="text-[0.7em]">or whatever</span> but why stop there?
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
            // Step 1
            <div className="w-full text-center space-y-4 sm:space-y-8">
              <h1 className="text-3xl sm:text-5xl font-bold mb-2 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-500 leading-tight sm:leading-relaxed">
                How much of your subscription did your #1 artist receive?
              </h1>
              <p className="text-base sm:text-xl text-gray-300">
                Enter your minutes listened for 2024 to find out!
              </p>

              <div className="w-full max-w-2xl mx-auto bg-black/30 backdrop-blur-sm rounded-2xl p-4 sm:p-8 shadow-xl">
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
              
              {/* Step 2 */}
              <div className="w-full bg-black/30 backdrop-blur-sm rounded-2xl p-3 sm:p-6 shadow-xl space-y-3 sm:space-y-6 pb-16 sm:pb-24 relative">
                {/* Highlight top artist */}
                <div className="p-2 sm:p-6 rounded-xl bg-black/50 border border-gray-800/50">
                  <p className="text-sm sm:text-base text-white mb-1 sm:mb-2">Your #1 Artist Received</p>
                  <p 
                    onClick={() => setShowModal(true)}
                    className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 px-2 sm:px-4 py-1 sm:py-2 rounded-lg [text-shadow:_0_1px_3px_rgb(0_0_0_/_40%)] bg-black/40 cursor-pointer hover:opacity-90"
                  >
                    ${results.majorLabelEarnings[0]}
                  </p>
                </div>

                {/* Comparison text in centered container */}
                <div className="text-center">
                  <p className="inline-block text-base sm:text-lg text-white mb-2 sm:mb-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-black/40">
                    Your top artist could buy approximately{' '}
                    <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-green-400">
                      {results.majorLabelItemAmount}
                    </span>{' '}
                    <span className="text-gray-200">{results.randomItem.name}</span>
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

                {/* Bottom text */}
                <p className="text-xs sm:text-sm text-gray-400 text-center py-2 sm:py-4">
                  Where did the rest of your money go?
                </p>
                <button
                  onClick={() => setCurrentStep(1)}
                  className={`fixed bottom-4 sm:bottom-8 left-4 sm:left-8 ${buttonClasses}`}
                >
                  Back
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
                It doesn't have to be this way...
              </h2>
              
              <div className="w-full bg-black/30 backdrop-blur-sm rounded-2xl p-3 sm:p-6 shadow-xl space-y-3 sm:space-y-6 pb-24 sm:pb-32 relative">
                
                {/* Direct support model section */}
                <div className="p-2 sm:p-6 rounded-xl bg-black/50 border border-gray-800/50">
                  <p className="text-sm sm:text-base text-white mb-1 sm:mb-2">
                    With a direct support model your top artist would've received
                  </p>
                  <div className="flex items-baseline gap-0.5">
                    <p 
                      onClick={() => setShowModal(true)}
                      className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 px-2 sm:px-4 py-1 sm:py-2 rounded-lg [text-shadow:_0_1px_3px_rgb(0_0_0_/_40%)] bg-black/40 cursor-pointer hover:opacity-90"
                    >
                      ${results.directSupportEarnings}
                    </p>
                    <p className="text-gray-400">
                      That's <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-yellow-400 to-green-400">{results.earningsMultiplier}x</span> more!
                    </p>
                  </div>
                </div>

                {/* Subscription comparisons section */}
                <div className="p-4 sm:p-6 rounded-xl bg-black/50 border border-gray-800/50">
                  <p className="text-lg sm:text-xl text-white mb-4">
                    Your yearly Spotify subscription could have paid for
                  </p>
                  <div className="space-y-2">
                    <p className="text-lg sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-yellow-400 to-green-400">
                      {results.potentialAlbums} full albums
                    </p>
                    <p className="text-lg sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-yellow-400 to-green-400">
                      {results.potentialConcerts} concert tickets
                    </p>

                    {/* Add grey text */}
                    <p className="text-base sm:text-lg text-gray-300 mt-4">
                      Or, with the current pro-rata streaming model and your annual subscription amount, you could have "hired" your favorite artist for
                    </p>
                    
                    {/* Display updated hours with gradient style */}
                    <div className="space-y-2">
                      <p className="text-lg sm:text-2xl">
                        <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-yellow-400 to-green-400">
                          {results.potentialArtistHireHours} hours
                        </span>
                        <span className="text-white mx-2">or</span>
                        <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-yellow-400 to-green-400">
                          {results.workDays} full work days
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Buttons Section */}
                <button
                  onClick={() => setCurrentStep(2)}
                  className={`fixed bottom-4 sm:bottom-8 left-4 sm:left-8 ${buttonClasses}`}
                >
                  Back
                </button>
                
                <button
                  onClick={() => setCurrentStep(4)}
                  className={`fixed bottom-4 sm:bottom-8 right-4 sm:right-8 ${buttonClasses}`}
                >
                  Continue
                </button>
              </div>
            </>
          )}

          {currentStep === 4 && (
            <>
              <h2 className="text-4xl sm:text-5xl font-bold mb-4 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-500 leading-tight sm:leading-relaxed">
                As we build the future of music, here are some ways you can support artists more directly
              </h2>
              
              <div className="w-full bg-black/30 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-xl space-y-4 sm:space-y-6 pb-24 sm:pb-32 relative">
                <div className="p-4 sm:p-6 rounded-xl bg-black/50 border border-gray-800/50">
                  <div className="space-y-4">
                    <p className="text-lg sm:text-xl text-white mb-6">
                      Consider merch, & digital or physical copies of your favorite records, where more of your purchase goes straight to the artist.
                    </p>
                    
                    {/* Recommended Services */}
                    <div className="space-y-3">
                      <a 
                        href="https://drop.audio" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 hover:opacity-80 transition-opacity"
                      >
                        drop.audio
                      </a>
                      <a 
                        href="https://bandcamp.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 hover:opacity-80 transition-opacity"
                      >
                        bandcamp.com
                      </a>
                      <a 
                        href="https://www.ninaprotocol.com/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-indigo-400 hover:opacity-80 transition-opacity"
                      >
                        ninaprotocol.com
                      </a>
                      <a 
                        href="https://www.deezer.com/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-400 to-red-400 hover:opacity-80 transition-opacity"
                      >
                        deezer.com
                      </a>
                      <a 
                        href="https://supercollector.xyz" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 hover:opacity-80 transition-opacity"
                      >
                        supercollector.xyz
                      </a>
                    </div>
                  </div>
                </div>

                <p className="text-center text-white">
                  Warped Streams is a{' '}
                  <a 
                    href="https://www.tabularasarecords.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 hover:opacity-80 transition-opacity"
                  >
                    Tabula Rasa
                  </a>
                  {' '}project
                </p>

                <button
                  onClick={() => setCurrentStep(3)}
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
      {showModal && <AssumptionsModal onClose={() => setShowModal(false)} type={currentStep === 3 ? 'direct' : 'current'} />}
    </div>
  );
}

export default App;