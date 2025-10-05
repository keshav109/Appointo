import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer id="contact" className="bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-950 dark:to-gray-900 text-white py-12">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="space-y-4">
                        <h3 className="font-bold text-xl mb-4 text-blue-400 dark:text-blue-300">Appointo</h3>
                        <p className="text-gray-300 dark:text-gray-400 text-sm leading-loose">
                            Streamlining healthcare appointments for a better patient experience.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <h3 className="font-bold text-lg mb-4 text-blue-400 dark:text-blue-300">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-300 dark:text-gray-400 hover:text-blue-400 dark:hover:text-blue-300 transition-colors duration-300">Home</a></li>
                            <li><a href="#" className="text-gray-300 dark:text-gray-400 hover:text-blue-400 dark:hover:text-blue-300 transition-colors duration-300">Find Doctor</a></li>
                            <li><a href="#" className="text-gray-300 dark:text-gray-400 hover:text-blue-400 dark:hover:text-blue-300 transition-colors duration-300">About Us</a></li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h3 className="font-bold text-lg mb-4 text-blue-400 dark:text-blue-300">Legal</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-300 dark:text-gray-400 hover:text-blue-400 dark:hover:text-blue-300 transition-colors duration-300">Privacy Policy</a></li>
                            <li><a href="#" className="text-gray-300 dark:text-gray-400 hover:text-blue-400 dark:hover:text-blue-300 transition-colors duration-300">Terms of Service</a></li>
                            <li><a href="#" className="text-gray-300 dark:text-gray-400 hover:text-blue-400 dark:hover:text-blue-300 transition-colors duration-300">Cookie Policy</a></li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h3 className="font-bold text-lg mb-4 text-blue-400 dark:text-blue-300">Connect With Developer</h3>
                        <div className="flex space-x-4">
                            <a 
                                href="https://github.com/keshav109" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-gray-300 dark:text-gray-400 hover:text-blue-400 dark:hover:text-blue-300 transition-colors duration-300"
                            >
                                <FaGithub size={24} />
                            </a>
                            <a 
                                href="https://www.linkedin.com/in/keshav-raj-96b847265/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-gray-300 dark:text-gray-400 hover:text-blue-400 dark:hover:text-blue-300 transition-colors duration-300"
                            >
                                <FaLinkedin size={24} />
                            </a>
                            <a 
                                href="mailto:keshavrajacharya109@gmail.com"
                                className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                            >
                                <FaEnvelope size={24} />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-700 mt-12 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} Appointo. All Rights Reserved.</p>
                        <div className="mt-4 md:mt-0">
                            <p className="text-gray-400 text-sm">
                                Designed & Developed by Keshav Raj
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

