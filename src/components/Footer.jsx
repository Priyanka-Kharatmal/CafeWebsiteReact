const Footer = () => (
  <footer className="bg-amber-900 text-white text-center py-6 mt-6">
    <p className="text-sm">
      © {new Date().getFullYear()} Raj's Café. All rights reserved.
    </p>
    <p className="mt-2 text-sm">
      📍 123 Coffee Street, JavaTown | ☎️ (123) 456-7890
    </p>
    <div className="mt-3 space-x-4">
      <a href="#" className="hover:underline">
        Facebook
      </a>
      <a href="#" className="hover:underline">
        Instagram
      </a>
      <a href="#" className="hover:underline">
        Twitter
      </a>
    </div>
  </footer>
);

export default Footer;
