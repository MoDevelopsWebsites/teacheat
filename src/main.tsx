import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css"; // Assuming index.css was the original import for global styles
import "./App.css"; // Re-adding the App.css import

createRoot(document.getElementById("root")!).render(<App />);