import React from "react";
import { FaHome, FaUser, FaPaperPlane, FaBars, FaUsers, FaUserCheck, FaFileMedical } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { URL_BASE_ATENDIMENTO, URL_BASE_PACIENTE, URL_BASE_RELATORIO } from "../../services/Api";
import "./styles.css";
const logoimage = require('../../assets/images/logo.png')



const CustomNavbar = () => {

  const navigate = useNavigate();


  return (
    <nav id="nav">
      <div id="nav-logo">
        <img className="nav-logo" src={logoimage} alt=""/>
      </div>
      <div id="itemsmenunav">
        <Link to="/"><FaHome /> Home</Link>
        <Link to="/Paciente/Novo"><FaUsers /> Paciente</Link>

        <Link to="/Atendimento"><FaUserCheck /> Atendimento</Link>

        <Link to="/Relatorio"><FaFileMedical /> Relatório</Link>
      </div>
      <div className="dropdown" id="dropmenunav">
        <button className="dropbtn"><FaBars /></button>
        <div className="dropdown-content">
          <Link to="/"><FaHome /> Home</Link>
          <Link to={"/"+URL_BASE_PACIENTE}><FaUsers /> Pacientes</Link>
          <Link to={"/"+URL_BASE_ATENDIMENTO}><FaUserCheck /> Atendimentos</Link>
          <Link to={"/"+URL_BASE_RELATORIO}><FaFileMedical /> Relatório</Link>
        </div>
      </div>


    </nav>
  );
};

export default CustomNavbar;