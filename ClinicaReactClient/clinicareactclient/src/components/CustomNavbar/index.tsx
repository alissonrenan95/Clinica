import React, { useEffect } from 'react'
import { FaBars, FaHome, FaSearch, FaUserCheck, FaUsers } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'

import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";

const CustomNavbar = () => {
  const { collapseSidebar } = useProSidebar();
  const navigate=useNavigate();
  useEffect(()=>{
    collapseSidebar();
  },[])

  return (
    
        <Sidebar style={{ height: "100vh", position:"sticky", top:0, backgroundColor:"#00F9F9"}}>
          <Menu>
            <MenuItem icon={<FaBars/>} onClick={()=>{collapseSidebar();}} style={{ textAlign: "center" , backgroundColor:"#CCCCCC"}}>
              <h2>Menu</h2>
            </MenuItem>

            <MenuItem icon={<FaHome/>} onClick={()=>{navigate("/")}} style={{textDecoration:"none", color:"#000000"}}><h2>Home</h2></MenuItem>
            <MenuItem icon={<FaUsers/>} onClick={()=>{navigate("/Paciente")}} style={{textDecoration:"none", color:"#000000"}}><h2>Pacientes</h2></MenuItem>
            <MenuItem icon={<FaUserCheck/>} onClick={()=>{navigate("/Atendimento")}} style={{textDecoration:"none", color:"#000000"}}><h2>Atendimentos</h2></MenuItem>
            <MenuItem icon={<FaSearch/>} onClick={()=>{navigate("/ExameGeral")}} style={{textDecoration:"none", color:"#000000"}}><h2>Exames Gerais</h2></MenuItem>
            <MenuItem icon={<FaSearch/>} onClick={()=>{navigate("/ExameCovid")}} style={{textDecoration:"none", color:"#000000"}}><h2>Exames Covid</h2></MenuItem>
          </Menu>
        </Sidebar>

  )
}

export default CustomNavbar;