
// import { useState, useEffect } from 'react'
// import { SplineScene } from './SplineScene'
// import { Card } from './Card'
// import { Spotlight } from './Spotlight'
// import SignInPage from './SignInPage'
// import SignUpPage from './SignUpPage'
// import '.././App.css'
// import Footer from './Footer'

// function LandingPage() {
//   const [currentView, setCurrentView] = useState('landing'); // 'landing', 'signin', 'signup'

//   // Listen for navigation events from child components
//   useEffect(() => {
//     const handleNavigate = (event) => {
//       setCurrentView(event.detail);
//     };
    
//     window.addEventListener('navigate', handleNavigate);
//     return () => window.removeEventListener('navigate', handleNavigate);
//   }, []);

//   // Landing Page View
//   if (currentView === 'landing') {
//     return (
//       <div className="bg-black">
//         <Card className="w-full h-[600px] bg-black/[0.96] relative overflow-hidden border-0 rounded-none">
//           {/* Sign In / Sign Up Buttons - Top Right */}
//           <div className="absolute top-0 right-0 z-50 p-6">
//             <div className="flex items-center space-x-3">
//               <button
//                 onClick={() => setCurrentView('signin')}
//                 className="px-5 py-2 text-white hover:text-blue-400 font-medium transition"
//               >
//                 Sign In
//               </button>
//               <button
//                 onClick={() => setCurrentView('signup')}
//                 className="px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition transform hover:scale-105 shadow-lg"
//               >
//                 Sign Up
//               </button>
//             </div>
//           </div>

//           <Spotlight
//             className="-top-40 left-0 md:left-60 md:-top-20"
//             fill="white"
//           />
          
//           <div className="flex flex-col lg:flex-row h-full">
//             {/* Left content */}
//             <div className="flex-1 p-8 lg:p-16 relative z-10 flex flex-col justify-center">
//               <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
//                 AI Gym Trainer
//               </h1>
//               <p className="mt-4 text-neutral-300 max-w-lg">
//                 It's not about being the best. It's about being better than you were yesterday.
//               </p>
//             </div>
            
//             {/* Right content */}
//             <div className="flex-1 relative">
//               <SplineScene 
//                 scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
//                 className="w-full h-full"
//               />
//             </div>
//           </div>
//         </Card>
//         <Footer />
//       </div>
//     );
//   }

//   // Sign In View
//   if (currentView === 'signin') {
//     return (
//       <div className="relative">
//         <button
//           onClick={() => setCurrentView('landing')}
//           className="absolute top-6 left-6 z-50 px-4 py-2 text-white hover:text-blue-400 font-medium transition flex items-center space-x-2"
//         >
//           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//           </svg>
//           <span>Back to Home</span>
//         </button>
//         <SignInPage />
//       </div>
//     );
//   }

//   // Sign Up View
//   if (currentView === 'signup') {
//     return (
//       <div className="relative">
//         <button
//           onClick={() => setCurrentView('landing')}
//           className="absolute top-6 left-6 z-50 px-4 py-2 text-white hover:text-blue-400 font-medium transition flex items-center space-x-2"
//         >
//           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//           </svg>
//           <span>Back to Home</span>
//         </button>
//         <SignUpPage />
//       </div>
//     );
//   }
// }

// export default LandingPage

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SplineScene } from '../Components/SplineScene';
import { Card } from '../Components/Card';
import { Spotlight } from '../Components/Spotlight';
import Footer from '../Components/Footer';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-black">
      <Card className="w-full h-[600px] bg-black/[0.96] relative overflow-hidden border-0 rounded-none">
        {/* Sign In / Sign Up Buttons - Top Right */}
        <div className="absolute top-0 right-0 z-50 p-6">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate('/signin')}
              className="px-5 py-2 text-white hover:text-blue-400 font-medium transition"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition transform hover:scale-105 shadow-lg"
            >
              Sign Up
            </button>
          </div>
        </div>

        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        />
        
        <div className="flex flex-col lg:flex-row h-full">
          {/* Left content */}
          <div className="flex-1 p-8 lg:p-16 relative z-10 flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
              AI Gym Trainer
            </h1>
            <p className="mt-4 text-neutral-300 max-w-lg">
              It's not about being the best. It's about being better than you were yesterday.
            </p>
          </div>
          
          {/* Right content */}
          <div className="flex-1 relative">
            <SplineScene 
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </div>
        </div>
      </Card>
      <Footer />
    </div>
  );
}