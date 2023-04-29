<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\models\Atendimento;
use App\models\Examegeral;
use App\models\Examecovid;

class AtendimentoController extends Controller
{
    // Rota GET /Atendimento
    public function findAll(){
        // $atendimentos=Atendimento::with('paciente')->all();
        $atendimentos=Atendimento::with('paciente')->orderBy('datahoraatendimento','desc')->get();
        //return ['atendimentos'=>$atendimentos];
        //return response($atendimentos, 200, ['Content-Type => application/json']);
        return response()->json($atendimentos);
    }

    // Rota POST /Atendimento
    //cria um atendimento pendente(concluido=false)
    public function create(Request $request){
        $atendimentonovo=new Atendimento;
        $atendimentonovo->pacienteid=$request->pacienteid;
        $atendimentonovo->datahoraatendimento=new DateTime('now',new DateTimeZone('America/Sao_Paulo'));
        $atendimentonovo->concluido=false;
        return response()->json($atendimentonovo->save()>0);
    }
    
    // Rota GET /Atendimento/{atendimentoid}
    public function findAtendimentoById($atendimentoid){
        $atendimentodb = Atendimento::with('paciente')->findOrFail($atendimentoid);
        return response()->json($atendimentodb);
    }

    // Rota POST /Atendimento/{atendimentoid}
    public function update(Request $request, $atendimentoid){
        $atendimentodb = Atendimento::findOrFail($atendimentoid);
        $atendimentoidreqbody=$request->atendimentoid;
        if($atendimentoidreqbody==$atendimentoid){
            $atendimentodb->concluido=true;
            return response()->json($atendimentodb->save()>0);
        }
        return response()->json(false);
    }
    
    // Rota GET /Atendimento/{atendimentoid}/Examegeral
    public function findExamegeralByAtendimentoId($atendimentoid){
        $examegerals=Examegeral::with('atendimento.paciente')->where([['examegeral.atendimentoid',$atendimentoid]])->leftJoin('atendimento', 'examegeral.atendimentoid','=','atendimento.id')->leftJoin('paciente','atendimento.pacienteid','=','paciente.id')->select('examegeral.*')->get(); //se quiser menos dados é só colocar . na string do select e selecionar a propriedade
        return response()->json($examegerals);
    }
    
    // Rota POST /Atendimento/{atendimentoid}/Examegeral
    public function createExamegeralByAtendimentoId(Request $request,$atendimentoid){
        try{
            $atendimentos=Atendimento::where(['id',$atendimentoid])->get();
            $examegeralnovo=new Examegeral;
            $examegeralnovo->atendimentoid=$atendimentos[0]->id;
            $examegeralnovo->pressaosistolica=$request->pressaosistolica;
            $examegeralnovo->pressaodiastolica=$request->pressaodiastolica;
            $examegeralnovo->pulsacao=$request->pulsacao;
            $examegeralnovo->respiracao=$request->respiracao;
            $examegeralnovo->temperatura=$request->temperatura;
            $examegeralnovo->concluido = true;
            return response()->json($examegeralnovo->save()>0);
        }
        catch(exception $ex){

        }
        return response()->json(false);
    }
    
    // Rota GET /Atendimento/{atendimentoid}/Examecovid
    public function findExamecovidByAtendimentoId($atendimentoid){
        $examecovids=Examecovid::with('atendimento.paciente')->where([['examecovid.atendimentoid',$atendimentoid]])->leftJoin('atendimento', 'examecovid.atendimentoid','=','atendimento.id')->leftJoin('paciente','atendimento.pacienteid','=','paciente.id')->select('examecovid.*')->get(); //se quiser menos dados é só colocar . na string do select e selecionar a propriedade
        return response()->json($examecovids);
    }
    
