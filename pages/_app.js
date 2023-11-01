import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <div className={` font-mono selection:bg-gray-700 selection:text-white `}>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}
