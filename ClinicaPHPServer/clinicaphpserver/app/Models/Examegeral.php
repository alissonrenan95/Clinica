<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Examegeral
 * 
 * @property int $id
 * @property int $atendimentoid
 * @property int $pressaosistolica
 * @property int $pressaodiastolica
 * @property int $pulsacao
 * @property int $respiracao
 * @property float $temperatura
 * @property bool $concluido
 * 
 * @property Atendimento $atendimento
 *
 * @package App\Models
 */
class Examegeral extends Model
{
	protected $table = 'examegeral';
	public $timestamps = false;

	protected $casts = [
		'atendimentoid' => 'int',
		'pressaosistolica' => 'int',
		'pressaodiastolica' => 'int',
		'pulsacao' => 'int',
		'respiracao' => 'int',
		'temperatura' => 'float',
		'concluido' => 'bool'
	];

	protected $fillable = [
		'atendimentoid',
		'pressaosistolica',
		'pressaodiastolica',
		'pulsacao',
		'respiracao',
		'temperatura',
		'concluido'
	];

	public function atendimento()
	{
		return $this->belongsTo(Atendimento::class, 'atendimentoid');
	}
}
