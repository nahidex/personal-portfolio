export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-bg py-12">
      <div className="container mx-auto px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-base text-black/40">
            ©{currentYear} Portfolio by Habibullah Nahid
          </p>

          <div className="flex items-center gap-6">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black/40 hover:text-black transition-colors"
            >
              Twitter
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black/40 hover:text-black transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black/40 hover:text-black transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
