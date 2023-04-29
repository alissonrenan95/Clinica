<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Paciente
 * 
 * @property int $id
 * @property int $cpf
 * @property string $nome
 * @property Carbon $datanascimento
 * @property int $telefone
 * @property string $urlimagem
 * 
 * @property Collection|Atendimento[] $atendimentos
 *
 * @package App\Models
 */
class Paciente extends Model
{
	protected $table = 'paciente';
	public $timestamps = false;

	protected $casts = [
		'cpf' => 'int',
		'datanascimento' => 'datetime',
		'telefone' => 'int'
	];

	protected $fillable = [
		'cpf',
		'nome',
		'datanascimento',
		'telefone',
		'urlimagem'
	];

	public function atendimentos()
	{
		return $this->hasMany(Atendimento::class, 'pacienteid');
	}
}
