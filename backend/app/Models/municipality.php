<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class municipality extends Model
{
    //
}
Schema::create('municipality', function (Blueprint $table) {
    $table->dump_location_id();
    $table->location('location_name');
    $table->address('address_here')->nullable();
    $table->timestamps();
});
