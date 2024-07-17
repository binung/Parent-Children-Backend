<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChildData extends Model
{
    use HasFactory;

    protected $fillable = ['child_id', 'apps', 'sites'];
}
