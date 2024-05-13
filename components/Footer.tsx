export default function Footer() {
  return (
    <footer className="bg-black mt-20">
      <div className="max-w-7xl	mx-auto p-4">
        <span className="text-white font-bold uppercase text-sm">
          © {new Date().getFullYear()} Milanized!
        </span>
      </div>
    </footer>
  );
}
