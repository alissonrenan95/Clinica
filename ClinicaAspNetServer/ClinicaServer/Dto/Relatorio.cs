namespace ClinicaServer.Dto
{
    public class Relatorio
    {
        public int ano { get; set; }
        public int mes { get; set; }
        public long totalatendimentos { get; set; }
        public long totalpossivelmenteinfectados { get; set; }
        public long totalpotencialmenteinfectados { get; set; }


    }
}
