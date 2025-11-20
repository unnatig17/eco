<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Compost extends Model
{
    use HasFactory;

    protected $table = 'compost';
    protected $primaryKey = 'compost_id';
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = [
        'area_id',
        'compost_type',
        'quantity_kg',
        'price_per_kg',
    ];
}
