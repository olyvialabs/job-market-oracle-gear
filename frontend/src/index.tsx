import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { App } from "./App";

const container = document.getElementById("root");
const root = createRoot(container as HTMLElement);
const NewApp = App as unknown as any;

root.render(
  (
    <ChakraProvider>
      <NewApp />
    </ChakraProvider>
  ) as any
);
