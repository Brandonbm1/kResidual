import Hero from "./components/Hero";
import ProponentePage from "./components/ProponentePage";
import "./styles/css/index.css";
import { ProponentContextProvider } from "./context/ProponentsContext";
import Modal from "./components/Modal";
import ContratoPage from "./components/ContratoPage";
import Prueba from "./components/Prueba";
import Report from "./components/Report";
const App = () => {
  return (
    <ProponentContextProvider>
      <Hero />
      <ProponentePage />
      <ContratoPage />
      <Modal />
      <Report />
      {/* <Prueba /> */}
    </ProponentContextProvider>
  );
};

export default App;
