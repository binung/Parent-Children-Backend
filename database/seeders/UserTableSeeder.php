<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            ['email' => 'test@email.com', 'name' => 'Parent', 'password' => Hash::make('123456789'), 'role_id' => 1, 'parent_email' => null],
            ['email' => 'testchild1@email.com', 'name' => 'testChild1', 'password' => Hash::make('123456789'), 'role_id' => 2, 'parent_email' => 'test@email.com'],
            ['email' => 'testchild2@email.com', 'name' => 'testChild2', 'password' => Hash::make('123456789'), 'role_id' => 2, 'parent_email' => 'test@email.com'],
            ['email' => 'testchild3@email.com', 'name' => 'testChild3', 'password' => Hash::make('123456789'), 'role_id' => 2, 'parent_email' => 'test@email.com']
        ]);
    }
}
