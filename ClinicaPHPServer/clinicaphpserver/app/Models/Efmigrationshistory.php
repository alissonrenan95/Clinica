<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Efmigrationshistory
 * 
 * @property string $MigrationId
 * @property string $ProductVersion
 *
 * @package App\Models
 */
class Efmigrationshistory extends Model
{
	protected $table = '__efmigrationshistory';
	protected $primaryKey = 'MigrationId';
	public $incrementing = false;
	public $timestamps = false;

	protected $fillable = [
		'ProductVersion'
	];
}
