// @ts-ignore
import { Provider as RenditionProvider } from "rendition";
// @ts-ignore
import { createRoot } from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";

import { store } from "./redux";
import App from "./App";

const rootElement = document.getElementById("root");
// @ts-ignore
const root = createRoot(rootElement);

root.render(
  <ReduxProvider store={store}>
    <RenditionProvider>
      <App />
    </RenditionProvider>
  </ReduxProvider>
);
