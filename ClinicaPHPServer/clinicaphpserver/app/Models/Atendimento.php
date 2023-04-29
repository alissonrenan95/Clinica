<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Atendimento
 * 
 * @property int $id
 * @property int $pacienteid
 * @property Carbon $datahoraatendimento
 * @property bool $concluido
 * 
 * @property Paciente $paciente
 * @property Collection|Examecovid[] $examecovids
 * @property Collection|Examegeral[] $examegerals
 *
 * @package App\Models
 */
class Atendimento extends Model
{
	protected $table = 'atendimento';
	public $timestamps = false;

	protected $casts = [
		'pacienteid' => 'int',
		'datahoraatendimento' => 'datetime',
		'concluido' => 'bool'
	];

	protected $fillable = [
		'pacienteid',
		'datahoraatendimento',
		'concluido'
	];

	public function paciente()
	{
		return $this->belongsTo(Paciente::class, 'pacienteid');
	}

	public function examecovids()
	{
		return $this->hasMany(Examecovid::class, 'atendimentoid');
	}

	public function examegerals()
	{
		return $this->hasMany(Examegeral::class, 'atendimentoid');
	}
}
