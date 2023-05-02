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
                            ->keep(6);

        return response()->json($dados);

    }

        //$dados=Examecovid::join('atendimento', 'examecovid.atendimentoid','=','atendimento.id')->selectRaw('year(atendimento.datahoraatendimento) as ano, month(atendimento.datahoraatendimento) as mes,COUNT(atendimento.id) as totalatendimentos')->get()->groupBy('ano','mes');
        
        //$dados=Examecovid::join('atendimento', 'examecovid.atendimentoid','=','atendimento.id')->selectRaw('year(atendimento.datahoraatendimento) as ano, month(atendimento.datahoraatendimento) as mes')->groupBy('atendimento.ano')->groupBy('atendimento.mes')->count('atendimento.id');
        
        //$dados=Examecovid::join('atendimento', 'examecovid.atendimentoid','=','atendimento.id')->selectRaw("YEAR(atendimento.datahoraatendimento) ano, MONTH(atendimento.datahoraatendimento) mes")->get();
        
        //$dados=Examecovid::count('atendimentoid')->groupBy('atendimentoid')->get();

        /*$dados=Atendimento::select(Atendimento::raw('YEAR(datahoraatendimento) ano, MONTH(datahoraatendimento) mes, count(id) as totalatendimentos'))
            ->groupby('ano','mes')
           ->get();
        */
        //[{id,qtdsintomas}]

        /*$dados=Atendimento::rightJoin('examecovid', 'examecovid.atendimentoid','=','atendimento.id')
            ->select(Atendimento::raw('atendimento.id as atendimentoid, YEAR(datahoraatendimento) as ano, MONTH(datahoraatendimento) as mes, '.$expressionsintomas.' as qtdsintomas'))->get()
        ;
        */
        //$dados=Atendimento::selectRaw('count(id) as totalatendimentos, year(datahoraatendimento) as ano, month(datahoraatendimento) as mes')->count('id')->orderBy('ano','desc')->orderBy('mes','desc')->take(6)->get();
        
        
        /*
        select YEAR(a.datahoraatendimento) as ano,MONTH(a.datahoraatendimento) as mes, count(a.id) as totalatendimentos, 
        (ec.febre+ec.coriza+ec.narizentupido+ec.cansaco+ec.tosse+ec.dordecabeca+ec.doresnocorpo+ec.malestargeral+ec.dordegarganta+ec.dificuldadederespirar+ec.faltadepaladar+ec.faltadeolfato+ec.dificuldadedelocomocao+ec.diarreia) as qtdsintomas, 
        count(case when qtdsintomas>5 then 1 end)-count(case when qtdsintomas>8 then 1 end) as totalpossivelmenteinfectados, count(case when qtdsintomas>8 then 1 end) as totalpotencialmenteinfectados
        from atendimento a, examecovid ec where ec.atendimentoid=a.id group by ano,mes order by ano desc, mes desc limit 0,6;
    
        
        ano
        mes

        count id in select infected
        count id in select possible infected
        count id in select not infected
        */
        
    


    
}
