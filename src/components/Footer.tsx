import logoWhite from "@/assets/logo-white.png";

const Footer = () => {
  return (
    <footer className="py-8 md:py-12 border-t border-border">
      <div className="container px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 font-display font-bold text-foreground">
          <img src={logoWhite} alt="WebCom Media" className="h-7 w-auto" />
          <span>WebCom Media</span>
        </div>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} WebCom Media. All rights reserved.
        </p>
        <a
          href="mailto:webcommedia1@gmail.com"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          webcommedia1@gmail.com
        </a>
      </div>
    </footer>
  );
};

export default Footer;
