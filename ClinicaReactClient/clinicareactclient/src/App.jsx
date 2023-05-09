import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

//import HomePage from './pages/HomePage';
import PacientePage from './pages/PacientePage';
import AtendimentoPage from './pages/AtendimentoPage';
import AtendimentoDetailPage from './pages/AtendimentoDetailPage';
import ExamegeralPage from './pages/ExamegeralPage';
import ExamecovidPage from './pages/ExamecovidPage';
import RelatorioPage from './pages/RelatorioPage';
import CustomSidebar from './components/CustomSidebar';

import FormPaciente from './components/FormPaciente';
import FormAtendimento from './components/FormAtendimento';
import FormExamegeral from "./components/FormExamegeral";
import FormExamecovid from "./components/FormExamecovid";

import { AuthProvider } from './context/AuthContext';
import {PacienteProvider} from './context/PacienteContext';
import React, { Suspense } from 'react';
import CustomNavbar from './components/CustomNavbar';

function App() {

  
  return (
    <div className="App">
      <Router>
          <CustomSidebar/>
          <div className='w-100'>
          <CustomNavbar/>
          <AuthProvider>
            <PacienteProvider>
              <Suspense fallback={<div>Carregando</div>}>
                <Routes>
                  <Route exact path="/" element={<PacientePage/>}/>
                  <Route exact path="/Paciente" element={<PacientePage/>}/>
                  <Route exact path="/Paciente/novo" element={<FormPaciente/>}/>
                  <Route exact path="/Paciente/:pacienteid" element={<FormPaciente/>}/>
                  <Route exact path="/Paciente/:pacienteid/Atendimento" element={<AtendimentoPage/>}/>
                  <Route exact path="/Paciente/:pacienteid/Atendimento/:atendimentoid" element={<AtendimentoDetailPage/>}/>
                  <Route exact path="/Paciente/:pacienteid/Atendimento/:atendimentoid/Examegeral" element={<ExamegeralPage/>}/>
                  <Route exact path="/Paciente/:pacienteid/Atendimento/:atendimentoid/Examegeral/:examegeralid" element={<FormExamegeral/>}/>
                  <Route exact path="/Paciente/:pacienteid/Atendimento/:atendimentoid/Examecovid" element={<ExamecovidPage/>}/>
                  <Route exact path="/Paciente/:pacienteid/Atendimento/:atendimentoid/Examecovid/:examecovidid" element={<FormExamecovid/>}/>

                  <Route exact path="/Atendimento" element={<AtendimentoPage/>}/>
                  <Route exact path="/Atendimento/Novo" element={<FormAtendimento/>}/>
                  <Route exact path="/Atendimento/:atendimentoid" element={<AtendimentoDetailPage/>}/>
                  <Route exact path="/Atendimento/:atendimentoid/Examegeral" element={<ExamegeralPage/>}/>
                  <Route exact path="/Relatorio" element={<RelatorioPage/>}/>
                  
                  <Route path="*" element={<h2>Não encontrado</h2>}/>
                </Routes>
              </Suspense>
            </PacienteProvider>
          </AuthProvider>
          </div>
      </Router>
      
    </div>
  );
}

export default App;
