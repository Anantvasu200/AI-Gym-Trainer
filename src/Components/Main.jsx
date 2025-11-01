// import React, { useState } from 'react';
// import { 
//   Activity, 
//   Dumbbell, 
//   TrendingUp, 
//   Target, 
//   Calendar,
//   User,
//   LogOut,
//   Menu,
//   X,
//   Clock,
//   Flame,
//   Award,
//   ChevronRight,
//   Play,
//   BarChart3
// } from 'lucide-react';

// export default function Main() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState('overview');

//   const userData = {
//     name: 'John Doe',
//     streak: 12,
//     weeklyGoal: 5,
//     completedWorkouts: 3,
//     caloriesBurned: 1250,
//     activeMinutes: 180
//   };

//   const recentWorkouts = [
//     { id: 1, name: 'Upper Body Strength', duration: '45 min', calories: 320, date: 'Today' },
//     { id: 2, name: 'Cardio HIIT', duration: '30 min', calories: 280, date: 'Yesterday' },
//     { id: 3, name: 'Lower Body Focus', duration: '50 min', calories: 350, date: '2 days ago' },
//   ];

//   const workoutPlans = [
//     { 
//       id: 1, 
//       name: 'Beginner Full Body', 
//       duration: '30 min', 
//       difficulty: 'Easy',
//       exercises: 8,
//       color: 'from-green-500 to-emerald-600'
//     },
//     { 
//       id: 2, 
//       name: 'Advanced HIIT', 
//       duration: '45 min', 
//       difficulty: 'Hard',
//       exercises: 12,
//       color: 'from-red-500 to-orange-600'
//     },
//     { 
//       id: 3, 
//       name: 'Yoga & Flexibility', 
//       duration: '40 min', 
//       difficulty: 'Medium',
//       exercises: 10,
//       color: 'from-purple-500 to-pink-600'
//     },
//   ];

//   const handleLogout = () => {
//     console.log('Logging out...');
//     // Navigation will be handled by parent component
//     window.location.href = '/';
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex">
//       {/* Sidebar */}
//       <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gray-800/50 backdrop-blur-lg border-r border-gray-700 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
//         <div className="p-6 border-b border-gray-700">
//           <div className="flex items-center space-x-2">
//             <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
//               <Activity className="w-6 h-6 text-white" />
//             </div>
//             <span className="text-white font-bold text-xl">AI Gym</span>
//           </div>
//         </div>

//         <nav className="p-4 space-y-2">
//           <button
//             onClick={() => setActiveTab('overview')}
//             className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${activeTab === 'overview' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'}`}
//           >
//             <BarChart3 className="w-5 h-5" />
//             <span>Overview</span>
//           </button>

//           <button
//             onClick={() => setActiveTab('workouts')}
//             className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${activeTab === 'workouts' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'}`}
//           >
//             <Dumbbell className="w-5 h-5" />
//             <span>Workouts</span>
//           </button>

//           <button
//             onClick={() => setActiveTab('progress')}
//             className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${activeTab === 'progress' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'}`}
//           >
//             <TrendingUp className="w-5 h-5" />
//             <span>Progress</span>
//           </button>

//           <button
//             onClick={() => setActiveTab('goals')}
//             className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${activeTab === 'goals' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'}`}
//           >
//             <Target className="w-5 h-5" />
//             <span>Goals</span>
//           </button>

//           <button
//             onClick={() => setActiveTab('profile')}
//             className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${activeTab === 'profile' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'}`}
//           >
//             <User className="w-5 h-5" />
//             <span>Profile</span>
//           </button>
//         </nav>

//         <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
//           <button
//             onClick={handleLogout}
//             className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition"
//           >
//             <LogOut className="w-5 h-5" />
//             <span>Logout</span>
//           </button>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* Header */}
//         <header className="bg-gray-800/50 backdrop-blur-lg border-b border-gray-700 px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <button
//                 onClick={() => setSidebarOpen(!sidebarOpen)}
//                 className="lg:hidden text-gray-400 hover:text-white"
//               >
//                 {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//               </button>
//               <div>
//                 <h1 className="text-2xl font-bold text-white">Welcome back, {userData.name}!</h1>
//                 <p className="text-gray-400 text-sm">Let's crush your fitness goals today</p>
//               </div>
//             </div>

