﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace ClinicaServer.Models
{
    public partial class Atendimento
    {

        public uint Id { get; set; }
        public uint Pacienteid { get; set; }
        public DateTime Datahoraatendimento { get; set; }
        public bool Concluido { get; set; }


        
        public virtual Paciente Paciente { get; set; }
        public virtual ICollection<Examecovid> Examecovid { get; set; }
        public virtual ICollection<Examegeral> Examegeral { get; set; }
    }
}