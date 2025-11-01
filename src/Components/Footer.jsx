// // Footer.jsx
// import React from 'react';
// import {
//     Globe,
//     Share2,
//     MessageCircle,
//     Link as LinkIcon,
//     Send,
//     Feather,
// } from 'lucide-react';

// const links = [
//     {
//         title: 'Features',
//         href: '#features',
//     },
//     {
//         title: 'Solution',
//         href: '#solution',
//     },
//     {
//         title: 'Customers',
//         href: '#customers',
//     },
//     {
//         title: 'Pricing',
//         href: '#pricing',
//     },
//     {
//         title: 'Help',
//         href: '#help',
//     },
//     {
//         title: 'About',
//         href: '#about',
//     },
// ];

// const socialLinks = [
//     {
//         icon: Share2,
//         href: '#',
//         label: 'Share',
//     },
//     {
//         icon: MessageCircle,
//         href: '#',
//         label: 'Message',
//     },
//     {
//         icon: LinkIcon,
//         href: '#',
//         label: 'Link',
//     },
//     {
//         icon: Globe,
//         href: '#',
//         label: 'Website',
//     },
//     {
//         icon: Send,
//         href: '#',
//         label: 'Send',
//     },
//     {
//         icon: Feather,
//         href: '#',
//         label: 'Posts',
//     },
// ];

// export default function Footer() {
//     return (
//         <footer className="py-16 md:py-32 bg-black border-t border-gray-800">
//             <div className="mx-auto max-w-5xl px-6">
//                 {/* Logo/Brand */}
//                 <a
//                     href="/"
//                     aria-label="go home"
//                     className="mx-auto block w-fit"
//                 >
//                     <div className="flex items-center justify-center space-x-2">
//                         <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
//                             <span className="text-white font-bold text-xl">AI</span>
//                         </div>
//                         <span className="text-white font-bold text-xl">Gym Trainer</span>
//                     </div>
//                 </a>

//                 {/* Navigation Links */}
//                 <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
//                     {links.map((link, index) => (
//                         <a
//                             key={index}
//                             href={link.href}
//                             className="text-gray-400 hover:text-blue-400 block duration-150 transition"
//                         >
//                             <span>{link.title}</span>
//                         </a>
//                     ))}
//                 </div>

//                 {/* Social Links */}
//                 <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
//                     {socialLinks.map((social, index) => {
//                         const Icon = social.icon;
//                         return (
//                             <a
//                                 key={index}
//                                 href={social.href}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 aria-label={social.label}
//                                 className="text-gray-400 hover:text-blue-400 block transition duration-150"
//                             >
//                                 <Icon className="w-6 h-6" />
//                             </a>
//                         );
//                     })}
//                 </div>

//                 {/* Copyright */}
//                 <span className="text-gray-400 block text-center text-sm">
//                     © {new Date().getFullYear()} AI Gym Trainer. All rights reserved.
//                 </span>
//             </div>
//         </footer>
//     );
// }

// Footer.jsx

import React from 'react';
import {
    Globe,
    Share2,
    MessageCircle,
    Link as LinkIcon,
    Send,
    Feather,
} from 'lucide-react';

const links = [
    {
        title: 'Features',
        href: '#features',
    },
    {
        title: 'Solution',
        href: '#solution',
    },
    {
        title: 'Customers',
        href: '#customers',
    },
    {
        title: 'Pricing',
        href: '#pricing',
    },
    {
        title: 'Help',
        href: '#help',
    },
    {
        title: 'About',
        href: '#about',
    },
];

const socialLinks = [
    {
        icon: Share2,
        href: '#',
        label: 'Share',
    },
    {
        icon: MessageCircle,
        href: '#',
        label: 'Message',
    },
    {
        icon: LinkIcon,
        href: '#',
        label: 'Link',
    },
    {
        icon: Globe,
        href: '#',
        label: 'Website',
    },
    {
        icon: Send,
        href: '#',
        label: 'Send',
    },
    {
        icon: Feather,
        href: '#',
        label: 'Posts',
    },
];

export default function Footer() {
    return (
        <footer className="py-8 md:py-12 bg-black border-t border-gray-800">
            <div className="mx-auto max-w-5xl px-6">
                {/* Logo/Brand */}
                
                  <a  href="/"
                    aria-label="go home"
                    className="mx-auto block w-fit"
                >
                    <div className="flex items-center justify-center space-x-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">AI</span>
                        </div>
                        <span className="text-white font-bold text-xl">Gym Trainer</span>
                    </div>
                </a>

                {/* Navigation Links */}
                <div className="my-6 flex flex-wrap justify-center gap-6 text-sm">
                    {links.map((link, index) => (
                    <a    
                            key={index}
                            href={link.href}
                            className="text-gray-400 hover:text-blue-400 block duration-150 transition"
                        >
                            <span>{link.title}</span>
                        </a>
                    ))}
                </div>

                {/* Social Links */}
                <div className="my-6 flex flex-wrap justify-center gap-6 text-sm">
                    {socialLinks.map((social, index) => {
                        const Icon = social.icon;
                        return (
                            
                            <a    key={index}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={social.label}
                                className="text-gray-400 hover:text-blue-400 block transition duration-150"
                            >
                                <Icon className="w-6 h-6" />
                            </a>
                        );
                    })}
                </div>

                {/* Copyright */}
                <span className="text-gray-400 block text-center text-sm">
                    © {new Date().getFullYear()} AI Gym Trainer. All rights reserved.
                </span>
            </div>
        </footer>
    );
}