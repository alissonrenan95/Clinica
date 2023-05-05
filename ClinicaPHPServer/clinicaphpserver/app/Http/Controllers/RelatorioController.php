<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\models\Paciente;
use App\models\Atendimento;
use App\models\Examegeral;
use App\models\Examecovid;

class RelatorioController extends Controller
{
    //Rota /Relatorio/findMonitorexamecovid
    public function findMonitorExamecovid(){
        
        //variavel para somar todos os sintomas de covid(verdadeiro=1)
        $expressionsintomas="febre+coriza+narizentupido+cansaco+tosse+dordecabeca+doresnocorpo+malestargeral+dordegarganta+dificuldadederespirar+faltadepaladar+faltadeolfato+dificuldadedelocomocao+diarreia";
        

        $dados=Atendimento::rightJoin('examecovid', 'examecovid.atendimentoid','=','atendimento.id')
            ->selectRaw('YEAR(datahoraatendimento) as ano,
                        MONTH(datahoraatendimento) as mes,
                        COUNT(examecovid.id) as totalatendimentos,
                        COUNT(CASE WHEN '.$expressionsintomas.' BETWEEN 5 AND 8 THEN 1 END) as totalpossivelmenteinfectados,
                        COUNT(CASE WHEN '.$expressionsintomas.'>8 THEN 1 END) as totalpotencialmenteinfectados')
                            //->where('concluido','=',false)
                            ->groupBy('ano','mes')
                            ->orderBy('ano','DESC')
                            ->orderBy('mes','DESC')
                            ->get()
                            ->take(6);

        return response()->json($dados);

    }


    public function findMonitorFaixaEtariaCovid(){
        
        //variavel para somar todos os sintomas de covid(verdadeiro=1)
        $expressionsintomas="febre+coriza+narizentupido+cansaco+tosse+dordecabeca+doresnocorpo+malestargeral+dordegarganta+dificuldadederespirar+faltadepaladar+faltadeolfato+dificuldadedelocomocao+diarreia";
        

        $dados=Atendimento::join('paciente', 'paciente.id','=','atendimento.pacienteid')->rightJoin('examecovid', 'examecovid.atendimentoid','=','atendimento.id')
            ->selectRaw('ceil(timestampdiff(YEAR,paciente.datanascimento,now())/10) as faixaetaria,
                        COUNT(CASE WHEN '.$expressionsintomas.'>8 THEN 1 END) as totalpotencialmenteinfectados')
                            ->groupBy('faixaetaria')
                            ->orderBy('faixaetaria','DESC')
                            ->get();
        return response()->json($dados);

    }

    public function findMonitorFaixaEtariaAtendimentos(){
        

        $dados=Atendimento::join('paciente', 'paciente.id','=','atendimento.pacienteid')
            ->selectRaw('ceil(timestampdiff(YEAR,paciente.datanascimento,now())/10) as faixaetaria,
                        COUNT(atendimento.id) as totalatendimentos')
                            ->groupBy('faixaetaria')
                            ->orderBy('faixaetaria','DESC')
                            ->get();
        return response()->json($dados);

    }


    
}
