using Microsoft.CodeAnalysis.VisualBasic.Syntax;
using System.Composition;

namespace ClinicaServer.utils
{
    public class Utils
    {
        public static bool validateCpf(string cpf)
        {
                if (cpf.Length != 11 ||
                    cpf == "00000000000" ||
                    cpf == "11111111111" ||
                    cpf == "22222222222" ||
                    cpf == "33333333333" ||
                    cpf == "44444444444" ||
                    cpf == "55555555555" ||
                    cpf == "66666666666" ||
                    cpf == "77777777777" ||
                    cpf == "88888888888" ||
                    cpf == "99999999999")
                    return false;

                float add = 0;

                for (int i = 0; i < 9; i++)
                {
                    add += int.Parse(""+cpf[i]) * (10 - i);
                }
                float rev = 11 - (add % 11);
                if (rev == 10 || rev == 11)
                {
                    rev = 0;
                }
                if (rev != int.Parse(""+cpf[9]))
                {
                    return false;
                }
                add = 0;
                for (int i = 0; i < 10; i++)
                {
                    add += int.Parse("" + cpf[i]) * (11 - i);
                }
                rev = 11 - (add % 11);
                if (rev == 10 || rev == 11)
                {
                    rev = 0;
                }
                if (rev != int.Parse(""+cpf[10]))
                {
                    return false;
                }
                return true;
        }
    }
}
