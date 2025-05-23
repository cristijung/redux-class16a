"use client";

import { Provider } from "react-redux";
import { useRef } from "react";
import { store as createStoreFunction, AppStore } from "./store/store";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { setupListeners } from "@reduxjs/toolkit/query/react";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = createStoreFunction();
    // se precisar configure listeners para RTK Query
    setupListeners(storeRef.current.dispatch);
  }

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Provider store={storeRef.current}>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </Provider>
      </div>
    </>
  );
}