//             <div className="flex items-center space-x-4">
//               <div className="hidden md:flex items-center space-x-2 px-4 py-2 bg-orange-500/20 border border-orange-500/30 rounded-lg">
//                 <Flame className="w-5 h-5 text-orange-500" />
//                 <span className="text-white font-semibold">{userData.streak} Day Streak</span>
//               </div>
//               <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
//                 <User className="w-6 h-6 text-white" />
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* Main Content Area */}
//         <main className="flex-1 overflow-y-auto p-6">
//           {/* Stats Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//             <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6">
//               <div className="flex items-center justify-between mb-4">
//                 <div className="p-3 bg-blue-500/20 rounded-lg">
//                   <Target className="w-6 h-6 text-blue-500" />
//                 </div>
//                 <span className="text-sm text-gray-400">This Week</span>
//               </div>
//               <h3 className="text-3xl font-bold text-white mb-1">{userData.completedWorkouts}/{userData.weeklyGoal}</h3>
//               <p className="text-gray-400 text-sm">Workouts Completed</p>
//             </div>

//             <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6">
//               <div className="flex items-center justify-between mb-4">
//                 <div className="p-3 bg-orange-500/20 rounded-lg">
//                   <Flame className="w-6 h-6 text-orange-500" />
//                 </div>
//                 <span className="text-sm text-gray-400">Today</span>
//               </div>
//               <h3 className="text-3xl font-bold text-white mb-1">{userData.caloriesBurned}</h3>
//               <p className="text-gray-400 text-sm">Calories Burned</p>
//             </div>

//             <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6">
//               <div className="flex items-center justify-between mb-4">
//                 <div className="p-3 bg-green-500/20 rounded-lg">
//                   <Clock className="w-6 h-6 text-green-500" />
//                 </div>
//                 <span className="text-sm text-gray-400">This Week</span>
//               </div>
//               <h3 className="text-3xl font-bold text-white mb-1">{userData.activeMinutes}</h3>
//               <p className="text-gray-400 text-sm">Active Minutes</p>
//             </div>

     
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
           
           
//           </div>

//           {/* Quick Actions */}
//           <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
//             <button className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-xl p-6 hover:from-blue-500/30 hover:to-purple-500/30 transition group">
//               <Activity className="w-8 h-8 text-blue-400 mb-4" />
//               <h3 className="text-white font-semibold mb-2">Live Pose Detection</h3>
//               <p className="text-gray-400 text-sm">Get real-time form feedback</p>
//             </button>

//           </div>
//         </main>
//       </div>

//       {/* Mobile Overlay */}
//       {sidebarOpen && (
//         <div
//           onClick={() => setSidebarOpen(false)}
//           className="fixed inset-0 bg-black/50 z-40 lg:hidden"
//         />
//       )}
//     </div>
//   );
// }


