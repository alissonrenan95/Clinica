import React, { useEffect } from 'react'
import { FaBars, FaFileMedical, FaHome, FaSearch, FaUserCheck, FaUsers } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'

import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import "./styles.css";
import { URL_BASE_ATENDIMENTO, URL_BASE_PACIENTE, URL_BASE_RELATORIO } from '../../services/Api';
const logoimage = require('../../assets/images/logo.png')

const CustomSidebar = () => {
  const { collapseSidebar } = useProSidebar();
  const navigate=useNavigate();
  useEffect(()=>{
    collapseSidebar();
  },[])

  return (
    
    <Sidebar className="sidebar">
      <Menu>
        <MenuItem icon={<FaBars />} onClick={() => { collapseSidebar(); }} className="menu-item-collapse" style={{ textAlign: "center" , backgroundColor:"#1B594E", color:"#F2F2F2"}}>
          <img className="sidebar-logo" src={logoimage} alt=""/>
        </MenuItem>

        <MenuItem icon={<FaHome />} onClick={() => { navigate("/") }} className="menu-item"><h2>Home</h2></MenuItem>
        <MenuItem icon={<FaUsers />} onClick={() => { navigate("/"+URL_BASE_PACIENTE) }} className="menu-item"><h2>Pacientes</h2></MenuItem>
        <MenuItem icon={<FaUserCheck />} onClick={() => { navigate("/"+URL_BASE_ATENDIMENTO) }} className="menu-item"><h2>Atendimentos</h2></MenuItem>
        <MenuItem icon={<FaFileMedical />} onClick={() => { navigate("/"+URL_BASE_RELATORIO) }} className="menu-item"><h2>Relatório</h2></MenuItem>
      </Menu>
    </Sidebar>

  )
}

export default CustomSidebar;