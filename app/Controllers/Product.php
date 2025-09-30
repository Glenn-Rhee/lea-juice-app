<?php
namespace App\Controllers;

use App\Controllers\BaseController;
use App\Libraries\Supabase;

class Product extends BaseController
{
    public function index()
    {
        $supabase = new Supabase();
        $products = $supabase->get('user');
        return view("product", ['products' => $products]);
    }
}