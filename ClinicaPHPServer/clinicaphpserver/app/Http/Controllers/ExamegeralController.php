<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\models\Atendimento;
use App\models\Examegeral;

class ExamegeralController extends Controller
{
    // Rota GET /Examegeral
    public function findAll(){
        $examegerals=Examegeral::with('atendimento')->get();
        return response()->json($examegerals);
    }

    // Rota POST /Examegeral
    //cria examegeral finalizado(concluido=true)
    public function create(Request $request){
        try{
            $atendimentos=Atendimento::where(['id',$request->$atendimentoid])->get();
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

    // Rota GET /Examegeral/{examegeralid}
    public function findExamegeralById($examegeralid){
        $examegeraldb = Examegeral::with('atendimento')->where('id',$examegeralid)->get();
        return response()->json($examegeraldb);
    }

    // Rota POST /Examegeral/{examegeralid}
    //finaliza examegeral(concluido=true)
    public function update(Request $request,$examegeralid){
        try{
            $examegerals=Examegeral::where([['examegeral.atendimentoid',$request->atendimentoid],['examegeral.id',$examegeralid]])->leftJoin('atendimento', 'examegeral.atendimentoid','=','atendimento.id')->leftJoin('paciente','atendimento.pacienteid','=','paciente.id')->select('examegeral.*')->get(); //se quiser menos dados é só colocar . na string do select e selecionar a propriedade
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
    

    
}
