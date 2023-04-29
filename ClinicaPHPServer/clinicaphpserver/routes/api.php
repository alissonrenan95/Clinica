<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PacienteController;
use App\Http\Controllers\AtendimentoController;
use App\Http\Controllers\ExamegeralController;
use App\Http\Controllers\ExamecovidController;
use App\Http\Controllers\RelatorioController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

/*

    As rotas estão padronizadas onde:
    - A primeira "palavra"(path) da url representa o controller da rota;
    - A ultima "palavra"(ultimo parte do path) ou parâmetro representam o retorno ou tipo de dado principal;
    - As rotas estão escritas conforme cada controller e na ordem rota <-> metodo controller
    - Todos as rotas com metodo post retornam um boolean em json(se operação afetar mais do que 0 linhas do banco de dados).

*/

//Rotas do controller Paciente
Route::get( '/Paciente', [PacienteController::class, 'findAll']);
Route::post('/Paciente', [PacienteController::class, 'create']);
Route::get( '/Paciente/cpf/{cpf}', [PacienteController::class, 'findPacienteByCpf']); //rota modificada do projeto principal para evitar conflitos(rota anterior /Paciente/cpf={cpf})
Route::get( '/Paciente/{pacienteid}', [PacienteController::class, 'findPacienteById']);
Route::post('/Paciente/{pacienteid}', [PacienteController::class, 'update']);
Route::get( '/Paciente/{pacienteid}/Atendimento',[PacienteController::class,'findAtendimentosByPacienteId']);
Route::post('/Paciente/{pacienteid}/Atendimento',[PacienteController::class,'createAtendimentoByPaciente']);
Route::get( '/Paciente/{pacienteid}/Atendimento/{atendimentoid}', [PacienteController::class,'findAtendimentoByPacienteIdAndAtendimentoId']);
Route::post('/Paciente/{pacienteid}/Atendimento/{atendimentoid}', [PacienteController::class,'updateAtendimentoByPacienteIdAndAtendimentoId']);
Route::get( '/Paciente/{pacienteid}/Atendimento/{atendimentoid}/Examegeral', [PacienteController::class,'findExamegeralByPacienteIdAndAtendimentoId']);
Route::post('/Paciente/{pacienteid}/Atendimento/{atendimentoid}/Examegeral', [PacienteController::class,'createExamegeralByPacienteIdAndAtendimentoId']);
Route::get( '/Paciente/{pacienteid}/Atendimento/{atendimentoid}/Examecovid', [PacienteController::class,'findExamecovidByPacienteIdAndAtendimentoId']);
Route::post('/Paciente/{pacienteid}/Atendimento/{atendimentoid}/Examecovid', [PacienteController::class,'createExamecovidByPacienteIdAndAtendimentoId']);
Route::get( '/Paciente/{pacienteid}/Atendimento/{atendimentoid}/Examegeral/{examegeralid}', [PacienteController::class,'findExamegeralByPacienteIdAndAtendimentoIdAndExamegeralId']);
Route::post('/Paciente/{pacienteid}/Atendimento/{atendimentoid}/Examegeral/{examegeralid}', [PacienteController::class,'updateExamegeralByPacienteIdAndAtendimentoIdAndExamegeralId']);
Route::get( '/Paciente/{pacienteid}/Atendimento/{atendimentoid}/Examecovid/{examecovidid}', [PacienteController::class,'findExamecovidByPacienteIdAndAtendimentoIdAndExamecovidId']);
Route::post('/Paciente/{pacienteid}/Atendimento/{atendimentoid}/Examecovid/{examecovidid}', [PacienteController::class,'updateExamecovidByPacienteIdAndAtendimentoIdAndExamecovidId']);


//Rotas do controller Atendimento
Route::get( '/Atendimento', [AtendimentoController::class, 'findAll']);
Route::post('/Atendimento', [AtendimentoController::class, 'create']);
Route::get( '/Atendimento/{atendimentoid}', [AtendimentoController::class, 'findAtendimentoById']);
Route::post('/Atendimento/{atendimentoid}', [AtendimentoController::class, 'update']);
Route::get( '/Atendimento/{atendimentoid}/Examegeral/',[AtendimentoController::class,'findExamegeralByAtendimentoId']);
Route::post('/Atendimento/{atendimentoid}/Examegeral/',[AtendimentoController::class,'createExamegeralByAtendimentoId']); //esta criando junto com atendimento
Route::get( '/Atendimento/{atendimentoid}/Examecovid/',[AtendimentoController::class,'findExamecovidByAtendimentoId']);
Route::post('/Atendimento/{atendimentoid}/Examecovid/',[AtendimentoController::class,'createExamecovidByAtendimentoId']); //esta criando junto com atendimento
Route::get( '/Atendimento/{atendimentoid}/Examegeral/{examegeralid}',[AtendimentoController::class,'findExamegeralByAtendimentoIdAndExamegeralId']);
Route::post('/Atendimento/{atendimentoid}/Examegeral/{examegeralid}',[AtendimentoController::class,'updateExamegeralByAtendimentoIdAndExamegeralId']);
Route::get( '/Atendimento/{atendimentoid}/Examecovid/{examecovidid}',[AtendimentoController::class,'findExamecovidByAtendimentoIdAndExamecovidId']);
Route::post('/Atendimento/{atendimentoid}/Examecovid/{examecovidid}',[AtendimentoController::class,'updateExamecovidByAtendimentoIdAndExamecovidId']);


//Rotas do controller Examegeral
Route::get( '/Examegeral',[ExamegeralController::class, 'findAll']);
Route::post('/Examegeral',[ExamegeralController::class, 'create']);
Route::get( '/Examegeral/{examegeralid}',[ExamegeralController::class,'findExamegeralById']);
Route::post('/Examegeral/{examegeralid}',[ExamegeralController::class,'update']);


//Rotas do controller Examecovid
Route::get( '/Examecovid',[ExamecovidController::class, 'findAll']);
Route::post('/Examecovid',[ExamecovidController::class, 'create']);
Route::get( '/Examecovid/{examecovidid}',[ExamecovidController::class,'findExamecovidById']);
Route::post('/Examecovid/{examecovidid}',[ExamecovidController::class,'update']);


//Rotas do controller Relatorio
//Route::get( '/Relatorio/MonitorExamecovid',[RelatorioController::class, 'findMonitorExamecovid']);