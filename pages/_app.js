import "../styles/globals.css";
import "../styles/loader.css"
import '../styles/thumbnail.css'
import '../styles/gallery.css'
import { AuthProvider } from "../context/AuthContext";
import { ThemeProvider } from "../context/ThemeContext";
import { Figtree } from "next/font/google"

const figtree = Figtree({ subsets: ["latin"]});

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <div className={figtree.className}>
          <Component {...pageProps} />
        </div>
      </ThemeProvider>
    </AuthProvider> 
  );
}
