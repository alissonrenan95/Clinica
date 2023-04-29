import React, { useEffect } from 'react'
import { FaGripLines, FaHome, FaSearch, FaUserCheck, FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom'

import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";

const CustomNavbar = () => {
  const { collapseSidebar } = useProSidebar();
  useEffect(()=>{
    collapseSidebar();
  },[])

  return (
    
      <Sidebar style={{ height: "100vh", backgroundColor:"#00F9F9"}}>
          <Menu>
            <MenuItem
              icon={<FaGripLines />}
              onClick={() => {
                collapseSidebar();
              }}
              style={{ textAlign: "center" , backgroundColor:"#CCCCCC"}}
            >
              {" "}
              <h2>Menu</h2>
            </MenuItem>
            <Link to="/" style={{textDecoration:"none", color:"#000000"}}><MenuItem icon={<FaHome/>}><h2>Home</h2></MenuItem></Link>
            <Link to="/Paciente" style={{textDecoration:"none", color:"#000000"}}><MenuItem icon={<FaUsers/>}><h2>Pacientes</h2></MenuItem></Link>
            <Link to="/Atendimento" style={{textDecoration:"none", color:"#000000"}}><MenuItem icon={<FaUserCheck/>}><h2>Atendimentos</h2></MenuItem></Link>
            <Link to="/ExameGeral" style={{textDecoration:"none", color:"#000000"}}><MenuItem icon={<FaSearch/>}><h2>Exames Gerais</h2></MenuItem></Link>
            <Link to="/ExameCovid" style={{textDecoration:"none", color:"#000000"}}><MenuItem icon={<FaSearch/>}><h2>Exames Covid</h2></MenuItem></Link>
          </Menu>
        </Sidebar>
      
      
    /*
    <div style={{display:'flex', flexDirection:"row", justifyContent:"space-around", alignItems:"center", background:"#FF3333", color:"white", fontWeight:'bold'}}>
        <p><FaClinicMedical/> CLINICA</p>
        <Link to="/" style={{textDecoration:"none", color:"#DDDDDD", padding:"1rem 2rem", borderRadius:"0.5rem", border:"1px solid grey"}}><FaHome/> Home</Link>
        <Link to="/Paciente" style={{textDecoration:"none", color:"#DDDDDD", padding:"1rem 2rem", borderRadius:"0.5rem", border:"1px solid grey"}}><FaUsers/> Pacientes</Link>
        <Link to="/Atendimento" style={{textDecoration:"none", color:"#DDDDDD", padding:"1rem 2rem", borderRadius:"0.5rem", border:"1px solid grey"}}><FaUserCheck/> Atendimentos</Link>
        <Link to="/ExameGeral" style={{textDecoration:"none", color:"#DDDDDD", padding:"1rem 2rem", borderRadius:"0.5rem", border:"1px solid grey"}}><FaSearch/> Exames Gerais</Link>
        <Link to="/ExameCovid" style={{textDecoration:"none", color:"#DDDDDD", padding:"1rem 2rem", borderRadius:"0.5rem", border:"1px solid grey"}}><FaSearch/> Emames Covid</Link>
    </div>
    */


  )
}

export default CustomNavbar;