<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\models\Paciente;
use App\models\Atendimento;
use App\models\Examegeral;
use App\models\Examecovid;

class PacienteController extends Controller
{
    // Rota GET /Paciente
    public function findAll(){
        $pacientes=Paciente::orderBy('nome','ASC')->get();
        //return ['pacientes'=>$pacientes];
        //return response($pacientes, 200, ['Content-Type => application/json']);
        return response()->json($pacientes);
    }

    // Rota POST /Paciente
    public function create(Request $request){
        $pacientenovo=new Paciente;
        $pacientenovo->cpf=$request->cpf;
        $pacientenovo->nome=$request->nome;
        $pacientenovo->datanascimento=$request->datanascimento;
        $pacientenovo->telefone=$request->telefone;
        $pacientenovo->urlimagem=$request->cpf.'.png';
        return response()->json($pacientenovo->save()>0);
    }

    // Rota GET /Paciente/cpf/{cpf}
    public function findPacienteByCpf($cpf){
        $pacientes=Paciente::where('cpf',$cpf)->get();
        return response()->json($pacientes);
    }

    // Rota GET /Paciente/{pacienteid}
    public function findPacienteById($pacienteid){
        $pacientedb = Paciente::where('id',$pacienteid)->get();
        return response()->json($pacientedb);
    }

    // Rota POST /Paciente/{pacienteid}
    public function update(Request $request, $pacienteid){
        $pacientedb = Paciente::where('cpf',$cpf)->get()[0];
        $pacientedb->cpf=$request->cpf;
        $pacientedb->nome=$request->nome;
        $pacientedb->datanascimento=$request->datanascimento;
        $pacientedb->telefone=$request->telefone;
        $pacientedb->urlimagem=$request->cpf.'.png';
        return response()->json($pacientedb->save()>0);
    }
    
    // Rota GET /Paciente/{pacienteid}/Atendimento
    public function findAtendimentosByPacienteId($pacienteid){
        $atendimentos=Atendimento::with('paciente')->where('pacienteid',$pacienteid)->get();
        return response()->json($atendimentos);
    }

    // Rota POST /Paciente/{pacienteid}/Atendimento
    public function createAtendimentoByPaciente(Request $request, $pacienteid){
        $atendimentos=Atendimento::where([['concluido',false],['pacienteid', $pacienteid]])->get();
        try{
            if($atendimentos->isEmpty() AND $pacienteid==$request->pacienteid){
                $atendimentonovo=new Atendimento;
                $atendimentonovo->pacienteid=$request->pacienteid;
                $atendimentonovo->datahoraatendimento=new \DateTime('now',new \DateTimeZone('America/Sao_Paulo'));
                $atendimentonovo->concluido=false;
                return response()->json($atendimentonovo->save()>0);
            }
        }
        catch(exception $ex){

        }
        return response()->json(false);
    }

    // Rota GET /Paciente/{pacienteid}/Atendimento/{atendimentoid}
    public function findAtendimentoByPacienteIdAndAtendimentoId($pacienteid, $atendimentoid){
        $atendimentos=Atendimento::with('paciente')->where([['pacienteid',$pacienteid],['id',$atendimentoid]])->orderBy('datahoraatendimento','desc')->get();
        return response()->json($atendimentos);
    }
    
    // Rota POST /Paciente/{pacienteid}/Atendimento/{atendimentoid}
    //finaliza atendimento
    public function updateAtendimentoByPacienteIdAndAtendimentoId($pacienteid,$atendimentoid){
        try{
            $atendimentodb = Atendimento::where([['pacienteid',$pacienteid],['id',$atendimentoid]])->get();
            $atendimentoidreqbody=$request->atendimentoid;
            if($atendimentoidreqbody==$atendimentoid){
                $atendimentodb->concluido=true;
                return response()->json($atendimentodb->save()>0);
            }
        }
        catch(exception){

        }
        return response()->json(false);
    }

    // Rota GET /Paciente/{pacienteid}/Atendimento/{atendimentoid}/Examegeral
    public function findExamegeralByPacienteIdAndAtendimentoId($pacienteid, $atendimentoid){
        $examegerals=Examegeral::with('atendimento.paciente')->where([['examegeral.atendimentoid',$atendimentoid],['atendimento.pacienteid',$pacienteid]])->leftJoin('atendimento', 'examegeral.atendimentoid','=','atendimento.id')->leftJoin('paciente','atendimento.pacienteid','=','paciente.id')->select('examegeral.*')->get(); //se quiser menos dados é só colocar . na string do select e selecionar a propriedade
        return response()->json($examegerals);
    }

