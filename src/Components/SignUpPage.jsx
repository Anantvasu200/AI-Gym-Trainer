// // import React, { useState } from 'react';
// // import { Calendar, User, Mail, Phone, Lock, Activity, Weight } from 'lucide-react';

// // export default function SignupPage() {
// //   const [formData, setFormData] = useState({
// //     username: '',
// //     email: '',
// //     phone: '',
// //     password: '',
// //     confirmPassword: '',
// //     dob: '',
// //     height: '',
// //     weight: ''
// //   });

// //   const [showCalendar, setShowCalendar] = useState(false);
// //   const [errors, setErrors] = useState({});

// //   const currentYear = new Date().getFullYear();
// //   const years = Array.from({ length: 63 }, (_, i) => currentYear - 18 - i);
// //   const months = [
// //     'January', 'February', 'March', 'April', 'May', 'June',
// //     'July', 'August', 'September', 'October', 'November', 'December'
// //   ];
// //   const days = Array.from({ length: 31 }, (_, i) => i + 1);

// //   const [selectedDate, setSelectedDate] = useState({
// //     day: '',
// //     month: '',
// //     year: ''
// //   });

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData(prev => ({ ...prev, [name]: value }));
// //     if (errors[name]) {
// //       setErrors(prev => ({ ...prev, [name]: '' }));
// //     }
// //   };

// //   const handleDateSelect = () => {
// //     if (selectedDate.day && selectedDate.month && selectedDate.year) {
// //       const monthIndex = months.indexOf(selectedDate.month) + 1;
// //       const formattedDate = `${selectedDate.year}-${String(monthIndex).padStart(2, '0')}-${String(selectedDate.day).padStart(2, '0')}`;
// //       setFormData(prev => ({ ...prev, dob: formattedDate }));
// //       setShowCalendar(false);
// //     }
// //   };

// //   const formatDateDisplay = (dateString) => {
// //     if (!dateString) return '';
// //     const date = new Date(dateString);
// //     return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
// //   };

// //   const validateForm = () => {
// //     const newErrors = {};

// //     if (!formData.username.trim()) {
// //       newErrors.username = 'Username is required';
// //     } else if (formData.username.length < 3) {
// //       newErrors.username = 'Username must be at least 3 characters';
// //     }

// //     if (!formData.email.trim()) {
// //       newErrors.email = 'Email is required';
// //     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
// //       newErrors.email = 'Email is invalid';
// //     }

// //     if (!formData.phone.trim()) {
// //       newErrors.phone = 'Phone number is required';
// //     } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
// //       newErrors.phone = 'Phone number must be 10 digits';
// //     }

// //     if (!formData.dob) {
// //       newErrors.dob = 'Date of birth is required';
// //     }

// //     if (!formData.height.trim()) {
// //       newErrors.height = 'Height is required';
// //     } else if (isNaN(formData.height) || formData.height <= 0) {
// //       newErrors.height = 'Height must be a valid number';
// //     }

// //     if (!formData.weight.trim()) {
// //       newErrors.weight = 'Weight is required';
// //     } else if (isNaN(formData.weight) || formData.weight <= 0) {
// //       newErrors.weight = 'Weight must be a valid number';
// //     }

// //     if (!formData.password) {
// //       newErrors.password = 'Password is required';
// //     } else if (formData.password.length < 8) {
// //       newErrors.password = 'Password must be at least 8 characters';
// //     }

// //     if (formData.password !== formData.confirmPassword) {
// //       newErrors.confirmPassword = 'Passwords do not match';
// //     }

