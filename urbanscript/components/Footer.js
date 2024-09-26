// components/Footer.js
export default function Footer() {
    return (
      <footer className="w-full py-4 bg-gray-900 bg-opacity-80 backdrop-blur-md shadow-md text-center text-white mt-10">
        <div className="container mx-auto">
          <p>© {new Date().getFullYear()} UrbanScript LLC. All rights reserved.</p>
        </div>
      </footer>
    );
  }
  