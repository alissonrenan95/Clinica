import { differenceInYears } from "date-fns";
import { Examecovid } from "../dto/Examecovid";

export function classificarPressaoSistolica(pressaosistolica: number) {
    try {
        return (pressaosistolica < 90) ? "Hipotenso" : (pressaosistolica < 130) ? "Normotenso" : (pressaosistolica < 140) ? "Normotenso Limítrofe" : (pressaosistolica < 160) ? "Hipertenso Leve" : (pressaosistolica < 180) ? "Hipertenso Moderado" : (pressaosistolica >= 180) ? "Hipertenso Grave" : "";
    }
    catch (exception) {
        return "";
    }
}
export function classificarPressaoDiastolica(pressaodiastolica: number) {
    try {
        return (pressaodiastolica < 60) ? "Hipotenso" : (pressaodiastolica < 85) ? "Normotenso" : (pressaodiastolica < 90) ? "Normotenso Limítrofe" : (pressaodiastolica < 100) ? "Hipertenso Leve" : (pressaodiastolica < 110) ? "Hipertenso Moderado" : (pressaodiastolica >= 110) ? "Hipertenso Grave" : "";
    }
    catch (exception) {
        return "";
    }
}
export function classificarFrequenciaCardiaca(pulsacao: number, dtnascimento: Date) {
    const idade = differenceInYears(new Date(), new Date(dtnascimento));

    try {
        if (idade < 2) {
            return (pulsacao < 120) ? "Bradicárdico" : (pulsacao <= 160) ? "Normocárdico" : (pulsacao > 160) ? "Taquicárdico" : "";
        }
        else if (idade < 12) {
            return (pulsacao < 80) ? "Bradicárdico" : (pulsacao <= 130) ? "Normocárdico" : (pulsacao > 130) ? "Taquicárdico" : "";
        }
        else if (idade >= 12) {
            return (pulsacao < 60) ? "Bradicárdico" : (pulsacao <= 100) ? "Normocárdico" : (pulsacao > 100) ? "Taquicárdico" : "";

        }
        else {
            return "";
        }
    }
    catch (exception) {
        return "";
    }
}
export function classificarFrequenciaRespiratoria(respiracao: number) {
    try {
        return (respiracao < 14) ? "Bradipnéico" : (respiracao <= 20) ? "Eupnéico" : (respiracao > 20) ? "Taquipnéico" : "";
    }
    catch (exception) {
        return ""
    }

}

export function classificarTemperaturaCelsius(temperatura: number) {
    try {
        return (temperatura < 36) ? "Hipotermia" : (temperatura < 37.2) ? "Normotermia ou Afebril" : (temperatura < 37.7) ? "Estado febril/subfebril ou febrícula" : (temperatura < 38.9) ? "Febre" : (temperatura <= 40) ? "Pirexia" : (temperatura > 40) ? "Hiperpirexia" : "";
    }
    catch (exception) {
        return "";
    }
}


//"###.###.###-##" convert to ###########
export function convertCpfFormattedStringToNumber(cpf: string) {
    if (cpf && cpf.length === 14) {
        try {
            return Number(cpf.replace('.', "").replace('.', '').replace('-', ""));
        }
        catch (exception) {

        }
    }
    return null;
}

export function convertCpfNumberToFormattedString(cpf: number) {
    if (cpf && !isNaN(cpf)) {
        let cpfstring = "" + cpf;
        while (cpfstring.length < 11) {
            cpfstring = "0" + cpfstring;
        }
        //cpfstring=(cpfstring.length>3)
        return cpfstring.substring(0, 3) + "." + cpfstring.substring(3, 6) + "." + cpfstring.substring(6, 9) + "-" + cpfstring.substring(9, 11);
    }
    return null;
}



export function validateCpf(cpf: string) {
    if (cpf.length != 11 ||
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

    let add = 0;

    for (let i = 0; i < 9; i++) {
        add += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let rev = 11 - (add % 11);
    if (rev == 10 || rev == 11) {
        rev = 0;
    }
    if (rev != parseInt(cpf.charAt(9))) {
        return false;
    }
    add = 0;
    for (let i = 0; i < 10; i++) {
        add += parseInt(cpf.charAt(i)) * (11 - i);
    }
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11) {
        rev = 0;
    }
    if (rev != parseInt(cpf.charAt(10))) {
        return false;
    }
    return true;
}

export function formatarCpf(cpfstring: string): string {
    if (!isNaN(Number(cpfstring.replace(".", "").replace(".", "").replace("-", ""))) && cpfstring.length <= 14) {

        if (cpfstring.length === 11) {
            return cpfstring += "-";
        }
        else if (cpfstring.length === 3 || cpfstring.length === 7) {
            return cpfstring += ".";
        }

        else if (cpfstring.length === 12 || cpfstring.length === 8 || cpfstring.length === 4) {
            return cpfstring.substring(0, cpfstring.length - 1);
        }
    }
    else {
        return cpfstring = "";
    }
    return cpfstring;
}

export function gerarResultadoExameCovid(examecovid: Examecovid) {
    let countpositivos = 0;
    let countnegativos = 0;
    if (examecovid) {
        (examecovid.febre) ? countpositivos++ : countnegativos--;
        (examecovid.narizentupido) ? countpositivos++ : countnegativos--;
        (examecovid.tosse) ? countpositivos++ : countnegativos--;
        (examecovid.doresnocorpo) ? countpositivos++ : countnegativos--;
        (examecovid.dordegarganta) ? countpositivos++ : countnegativos--;
        (examecovid.faltadepaladar) ? countpositivos++ : countnegativos--;
        (examecovid.dificuldadedelocomocao) ? countpositivos++ : countnegativos--;
        (examecovid.coriza) ? countpositivos++ : countnegativos--;
        (examecovid.cansaco) ? countpositivos++ : countnegativos--;
        (examecovid.dordecabeca) ? countpositivos++ : countnegativos--;
        (examecovid.malestargeral) ? countpositivos++ : countnegativos--;
        (examecovid.dificuldadederespirar) ? countpositivos++ : countnegativos--;
        (examecovid.faltadeolfato) ? countpositivos++ : countnegativos--;
        (examecovid.diarreia) ? countpositivos++ : countnegativos--;
        let percentual = (countpositivos / (countpositivos + countnegativos) * 100);
        if (percentual < 40) {
            return "Insuficiente";
        } else if (percentual < 60) {
            return "Possivelmente Infectado";
        } else {
            return "Potencialmente Infectado";
        }

    }
    return ""
}

export const mesesextenso = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];

export function convertBooleanToString(booleanvar:boolean){
    return booleanvar?"Sim":"Não";
}