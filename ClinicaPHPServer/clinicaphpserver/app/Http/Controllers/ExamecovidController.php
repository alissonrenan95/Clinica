<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\models\Atendimento;
use App\models\Examecovid;

class ExamecovidController extends Controller
{
    // Rota GET /Examecovid
    public function findAll(){
        $examecovids=Examecovid::with('atendimento')->orderBy('id','desc')->get();
        return response()->json($examecovids);
    }

    // Rota POST /Examecovid
    //cria examecovid finalizado(concluido=true)
    public function create(Request $request){
        try{
            $atendimentos=Atendimento::where(['id',$request->$atendimentoid])->get();
            $examecovidnovo=new Examecovid;
            $examecovidnovo->atendimentoid=$atendimentos[0]->id;
            $examecovidnovo->febre=$request->febre;
            $examecovidnovo->coriza=$request->coriza;
            $examecovidnovo->narizentupido=$request->narizentupido;
            $examecovidnovo->cansaco=$request->cansaco;
            $examecovidnovo->tosse=$request->tosse;
            $examecovidnovo->dordecabeca=$request->dordecabeca;
            $examecovidnovo->malestargeral=$request->malestargeral;
            $examecovidnovo->doresnocorpo=$request->doresnocorpo;
            $examecovidnovo->dordegarganta=$request->dordegarganta;
            $examecovidnovo->dificuldadederespirar=$request->dificuldadederespirar;
            $examecovidnovo->faltadepaladar=$request->faltadepaladar;
            $examecovidnovo->faltadeolfato=$request->faltadeolfato;
            $examecovidnovo->dificuldadedelocomocao=$request->dificuldadedelocomocao;
            $examecovidnovo->diarreia=$request->diarreia;
            $examecovidnovo->concluido = true;
            return response()->json($examecovidnovo->save()>0);
        }
        catch(exception $ex){

        }
        return response()->json(false);
    }

    // Rota GET /Examecovid/{atendimentoid}
    public function findExamecovidById($examecovidid){
        $examecoviddb = Examecovid::with('atendimento')->where('id',$examecovidid)->get();
        return response()->json($examecoviddb);
    }

    // Rota POST /Examecovid/{atendimentoid}
    //finaliza examecovid(concluido=true)
    public function update(Request $request, $examecovidid){
        try{
            $examecovids=Examecovid::where([['examecovid.atendimentoid',$request->atendimentoid],['examecovid.id',$examecovidid]])->leftJoin('atendimento', 'examecovid.atendimentoid','=','atendimento.id')->leftJoin('paciente','atendimento.pacienteid','=','paciente.id')->select('examecovid.*')->get();; //se quiser menos dados é só colocar . na string do select e selecionar a propriedade
            $examecoviddb=$examecovids[0];
            
            
            $examecoviddb->febre=$request->febre;
            $examecoviddb->coriza=$request->coriza;
            $examecoviddb->narizentupido=$request->narizentupido;
            $examecoviddb->cansaco=$request->cansaco;
            $examecoviddb->tosse=$request->tosse;
            $examecoviddb->dordecabeca=$request->dordecabeca;
            $examecoviddb->malestargeral=$request->malestargeral;
            $examecoviddb->doresnocorpo=$request->doresnocorpo;
            $examecoviddb->dordegarganta=$request->dordegarganta;
            $examecoviddb->dificuldadederespirar=$request->dificuldadederespirar;
            $examecoviddb->faltadepaladar=$request->faltadepaladar;
            $examecoviddb->faltadeolfato=$request->faltadeolfato;
            $examecoviddb->dificuldadedelocomocao=$request->dificuldadedelocomocao;
            $examecoviddb->diarreia=$request->diarreia;
            $examecoviddb->concluido = true;
            return response()->json($examecoviddb->save()>0);
        }
        catch(exception $ex){
            return response()->json($ex);
        }
        return response()->json(false);
    }
}