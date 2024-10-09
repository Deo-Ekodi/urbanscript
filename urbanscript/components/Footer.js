// import React from 'react';
// import Link from 'next/link';

// const Footer = () => {
//     return (
//         <>
//             <footer>
//                 <div className="footer max-w-full mx-auto px-4 sm:px-6 bg-gray-100 border-t border-b py-10">

//                     {/* Top area: Blocks */}
//                     <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 py-8 md:py-12 border-t border-gray-200">

//                         {/* 1st block */}
//                         <div className="col-span-12 lg:col-span-4">
//                             <div className="box-border border-b-4 border-blue-900 p-8 bg-gray-200 text-gray-600 text-center rounded-lg xl:w-80 mx-auto">
//                                 <h3 className="font-bold text-4xl mb-4">UrbanScript</h3>
//                                 <div className='text-md font-medium text-gray-600'>
//                                     <h5>Your Unique,</h5>
//                                     <p>Dedicated,</p>
//                                     <p>Design</p>
//                                     <p>Assistant.</p>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* 2nd block */}
//                         <div className="col-span-6 md:col-span-6 lg:col-span-1 mx-auto">
//                             <h6 className="text-[#013289] text-xl font-bold mb-4">LINKS</h6>
//                             <ul className="text-md">
//                                 <li className="mb-2">
//                                     <Link href="/coming_soon" className="text-[#013289] hover:text-gray-900 hover:tracking-wider transition duration-250 ease-in-out">About</Link>
//                                 </li>
//                                 <li className="mb-2">
//                                     <Link href="/coming_soon" className="text-[#013289] hover:text-gray-900 hover:tracking-wider transition duration-250 ease-in-out">Services</Link>
//                                 </li>
//                                 <li className="mb-2">
//                                     <Link href="/contact" className="text-[#013289] hover:text-gray-900 hover:tracking-wider transition duration-250 ease-in-out">Contact</Link>
//                                 </li>
//                                 <li className="mb-2">
//                                     <Link href="/refund-policy" className="text-[#013289] hover:text-gray-900 hover:tracking-wider transition duration-250 ease-in-out">Refund Policy</Link>
//                                 </li>
//                             </ul>
//                         </div>

//                         {/* 3rd block */}
//                         <div className="col-span-6 md:col-span-6 lg:col-span-4 mx-auto">
//                             <h6 className="text-[#013289] text-xl font-bold mb-4">OUR SERVICES</h6>
//                             <ul className="text-md">
//                                 <li className="mb-2">
//                                     <Link href="/" className="text-[#013289] hover:text-gray-900 hover:tracking-wider transition duration-250 ease-in-out">Image generation</Link>
//                                 </li>
//                                 <li className="mb-2">
//                                     <Link href="/coming_soon" className="text-[#013289] hover:text-gray-900 hover:tracking-wider transition duration-250 ease-in-out">User custom models</Link>
//                                 </li>
//                                 <li className="mb-2">
//                                     <Link href="/coming_soon" className="text-[#013289] hover:text-gray-900 hover:tracking-wider transition duration-250 ease-in-out">Image Storage</Link>
//                                 </li>
//                                 <li className="mb-2">
//                                     <Link href="coming_soon" className="text-[#013289] hover:text-gray-900 hover:tracking-wider transition duration-250 ease-in-out">Design Consultations</Link>
//                                 </li>
//                             </ul>
//                         </div>

//                         {/* 4th block */}
//                         <div className="col-span-12 text-center mx-auto lg:col-span-3 font-bold uppercase text-blue-900">
//                             <div className="text-xl mb-6">
//                                 Social Media Links.
//                             </div>
//                             <div className="text-md font-medium mb-6">
//                                 Follow us on social media.
//                             </div>
//                             <div className="mx-auto text-center mt-2">
//                                 <ul className="flex justify-center mb-4 md:mb-0">
//                                     <li>
//                                         <Link href="/coming_soon" className="flex justify-center items-center text-blue-900 hover:text-gray-500 bg-white hover:bg-white-100 rounded-full shadow transition duration-150 ease-in-out" aria-label="Twitter">
//                                             <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
//                                                 <path d="M24 11.5c-.6.3-1.2.4-1.9.5.7-.4 1.2-1 1.4-1.8-.6.4-1.3.6-2.1.8-.6-.6-1.5-1-2.4-1-1.7 0-3.2 1.5-3.2 3.3 0 .3 0 .5.1.7-2.7-.1-5.2-1.4-6.8-3.4-.3.5-.4 1-.4 1.7 0 1.1.6 2.1 1.5 2.7-.5 0-1-.2-1.5-.4 0 1.6 1.1 2.9 2.6 3.2-.3.1-.6.1-.9.1-.2 0-.4 0-.6-.1.4 1.3 1.6 2.3 3.1 2.3-1.1.9-2.5 1.4-4.1 1.4H8c1.5.9 3.2 1.5 5 1.5 6 0 9.3-5 9.3-9.3v-.4c.7-.5 1.3-1.1 1.7-1.8z" />
//                                             </svg>
//                                         </Link>
//                                     </li>
//                                     <li className="ml-4">
//                                         <Link href="/coming_soon" className="flex justify-center items-center text-blue-900 hover:text-gray-500 bg-white hover:bg-white-100 rounded-full shadow transition duration-150 ease-in-out" aria-label="Facebook">
//                                             <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
//                                                 <path d="M14.023 24L14 17h-3v-3h3v-2c0-2.7 1.672-4 4.08-4 1.153 0 2.144.086 2.433.124v2.821h-1.67c-1.31 0-1.563.623-1.563 1.536V14H21l-1 3h-2.72v7h-3.257z" />
//                                             </svg>
//                                         </Link>
//                                     </li>
//                                 </ul>
//                             </div>
//                         </div>