import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Dumbbell, 
  TrendingUp, 
  Target, 
  Calendar,
  User,
  LogOut,
  Menu,
  X,
  Clock,
  Flame,
  Award,
  ChevronRight,
  Play,
  BarChart3
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Main() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Get username from navigation state or stored data
  const getUsername = () => {
    // First try to get from navigation state
    if (location.state?.username) {
      return location.state.username;
    }
    
    // Then try localStorage
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      return userData.username;
    }
    
    // Then try sessionStorage
    const sessionUserData = sessionStorage.getItem('userData');
    if (sessionUserData) {
      const userData = JSON.parse(sessionUserData);
      return userData.username;
    }
    
    // Default fallback
    return 'User';
  };

  const username = getUsername();

  // Initialize and track streak
  const [streak, setStreak] = useState(() => {
    const savedStreak = localStorage.getItem(`streak_${username}`);
    const lastVisit = localStorage.getItem(`lastVisit_${username}`);
    const today = new Date().toDateString();
    
    if (lastVisit === today) {
      // Already visited today, return saved streak
      return parseInt(savedStreak) || 1;
    } else if (lastVisit) {
      // Check if it's a consecutive day
      const lastDate = new Date(lastVisit);
      const currentDate = new Date(today);
      const diffTime = currentDate - lastDate;
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        // Consecutive day - increment streak
        const newStreak = (parseInt(savedStreak) || 0) + 1;
        localStorage.setItem(`streak_${username}`, newStreak.toString());
        localStorage.setItem(`lastVisit_${username}`, today);
        return newStreak;
      } else {
        // Streak broken - reset to 1
        localStorage.setItem(`streak_${username}`, '1');
        localStorage.setItem(`lastVisit_${username}`, today);
        return 1;
      }
    } else {
      // First visit
      localStorage.setItem(`streak_${username}`, '1');
      localStorage.setItem(`lastVisit_${username}`, today);
      return 1;
    }
  });

  const userData = {
    name: username,
    streak: streak,
    weeklyGoal: 5,
    completedWorkouts: 3,
    caloriesBurned: 1250,
    activeMinutes: 180
  };

  const recentWorkouts = [
    { id: 1, name: 'Upper Body Strength', duration: '45 min', calories: 320, date: 'Today' },
    { id: 2, name: 'Cardio HIIT', duration: '30 min', calories: 280, date: 'Yesterday' },
    { id: 3, name: 'Lower Body Focus', duration: '50 min', calories: 350, date: '2 days ago' },
  ];

  const workoutPlans = [
    { 
      id: 1, 
      name: 'Beginner Full Body', 
      duration: '30 min', 
      difficulty: 'Easy',
      exercises: 8,
      color: 'from-green-500 to-emerald-600'
    },
    { 
      id: 2, 
      name: 'Advanced HIIT', 
      duration: '45 min', 
      difficulty: 'Hard',
      exercises: 12,
      color: 'from-red-500 to-orange-600'
    },
    { 
      id: 3, 
      name: 'Yoga & Flexibility', 
      duration: '40 min', 
      difficulty: 'Medium',
      exercises: 10,
      color: 'from-purple-500 to-pink-600'
    },
  ];

  const handleLogout = () => {
    console.log('Logging out...');
    // Clear authentication data
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('userData');
    
    // Navigate to home
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex">
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gray-800/50 backdrop-blur-lg border-r border-gray-700 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <span className="text-white font-bold text-xl">AI Gym</span>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${activeTab === 'overview' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'}`}
          >
            <BarChart3 className="w-5 h-5" />
            <span>Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('workouts')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${activeTab === 'workouts' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'}`}
          >
            <Dumbbell className="w-5 h-5" />
            <span>Workouts</span>
          </button>

          <button
            onClick={() => setActiveTab('progress')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${activeTab === 'progress' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'}`}
          >
            <TrendingUp className="w-5 h-5" />
            <span>Progress</span>
          </button>

          <button
            onClick={() => setActiveTab('goals')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${activeTab === 'goals' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'}`}
          >
            <Target className="w-5 h-5" />
            <span>Goals</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${activeTab === 'profile' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'}`}
          >
            <User className="w-5 h-5" />
            <span>Profile</span>
          </button>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-gray-800/50 backdrop-blur-lg border-b border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden text-gray-400 hover:text-white"
              >
                {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <div>
                <h1 className="text-2xl font-bold text-white">Welcome back, {userData.name}!</h1>
                <p className="text-gray-400 text-sm">Let's crush your fitness goals today</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 px-4 py-2 bg-orange-500/20 border border-orange-500/30 rounded-lg">
                <Flame className="w-5 h-5 text-orange-500" />
                <span className="text-white font-semibold">{userData.streak} Day Streak</span>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
           

            {/* <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-orange-500/20 rounded-lg">
                  <Flame className="w-6 h-6 text-orange-500" />
                </div>
                <span className="text-sm text-gray-400">Today</span>
              </div>
              <h3 className="text-3xl font-bold text-white mb-1">{userData.caloriesBurned}</h3>
              <p className="text-gray-400 text-sm">Calories Burned</p>
            </div> */}

            {/* <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-500/20 rounded-lg">
                  <Clock className="w-6 h-6 text-green-500" />
                </div>
                <span className="text-sm text-gray-400">This Week</span>
              </div>
              <h3 className="text-3xl font-bold text-white mb-1">{userData.activeMinutes}</h3>
              <p className="text-gray-400 text-sm">Active Minutes</p>
            </div> */}

     
          </div>

          

          {/* Quick Actions */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <button className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-xl p-6 hover:from-blue-500/30 hover:to-purple-500/30 transition group">
              <Activity className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="text-white font-semibold mb-2">Live AI Gym Trainer</h3>
              <p className="text-gray-400 text-sm">Get real-time form feedback</p>
            </button>

          </div>
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}
    </div>
  );
}