    // Rota POST /Paciente/{pacienteid}/Atendimento/{atendimentoid}/Examegeral
    //cria examegeral finalizado(concluido=true)
    public function createExamegeralByFuncionarioIdAndAtendimentoId(Request $request, $pacienteid, $atendimentoid,$examegeralid){
        try{
            $atendimentos=Atendimento::with('paciente')->where([['pacienteid',$pacienteid],['id',$atendimentoid]])->get();
            //caso queira bloquear novos exames enquanto houver algum pendente do usuário, verificar se a variavel abaixo de exames geral pendentes está vazia
            //$examegeralspendentedb=Examegeral::with('atendimento.paciente')->where([['examegeral.id',$examegeralid],['examegeral.atendimentoid',$atendimentoid],['atendimento.pacienteid',$pacienteid],['concluido',false]])->leftJoin('atendimento', 'examegeral.atendimentoid','=','atendimento.id')->leftJoin('paciente','atendimento.pacienteid','=','paciente.id')->select('examegeral.*')->get(); //se quiser menos dados é só colocar . na string do select e selecionar a propriedade
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
   
    // Rota GET /Paciente/{pacienteid}/Atendimento/{atendimentoid}/Examecovid
    public function findExamecovidByPacienteIdAndAtendimentoId($pacienteid, $atendimentoid){
        $examecovids=Examecovid::with('atendimento.paciente')->where([['examecovid.atendimentoid',$atendimentoid],['atendimento.pacienteid',$pacienteid]])->leftJoin('atendimento', 'examecovid.atendimentoid','=','atendimento.id')->leftJoin('paciente','atendimento.pacienteid','=','paciente.id')->select('examecovid.*')->get(); //se quiser menos dados é só colocar . na string do select e selecionar a propriedade
        return response()->json($examecovids);
    }
    
    // Rota POST /Paciente/{pacienteid}/Atendimento/{atendimentoid}/Examecovid
    //cria examecovid finalizado(concluido=true)
    public function createExamecovidByFuncionarioIdAndAtendimentoId(Request $request, $pacienteid, $atendimentoid){
        try{
            $atendimentos=Atendimento::with('paciente')->where([['pacienteid',$pacienteid],['id',$atendimentoid]])->get();
            //caso queira bloquear novos exames enquanto houver algum pendente do usuário, verificar se a variavel abaixo de exames de covid pendentes está vazia
            //$examecovidspendentedb=Examecovid::with('atendimento.paciente')->where([['examecovid.id',$examecovidid],['examecovid.atendimentoid',$atendimentoid],['atendimento.pacienteid',$pacienteid],['concluido',false]])->leftJoin('atendimento', 'examecovid.atendimentoid','=','atendimento.id')->leftJoin('paciente','atendimento.pacienteid','=','paciente.id')->select('examecovid.*')->get(); //se quiser menos dados é só colocar . na string do select e selecionar a propriedade
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

    //Rota GET /Paciente/{pacienteid}/Atendimento/{atendimentoid}/Examegeral/{examegeralid}
    public function findExamegeralByPacienteIdAndAtendimentoIdAndExamegeralId($pacienteid, $atendimentoid, $examegeralid){
        //$atendimentos=Atendimento::with('paciente')->with('examegerals')->where([['pacienteid',$pacienteid],['id',$atendimentoid]])->rightJoin()->get();
        $examegerals=Examegeral::with('atendimento.paciente')->where([['examegeral.id',$examegeralid],['examegeral.atendimentoid',$atendimentoid],['atendimento.pacienteid',$pacienteid]])->leftJoin('atendimento', 'examegeral.atendimentoid','=','atendimento.id')->leftJoin('paciente','atendimento.pacienteid','=','paciente.id')->select('examegeral.*')->get(); //se quiser menos dados é só colocar . na string do select e selecionar a propriedade
        return response()->json($examegerals);
    }

    // Rota POST /Paciente/{pacienteid}/Atendimento/{atendimentoid}/Examegeral/{examegeralid}
    //finaliza examegeral(concluido=true)
    public function updateExamegeralByFuncionarioIdAndAtendimentoIdAndExamegeralid(Request $request, $pacienteid, $atendimentoid,$examegeralid){
        try{
            $examegerals=Examegeral::where([['examegeral.id',$examegeralid],['examegeral.atendimentoid',$atendimentoid],['atendimento.pacienteid',$pacienteid]])->leftJoin('atendimento', 'examegeral.atendimentoid','=','atendimento.id')->leftJoin('paciente','atendimento.pacienteid','=','paciente.id')->select('examegeral.*')->get(); //se quiser menos dados é só colocar . na string do select e selecionar a propriedade
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

    // Rota GET /Paciente/{pacienteid}/Atendimento/{atendimentoid}/Examecovid/{examecovidid}
    public function findExamecovidByPacienteIdAndAtendimentoIdAndExamecovidId($pacienteid, $atendimentoid, $examecovidid){
        $examecovids=Examecovid::with('atendimento.paciente')->where([['examecovid.id',$examecovidid],['examecovid.atendimentoid',$atendimentoid],['atendimento.pacienteid',$pacienteid]])->leftJoin('atendimento', 'examecovid.atendimentoid','=','atendimento.id')->leftJoin('paciente','atendimento.pacienteid','=','paciente.id')->select('examecovid.*')->get(); //se quiser menos dados é só colocar . na string do select e selecionar a propriedade
        return response()->json($examecovids);
    }
    
    // Rota POST /Paciente/{pacienteid}/Atendimento/{atendimentoid}/Examecovid/{examecovidid}
    //finaliza examecovid(concluido=true)
    public function updateExamecovidByPacienteIdAndAtendimentoIdAndExamecovidid(Request $request, $pacienteid, $atendimentoid,$examecovidid){
        try{
            $examecovids=Examecovid::with('atendimento.paciente')->where([['examecovid.id',$examecovidid],['examecovid.atendimentoid',$atendimentoid],['atendimento.pacienteid',$pacienteid]])->leftJoin('atendimento', 'examegeral.atendimentoid','=','atendimento.id')->leftJoin('paciente','atendimento.pacienteid','=','paciente.id')->select('examegeral.*')->get(); //se quiser menos dados é só colocar . na string do select e selecionar a propriedade
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


    
    
    

    

    





    //Não mapeada
    public function delete(Request $request, $pacienteid){
        $pacientedb = Paciente::findOrFail($pacienteid);
        return response()->json($pacientedb->delete()>0);
    }
}