//                     </div>

//                     <div className="flex flex-wrap items-center md:justify-between justify-center mx-auto px-4">
//                         <div className="w-full md:w-4/12 px-4 mx-auto text-center py-2">
//                             <div className="text-sm text-gray-200 font-semibold py-1">
//                                 Copyright &copy; {new Date().getFullYear()}{"  "}
//                                 <Link href="#" className="hover:text-gray-900">UrbanScript, LLC</Link>. All rights reserved.
//                             </div>
//                         </div>
//                     </div>

//                 </div>

//             </footer>
//         </>
//     );
// }

// export default Footer;


import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Footer grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          
          {/* Company Information */}
          <div className="text-center sm:text-left">
            <h2 className="text-xl font-bold mb-4">UrbanScript</h2>
            <p className="text-gray-400">
              Your unique, dedicated design assistant.
            </p>
          </div>

          {/* Links Section */}
          <div className="text-center">
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul>
              <li className="mb-2">
                <Link href="/coming_soon" legacyBehavior>
                  <a className="hover:text-blue-500 transition duration-300">About</a>
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/contact" legacyBehavior>
                  <a className="hover:text-blue-500 transition duration-300">Contact</a>
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/refund-policy" legacyBehavior>
                  <a className="hover:text-blue-500 transition duration-300">Refund Policy</a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div className="text-center sm:text-right">
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <div className="flex justify-center sm:justify-end space-x-4">
              <Link href="https://x.com/urbanscript_ai" legacyBehavior>
                <a
                  aria-label="Twitter"
                  className="hover:text-blue-500 transition duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-6 h-6"
                  >
                    <path d="M24 4.557a9.83 9.83 0 01-2.828.775 4.932 4.932 0 002.165-2.724 9.865 9.865 0 01-3.127 1.195 4.918 4.918 0 00-8.379 4.482 13.942 13.942 0 01-10.11-5.13 4.917 4.917 0 001.523 6.573 4.9 4.9 0 01-2.23-.616v.062a4.917 4.917 0 003.946 4.827 4.903 4.903 0 01-2.224.084 4.918 4.918 0 004.588 3.417 9.867 9.867 0 01-7.29 2.034 13.93 13.93 0 007.548 2.212c9.058 0 14.01-7.51 14.01-14.01 0-.214-.004-.428-.015-.64A10.024 10.024 0 0024 4.557z" />
                  </svg>
                </a>
              </Link>
              <Link href="/coming_soon" legacyBehavior>
                <a
                  aria-label="Facebook"
                  className="hover:text-blue-500 transition duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-6 h-6"
                  >
                    <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.406.593 24 1.325 24H12.82V14.708h-3.447V11.1h3.447V8.364c0-3.406 2.075-5.264 5.1-5.264 1.448 0 2.695.108 3.056.156v3.544h-2.097c-1.644 0-1.963.78-1.963 1.924v2.516h3.928l-.512 3.607h-3.416V24h6.68c.731 0 1.324-.593 1.324-1.324V1.325C24 .593 23.407 0 22.675 0z" />
                  </svg>
                </a>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="flex flex-col items-center sm:flex-row sm:justify-between mt-8 border-t border-gray-700 pt-4">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} UrbanScript, LLC. All rights reserved.
          </p>
          <Link href="/privacy-policy" legacyBehavior>
            <a className="text-sm text-gray-400 hover:text-blue-500 transition duration-300">
              Privacy Policy
            </a>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
