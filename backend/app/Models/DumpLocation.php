<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DumpLocation extends Model
{
    use HasFactory;

    protected $table = 'dump_locations';
    protected $primaryKey = 'dump_location_id';
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = [
        'area_id',
        'location_name',
        'address',
        'latitude',
        'longitude',
    ];

    public function area()
    {
        return $this->belongsTo(Area::class, 'area_id', 'area_id');
    }
}
