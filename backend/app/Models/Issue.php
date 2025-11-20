<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Issue extends Model
{
    use HasFactory;

    protected $table = 'issues';
    protected $primaryKey = 'issue_id';
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = [
        'area_id',
        'category',
        'description',
        'status',
        'reported_by',
        'location',
    ];
}