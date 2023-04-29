import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import PacientePage from './pages/PacientePage';
import AtendimentoPage from './pages/AtendimentoPage';
import ExamegeralPage from './pages/ExamegeralPage';
import CustomNavbar from './components/CustomNavbar';
import HomePage from './pages/HomePage';
import {PacienteProvider} from './context/PacienteContext';
import { AuthProvider } from './context/AuthContext';
import FormPaciente from './components/FormPaciente';

function App() {

  
  return (
    <div className="App" style={({ height: "100vh" }, { display: "flex" , maxWidth:"100vw"})}>
      
      <Router>
        <CustomNavbar/>
          <AuthProvider>
            <PacienteProvider>
              <Routes>
                <Route exact path="/" element={<HomePage/>}/>
                <Route exact path="Paciente" element={<PacientePage/>}/>
                <Route exact path="Paciente/:pacienteid/Atendimento" element={<AtendimentoPage/>}/>
                <Route exact path="Paciente/:pacienteid/Atendimento/:atendimentoid/Examegeral" element={<ExamegeralPage/>}/>
                <Route exact path="Atendimento" element={<AtendimentoPage/>}/>
                <Route exact path="Atendimento/:atendimentoid/Examegeral" element={<ExamegeralPage/>}/>
                <Route exact path="Paciente/novo" element={<FormPaciente/>}/>
                <Route path="*" element={<h2>Não encontrado</h2>}/>
              </Routes>
            </PacienteProvider>
          </AuthProvider>
        
      </Router>
      
    </div>
  );
}

export default App;
