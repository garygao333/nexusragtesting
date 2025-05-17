export default function Navbar() {
    return (
      <nav className="flex justify-between items-center p-4 border-b text-sm">
        <div className="flex items-center space-x-2">
        <img src="/hippra-logo.png" alt="Hippra" className="h-[3.5rem] w-auto block" />
          <span className="font-bold text-xl">Hippra</span>
        </div>
      </nav>
    );
  }
  