    // Rota POST /Atendimento/{atendimentoid}/Examecovid
    public function createExamecovidByAtendimentoId(Request $request, $atendimentoid){
        try{
            $atendimentos=Atendimento::where(['id',$atendimentoid])->get();
            $examecovidnovo=new Examecovid;
            $examecovidnovo->atendimentoid=$atendimentos[0]->id;
            $examecovidnovo->febre=$request->febre;
            $examecovidnovo->coriza=$request->coriza;
            $examecovidnovo->narizentupido=$request->narizentupido;
            $examecovidnovo->cansaco=$request->cansaco;
            $examecovidnovo->tosse=$request->tosse;
            $examecovidnovo->dordecabeca=$request->dordecabeca;
            $examecovidnovo->malestargeral=$request->malestargeral;
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

    // Rota GET /Atendimento/{atendimentoid}/Examegeral/{examegeralid}
    public function findExamegeralByAtendimentoIdAndExamegeralId($atendimentoid, $examegeralid){
        //$atendimentos=Atendimento::with('paciente')->with('examegerals')->where([['pacienteid',$pacienteid],['id',$atendimentoid]])->rightJoin()->get();
        $examegerals=Examegeral::with('atendimento.paciente')->where([['examegeral.id',$examegeralid],['examegeral.atendimentoid',$atendimentoid]])->leftJoin('atendimento', 'examegeral.atendimentoid','=','atendimento.id')->leftJoin('paciente','atendimento.pacienteid','=','paciente.id')->select('examegeral.*')->get(); //se quiser menos dados é só colocar . na string do select e selecionar a propriedade
        return response()->json($examegerals);
    }

    // Rota POST /Atendimento/{atendimentoid}/Examegeral/{examegeralid}
    //finaliza examegeral(concluido=true)
    public function updateExamegeralByAtendimentoIdAndExamegeralId(Request $request,$atendimentoid,$examegeralid){
        try{
            $examegerals=Examegeral::where([['examegeral.atendimentoid',$atendimentoid],['examegeral.id',$examegeralid]])->leftJoin('atendimento', 'examegeral.atendimentoid','=','atendimento.id')->leftJoin('paciente','atendimento.pacienteid','=','paciente.id')->select('examegeral.*')->get(); //se quiser menos dados é só colocar . na string do select e selecionar a propriedade
            $examegeraldb=$examegerals[0];
            $examegeraldb->pressaosistolica=$request->pressaosistolica;
            $examegeraldb->pressaodiastolica=$request->pressaodiastolica;
            $examegeraldb->pulsacao=$request->pulsacao;
            $examegeraldb->respiracao=$request->respiracao;
            $examegeraldb->temperatura=$request->temperatura;
            $examegeraldb->concluido = true;
            return response()->json($examegeraldb->save()>0);
        }
        catch(exception $ex){

        }
        return response()->json(false);
    }

    // Rota GET /Atendimento/{atendimentoid}/Examecovid/{examecovidid}
    public function findExamecovidByAtendimentoIdAndExamecovidId($pacienteid, $atendimentoid, $examecovidid){
        $examecovids=Examecovid::with('atendimento.paciente')->where([['examecovid.id',$examecovidid],['examecovid.atendimentoid',$atendimentoid]])->leftJoin('atendimento', 'examecovid.atendimentoid','=','atendimento.id')->leftJoin('paciente','atendimento.pacienteid','=','paciente.id')->select('examecovid.*')->get(); //se quiser menos dados é só colocar . na string do select e selecionar a propriedade
        return response()->json($examecovids);
    }
    
    // Rota POST /Atendimento/{atendimentoid}/Examecovid/{examecovidid}
    //finaliza examecovid(concluido=true)
    public function updateExamecovidByAtendimentoIdAndExamecovidid(Request $request, $atendimentoid,$examecovidid){
        try{
            $examecovids=Examecovid::where([['examecovid.id',$examecovidid],['examecovid.atendimentoid',$atendimentoid]])->leftJoin('atendimento', 'examegeral.atendimentoid','=','atendimento.id')->leftJoin('paciente','atendimento.pacienteid','=','paciente.id')->select('examegeral.*')->get(); //se quiser menos dados é só colocar . na string do select e selecionar a propriedade
            $examecoviddb=$examecovids[0];
            $examecoviddb->febre=$request->febre;
            $examecoviddb->coriza=$request->coriza;
            $examecoviddb->narizentupido=$request->narizentupido;
            $examecoviddb->cansaco=$request->cansaco;
            $examecoviddb->tosse=$request->tosse;
            $examecoviddb->dordecabeca=$request->dordecabeca;
            $examecoviddb->malestargeral=$request->malestargeral;
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

        }
        return response()->json(false);
    }
    
    /*
    public function delete(Request $request, $atendimentoid){
        $atendimentodb = Atendimento::findOrFail($atendimentoid);
        return response()->json($atendimentoid->delete()>0);
    }
    */    
}
