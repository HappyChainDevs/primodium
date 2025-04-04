import { HappyWalletProvider } from "@happy.tech/react";
import { Analytics } from "@vercel/analytics/react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "./index.css";

const rootElement = document.getElementById("react-root");
if (!rootElement) throw new Error("React root not found");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <>
    <HappyWalletProvider>
      <App />
      <Analytics />
    </HappyWalletProvider>
  </>,
);
