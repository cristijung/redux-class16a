"use client";

import { Provider } from "react-redux";
import { store } from "./store/store"; //importação do store criado para a aplicação
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Provider store={store}>
          <Header />
          <main>{children}</main>
          <Footer />
        </Provider>
      </div>
    </>
  );
}
