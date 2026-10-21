<?php

use Illuminate\Support\Facades\Route;

// Hybrid Laravel + Vue: Serve main SPA shell for all non-API web routes
Route::get('/{any?}', function () {
    return view('app');
})->where('any', '^(?!api).*$');