// //     setErrors(newErrors);
// //     return Object.keys(newErrors).length === 0;
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     if (validateForm()) {
// //       console.log('Form submitted:', formData);
// //       alert('Signup successful! Check console for data.');
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
// //       <div className="max-w-2xl w-full bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-700 p-8">
// //         <div className="text-center mb-8">
// //           <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4">
// //             <Activity className="w-8 h-8 text-white" />
// //           </div>
// //           <h1 className="text-3xl font-bold text-white mb-2">AI Gym Trainer</h1>
// //           <p className="text-gray-400">Create your account to get started</p>
// //         </div>

// //         <div className="space-y-5">
// //           <div>
// //             <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
// //             <div className="relative">
// //               <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
// //               <input
// //                 type="text"
// //                 name="username"
// //                 value={formData.username}
// //                 onChange={handleChange}
// //                 className="w-full pl-11 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
// //                 placeholder="Enter unique username"
// //               />
// //             </div>
// //             {errors.username && <p className="mt-1 text-sm text-red-400">{errors.username}</p>}
// //           </div>

// //           <div>
// //             <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
// //             <div className="relative">
// //               <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
// //               <input
// //                 type="email"
// //                 name="email"
// //                 value={formData.email}
// //                 onChange={handleChange}
// //                 className="w-full pl-11 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
// //                 placeholder="your.email@example.com"
// //               />
// //             </div>
// //             {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
// //           </div>

// //           <div>
// //             <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
// //             <div className="relative">
// //               <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
// //               <input
// //                 type="tel"
// //                 name="phone"
// //                 value={formData.phone}
// //                 onChange={handleChange}
// //                 className="w-full pl-11 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
// //                 placeholder="1234567890"
// //               />
// //             </div>
// //             {errors.phone && <p className="mt-1 text-sm text-red-400">{errors.phone}</p>}
// //           </div>

// //           <div>
// //             <label className="block text-sm font-medium text-gray-300 mb-2">Date of Birth</label>
// //             <div className="relative">
// //               <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
// //               <input
// //                 type="text"
// //                 readOnly
// //                 value={formatDateDisplay(formData.dob)}
// //                 onClick={() => setShowCalendar(!showCalendar)}
// //                 className="w-full pl-11 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition cursor-pointer"
// //                 placeholder="Select your date of birth"
// //               />
// //             </div>
// //             {errors.dob && <p className="mt-1 text-sm text-red-400">{errors.dob}</p>}

// //             {showCalendar && (
// //               <div className="mt-2 p-4 bg-gray-700 border border-gray-600 rounded-lg">
// //                 <div className="grid grid-cols-3 gap-3">
// //                   <div>
// //                     <label className="block text-xs text-gray-400 mb-1">Day</label>
// //                     <select
// //                       value={selectedDate.day}
// //                       onChange={(e) => setSelectedDate(prev => ({ ...prev, day: e.target.value }))}
// //                       className="w-full px-2 py-2 bg-gray-600 border border-gray-500 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                     >
// //                       <option value="">Day</option>
// //                       {days.map(day => (
// //                         <option key={day} value={day}>{day}</option>
// //                       ))}
// //                     </select>
// //                   </div>

// //                   <div>
// //                     <label className="block text-xs text-gray-400 mb-1">Month</label>
// //                     <select
// //                       value={selectedDate.month}
// //                       onChange={(e) => setSelectedDate(prev => ({ ...prev, month: e.target.value }))}
// //                       className="w-full px-2 py-2 bg-gray-600 border border-gray-500 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                     >
// //                       <option value="">Month</option>
// //                       {months.map(month => (
// //                         <option key={month} value={month}>{month}</option>
// //                       ))}
// //                     </select>
// //                   </div>

// //                   <div>
// //                     <label className="block text-xs text-gray-400 mb-1">Year</label>
// //                     <select
// //                       value={selectedDate.year}
// //                       onChange={(e) => setSelectedDate(prev => ({ ...prev, year: e.target.value }))}
// //                       className="w-full px-2 py-2 bg-gray-600 border border-gray-500 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                     >
// //                       <option value="">Year</option>
// //                       {years.map(year => (
// //                         <option key={year} value={year}>{year}</option>
// //                       ))}
// //                     </select>
// //                   </div>
// //                 </div>
// //                 <button
// //                   type="button"
// //                   onClick={handleDateSelect}
// //                   className="mt-3 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
// //                 >
// //                   Confirm Date
// //                 </button>
// //               </div>
// //             )}
// //           </div>

// //           <div className="grid grid-cols-2 gap-4">
// //             <div>
// //               <label className="block text-sm font-medium text-gray-300 mb-2">Height (cm)</label>
// //               <div className="relative">
// //                 <Activity className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
// //                 <input
// //                   type="number"
// //                   name="height"
// //                   value={formData.height}
// //                   onChange={handleChange}
// //                   className="w-full pl-11 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
// //                   placeholder="170"
// //                 />
// //               </div>
// //               {errors.height && <p className="mt-1 text-sm text-red-400">{errors.height}</p>}
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium text-gray-300 mb-2">Weight (kg)</label>
// //               <div className="relative">
// //                 <Weight className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
// //                 <input
// //                   type="number"
// //                   name="weight"
// //                   value={formData.weight}
// //                   onChange={handleChange}
// //                   className="w-full pl-11 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
// //                   placeholder="70"
// //                 />
// //               </div>
// //               {errors.weight && <p className="mt-1 text-sm text-red-400">{errors.weight}</p>}
// //             </div>
// //           </div>

// //           <div>
// //             <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
// //             <div className="relative">
// //               <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
// //               <input
// //                 type="password"
// //                 name="password"
// //                 value={formData.password}
// //                 onChange={handleChange}
// //                 className="w-full pl-11 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
// //                 placeholder="At least 8 characters"
// //               />
// //             </div>
// //             {errors.password && <p className="mt-1 text-sm text-red-400">{errors.password}</p>}
// //           </div>

// //           <div>
// //             <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
// //             <div className="relative">
// //               <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
// //               <input
// //                 type="password"
// //                 name="confirmPassword"
// //                 value={formData.confirmPassword}
// //                 onChange={handleChange}
// //                 className="w-full pl-11 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
// //                 placeholder="Re-enter your password"
// //               />
// //             </div>
// //             {errors.confirmPassword && <p className="mt-1 text-sm text-red-400">{errors.confirmPassword}</p>}
// //           </div>

// //           <button
// //             type="button"
// //             onClick={handleSubmit}
// //             className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition transform hover:scale-[1.02] active:scale-[0.98]"
// //           >
// //             Create Account
// //           </button>

// //           <p className="text-center text-gray-400 text-sm">
// //             Already have an account?{' '}
// //             <span className="text-blue-400 hover:text-blue-300 font-medium cursor-pointer">
// //               Log in
// //             </span>
// //           </p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// import React, { useState } from 'react';
// import { Calendar, User, Mail, Phone, Lock, Activity, Weight } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// export default function SignupPage() {
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     phone: '',
//     password: '',
//     confirmPassword: '',
//     dob: '',
//     height: '',
//     weight: '',
//     gender: ''
//   });
// const navigate = useNavigate();

//   const [showCalendar, setShowCalendar] = useState(false);
//   const [errors, setErrors] = useState({});

//   const currentYear = new Date().getFullYear();
//   const years = Array.from({ length: 63 }, (_, i) => currentYear - 18 - i);
//   const months = [
//     'January', 'February', 'March', 'April', 'May', 'June',
//     'July', 'August', 'September', 'October', 'November', 'December'
//   ];
//   const days = Array.from({ length: 31 }, (_, i) => i + 1);

//   const [selectedDate, setSelectedDate] = useState({
//     day: '',
//     month: '',
//     year: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: '' }));
//     }
//   };

//   const handleDateSelect = () => {
//     if (selectedDate.day && selectedDate.month && selectedDate.year) {
//       const monthIndex = months.indexOf(selectedDate.month) + 1;
//       const formattedDate = `${selectedDate.year}-${String(monthIndex).padStart(2, '0')}-${String(selectedDate.day).padStart(2, '0')}`;
//       setFormData(prev => ({ ...prev, dob: formattedDate }));
//       setShowCalendar(false);
//     }
//   };

//   const formatDateDisplay = (dateString) => {
//     if (!dateString) return '';
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.username.trim()) {
//       newErrors.username = 'Username is required';
//     } else if (formData.username.length < 3) {
//       newErrors.username = 'Username must be at least 3 characters';
//     }

//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'Email is invalid';
//     }

//     if (!formData.phone.trim()) {
//       newErrors.phone = 'Phone number is required';
//     } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
//       newErrors.phone = 'Phone number must be 10 digits';
//     }

//     if (!formData.dob) {
//       newErrors.dob = 'Date of birth is required';
//     }

//     if (!formData.height.trim()) {
//       newErrors.height = 'Height is required';
//     } else if (isNaN(formData.height) || formData.height <= 0) {
//       newErrors.height = 'Height must be a valid number';
//     }

//     if (!formData.weight.trim()) {
//       newErrors.weight = 'Weight is required';
//     } else if (isNaN(formData.weight) || formData.weight <= 0) {
//       newErrors.weight = 'Weight must be a valid number';
//     }

//     if (!formData.gender) {
//       newErrors.gender = 'Gender is required';
//     }

//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     } else if (formData.password.length < 8) {
//       newErrors.password = 'Password must be at least 8 characters';
//     }

//     if (formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = 'Passwords do not match';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       console.log('Form submitted:', formData);
//       alert('Signup successful! Check console for data.');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
//          <button
//         onClick={() => navigate('/')}
//         className="absolute top-6 left-6 z-50 px-4 py-2 text-white hover:text-blue-400 font-medium transition flex items-center space-x-2"
//       >
//         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//         </svg>
//         <span>Back to Home</span>
//       </button>
//       <div className="max-w-2xl w-full bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-700 p-8">
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4">
//             <Activity className="w-8 h-8 text-white" />
//           </div>
//           <h1 className="text-3xl font-bold text-white mb-2">AI Gym Trainer</h1>
//           <p className="text-gray-400">Create your account to get started</p>
//         </div>

//         <div className="space-y-5">
//           <div>
//             <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
//             <div className="relative">
//               <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//               <input
//                 type="text"
//                 name="username"
//                 value={formData.username}
//                 onChange={handleChange}
//                 className="w-full pl-11 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
//                 placeholder="Enter unique username"
//               />
//             </div>
//             {errors.username && <p className="mt-1 text-sm text-red-400">{errors.username}</p>}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
//             <div className="relative">
//               <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="w-full pl-11 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
//                 placeholder="your.email@example.com"
//               />
//             </div>
//             {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
//             <div className="relative">
//               <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//               <input
//                 type="tel"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 className="w-full pl-11 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
//                 placeholder="1234567890"
//               />
//             </div>
//             {errors.phone && <p className="mt-1 text-sm text-red-400">{errors.phone}</p>}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-300 mb-2">Date of Birth</label>
//             <div className="relative">
//               <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//               <input
//                 type="text"
//                 readOnly
//                 value={formatDateDisplay(formData.dob)}
//                 onClick={() => setShowCalendar(!showCalendar)}
//                 className="w-full pl-11 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition cursor-pointer"
//                 placeholder="Select your date of birth"
//               />
//             </div>
//             {errors.dob && <p className="mt-1 text-sm text-red-400">{errors.dob}</p>}

//             {showCalendar && (
//               <div className="mt-2 p-4 bg-gray-700 border border-gray-600 rounded-lg">
//                 <div className="grid grid-cols-3 gap-3">
//                   <div>
//                     <label className="block text-xs text-gray-400 mb-1">Day</label>
//                     <select
//                       value={selectedDate.day}
//                       onChange={(e) => setSelectedDate(prev => ({ ...prev, day: e.target.value }))}
//                       className="w-full px-2 py-2 bg-gray-600 border border-gray-500 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     >
//                       <option value="">Day</option>
//                       {days.map(day => (
//                         <option key={day} value={day}>{day}</option>
//                       ))}
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-xs text-gray-400 mb-1">Month</label>
//                     <select
//                       value={selectedDate.month}
//                       onChange={(e) => setSelectedDate(prev => ({ ...prev, month: e.target.value }))}
//                       className="w-full px-2 py-2 bg-gray-600 border border-gray-500 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     >
//                       <option value="">Month</option>
//                       {months.map(month => (
//                         <option key={month} value={month}>{month}</option>
//                       ))}
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-xs text-gray-400 mb-1">Year</label>
//                     <select
//                       value={selectedDate.year}
//                       onChange={(e) => setSelectedDate(prev => ({ ...prev, year: e.target.value }))}
//                       className="w-full px-2 py-2 bg-gray-600 border border-gray-500 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     >
//                       <option value="">Year</option>
//                       {years.map(year => (
//                         <option key={year} value={year}>{year}</option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>
//                 <button
//                   type="button"
//                   onClick={handleDateSelect}
//                   className="mt-3 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
//                 >
//                   Confirm Date
//                 </button>
//               </div>
//             )}
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-300 mb-2">Height (cm)</label>
//               <div className="relative">
//                 <Activity className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                 <input
//                   type="number"
//                   name="height"
//                   value={formData.height}
//                   onChange={handleChange}
//                   className="w-full pl-11 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
//                   placeholder="170"
//                 />
//               </div>
//               {errors.height && <p className="mt-1 text-sm text-red-400">{errors.height}</p>}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-300 mb-2">Weight (kg)</label>
//               <div className="relative">
//                 <Weight className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                 <input
//                   type="number"
//                   name="weight"
//                   value={formData.weight}
//                   onChange={handleChange}
//                   className="w-full pl-11 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
//                   placeholder="70"
//                 />
//               </div>
//               {errors.weight && <p className="mt-1 text-sm text-red-400">{errors.weight}</p>}
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-300 mb-2">Gender</label>
//             <div className="relative">
//               <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//               <select
//                 name="gender"
//                 value={formData.gender}
//                 onChange={handleChange}
//                 className="w-full pl-11 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none cursor-pointer"
//               >
//                 <option value="" disabled className="bg-gray-800">Select your gender</option>
//                 <option value="male" className="bg-gray-800">Male</option>
//                 <option value="female" className="bg-gray-800">Female</option>
//                 <option value="other" className="bg-gray-800">Other</option>
//                 <option value="prefer-not-to-say" className="bg-gray-800">Prefer not to say</option>
//               </select>
//               <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//               </svg>
//             </div>
//             {errors.gender && <p className="mt-1 text-sm text-red-400">{errors.gender}</p>}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
//             <div className="relative">
//               <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//               <input
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="w-full pl-11 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
//                 placeholder="At least 8 characters"
//               />
//             </div>
//             {errors.password && <p className="mt-1 text-sm text-red-400">{errors.password}</p>}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
//             <div className="relative">
//               <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//               <input
//                 type="password"
//                 name="confirmPassword"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 className="w-full pl-11 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
//                 placeholder="Re-enter your password"
//               />
//             </div>
//             {errors.confirmPassword && <p className="mt-1 text-sm text-red-400">{errors.confirmPassword}</p>}
//           </div>

//           <button
//             type="button"
//             onClick={handleSubmit}
//             className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition transform hover:scale-[1.02] active:scale-[0.98]"
//           >
//             Create Account
//           </button>

//           <p className="text-center text-gray-400 text-sm">
//             Already have an account?{' '}
//             <span 
// onClick={() => navigate('/signin')}
//               className="text-blue-400 hover:text-blue-300 font-medium cursor-pointer"
//             >
//               Log in
//             </span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }







import React, { useState } from 'react';
import { Calendar, User, Mail, Phone, Lock, Activity, Weight, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    dob: '',
    height: '',
    weight: '',
    gender: ''
  });

  const navigate = useNavigate();
  const [showCalendar, setShowCalendar] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 63 }, (_, i) => currentYear - 18 - i);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const [selectedDate, setSelectedDate] = useState({
    day: '',
    month: '',
    year: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    // Clear API error when user starts typing
    if (apiError) {
      setApiError('');
    }
  };

  const handleDateSelect = () => {
    if (selectedDate.day && selectedDate.month && selectedDate.year) {
      const monthIndex = months.indexOf(selectedDate.month) + 1;
      const formattedDate = `${selectedDate.year}-${String(monthIndex).padStart(2, '0')}-${String(selectedDate.day).padStart(2, '0')}`;
      setFormData(prev => ({ ...prev, dob: formattedDate }));
      setShowCalendar(false);
    }
  };

  const formatDateDisplay = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone number must be 10 digits';
    }

    if (!formData.dob) {
      newErrors.dob = 'Date of birth is required';
    }

    if (!formData.height.trim()) {
      newErrors.height = 'Height is required';
    } else if (isNaN(formData.height) || formData.height <= 0) {
      newErrors.height = 'Height must be a valid number';
    }

    if (!formData.weight.trim()) {
      newErrors.weight = 'Weight is required';
    } else if (isNaN(formData.weight) || formData.weight <= 0) {
      newErrors.weight = 'Weight must be a valid number';
    }

    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous API error
    setApiError('');

    // Validate form
    if (!validateForm()) {
      return;
    }

    // Start loading
    setIsLoading(true);

    try {
      // Prepare data for API (exclude confirmPassword)
      const { confirmPassword, ...dataToSend } = formData;

      // Replace with your actual API endpoint
      const API_URL = 'http://localhost:5000/api/auth/signup'; // Change this to your backend URL

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle API errors
        throw new Error(data.message || 'Signup failed. Please try again.');
      }

      // Success - store token if provided
      if (data.token) {
        localStorage.setItem('authToken', data.token);
      }

      // Store user data if provided
      if (data.user) {
        localStorage.setItem('userData', JSON.stringify(data.user));
      }

      console.log('Signup successful:', data);

      // Show success message
      alert('Signup successful! Redirecting to dashboard...');

      // Navigate to dashboard or signin
      navigate('/dashboard'); // or '/signin' if you want them to login first

    } catch (error) {
      console.error('Signup error:', error);
      setApiError(error.message || 'An error occurred during signup. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 z-50 px-4 py-2 text-white hover:text-blue-400 font-medium transition flex items-center space-x-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span>Back to Home</span>
      </button>

      <div className="max-w-2xl w-full bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-700 p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4">
            <Activity className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">AI Gym Trainer</h1>
          <p className="text-gray-400">Create your account to get started</p>
        </div>

        {/* API Error Message */}
        {apiError && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
            <p className="text-red-400 text-sm text-center">{apiError}</p>
          </div>
        )}

        <div className="space-y-5">
          {/* All your form fields remain the same */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full pl-11 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Enter unique username"
              />
            </div>
            {errors.username && <p className="mt-1 text-sm text-red-400">{errors.username}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full pl-11 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="your.email@example.com"
              />
            </div>
            {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full pl-11 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="1234567890"
              />
            </div>
            {errors.phone && <p className="mt-1 text-sm text-red-400">{errors.phone}</p>}
          </div>

          {/* Date of Birth - same as before */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Date of Birth</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                readOnly
                value={formatDateDisplay(formData.dob)}
                onClick={() => !isLoading && setShowCalendar(!showCalendar)}
                disabled={isLoading}
                className="w-full pl-11 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Select your date of birth"
              />
            </div>
            {errors.dob && <p className="mt-1 text-sm text-red-400">{errors.dob}</p>}

            {showCalendar && !isLoading && (
              <div className="mt-2 p-4 bg-gray-700 border border-gray-600 rounded-lg">
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Day</label>
                    <select
                      value={selectedDate.day}
                      onChange={(e) => setSelectedDate(prev => ({ ...prev, day: e.target.value }))}
                      className="w-full px-2 py-2 bg-gray-600 border border-gray-500 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Day</option>
                      {days.map(day => (
                        <option key={day} value={day}>{day}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Month</label>
                    <select
                      value={selectedDate.month}
                      onChange={(e) => setSelectedDate(prev => ({ ...prev, month: e.target.value }))}
                      className="w-full px-2 py-2 bg-gray-600 border border-gray-500 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Month</option>
                      {months.map(month => (
                        <option key={month} value={month}>{month}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Year</label>
                    <select
                      value={selectedDate.year}
                      onChange={(e) => setSelectedDate(prev => ({ ...prev, year: e.target.value }))}
                      className="w-full px-2 py-2 bg-gray-600 border border-gray-500 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Year</option>
                      {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleDateSelect}
                  className="mt-3 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  Confirm Date
                </button>
              </div>
            )}
          </div>

          {/* Height and Weight */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Height (cm)</label>
              <div className="relative">
                <Activity className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-full pl-11 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="170"
                />
              </div>
              {errors.height && <p className="mt-1 text-sm text-red-400">{errors.height}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Weight (kg)</label>
              <div className="relative">
                <Weight className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-full pl-11 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="70"
                />
              </div>
              {errors.weight && <p className="mt-1 text-sm text-red-400">{errors.weight}</p>}
            </div>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Gender</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full pl-11 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="" disabled className="bg-gray-800">Select your gender</option>
                <option value="male" className="bg-gray-800">Male</option>
                <option value="female" className="bg-gray-800">Female</option>
                <option value="other" className="bg-gray-800">Other</option>
                <option value="prefer-not-to-say" className="bg-gray-800">Prefer not to say</option>
              </select>
              <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            {errors.gender && <p className="mt-1 text-sm text-red-400">{errors.gender}</p>}
          </div>

          {/* Password fields */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full pl-11 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="At least 8 characters"
              />
            </div>
            {errors.password && <p className="mt-1 text-sm text-red-400">{errors.password}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full pl-11 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Re-enter your password"
              />
            </div>
            {errors.confirmPassword && <p className="mt-1 text-sm text-red-400">{errors.confirmPassword}</p>}
          </div>

          {/* Submit Button with Loading State */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Creating Account...</span>
              </>
            ) : (
              <span>Create Account</span>
            )}
          </button>

          <p className="text-center text-gray-400 text-sm">
            Already have an account?{' '}
            <span 
              onClick={() => !isLoading && navigate('/signin')}
              className={`text-blue-400 hover:text-blue-300 font-medium ${isLoading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
            >
              Log in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}