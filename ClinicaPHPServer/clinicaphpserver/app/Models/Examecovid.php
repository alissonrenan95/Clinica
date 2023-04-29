<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Examecovid
 * 
 * @property int $id
 * @property int $atendimentoid
 * @property bool $febre
 * @property bool $coriza
 * @property bool $narizentupido
 * @property bool $cansaco
 * @property bool $tosse
 * @property bool $dordecabeca
 * @property bool $doresnocorpo
 * @property bool $malestargeral
 * @property bool $dordegarganta
 * @property bool $dificuldadederespirar
 * @property bool $faltadepaladar
 * @property bool $faltadeolfato
 * @property bool $dificuldadedelocomocao
 * @property bool $diarreia
 * @property bool|null $concluido
 * 
 * @property Atendimento $atendimento
 *
 * @package App\Models
 */
class Examecovid extends Model
{
	protected $table = 'examecovid';
	public $timestamps = false;

	protected $casts = [
		'atendimentoid' => 'int',
		'febre' => 'bool',
		'coriza' => 'bool',
		'narizentupido' => 'bool',
		'cansaco' => 'bool',
		'tosse' => 'bool',
		'dordecabeca' => 'bool',
		'doresnocorpo' => 'bool',
		'malestargeral' => 'bool',
		'dordegarganta' => 'bool',
		'dificuldadederespirar' => 'bool',
		'faltadepaladar' => 'bool',
		'faltadeolfato' => 'bool',
		'dificuldadedelocomocao' => 'bool',
		'diarreia' => 'bool',
		'concluido' => 'bool'
	];

	protected $fillable = [
		'atendimentoid',
		'febre',
		'coriza',
		'narizentupido',
		'cansaco',
		'tosse',
		'dordecabeca',
		'doresnocorpo',
		'malestargeral',
		'dordegarganta',
		'dificuldadederespirar',
		'faltadepaladar',
		'faltadeolfato',
		'dificuldadedelocomocao',
		'diarreia',
		'concluido'
	];

	public function atendimento()
	{
		return $this->belongsTo(Atendimento::class, 'atendimentoid');
	}
}
