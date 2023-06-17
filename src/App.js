import Home from "./components/Home";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <>
      <SnackbarProvider>
        <Home />
      </SnackbarProvider>
    </>
  );
}

export default App;
