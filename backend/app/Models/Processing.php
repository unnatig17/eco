<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Processing extends Model
{
    use HasFactory;

    protected $table = 'processing';
    protected $primaryKey = 'processing_id';
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = [
        'waste_classification_id',
        'processing_method',
        'processing_description',
        'cost',
    ];
}
