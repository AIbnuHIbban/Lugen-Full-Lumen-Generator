$(window).on('load',function(){
    $('#welcome').modal('show');
});

$('textarea').keypress(function(event) {
    if (event.keyCode == 13) {
        event.preventDefault();
        generate()
    }
});

function copyClipboard(jenis) {
    var clipboard = $(`#clipboard_${jenis}`);
    if (clipboard.text() === "") {
        Swal.fire(
            'Oopss..',
            `Please Fill In The Required Fields`,
            'error'
        )
    }else{
        clipboard.select();
        document.execCommand("copy");
        Swal.fire(
            'Copy To Clipboard!',
            `${jenis.charAt(0).toUpperCase() + jenis.substr(1)} Copied Successfully`,
            'success'
        )
    }
}

function example(){
    var table           = "Example"
    var res_model       = $('#result_models')
    var res_crud        = $('#result_crud')
    var res_migration   = $('#result_migration')
    var res_routes      = $('#result_routes')
    var cp_model        = $('#clipboard_models')
    var cp_crud         = $('#clipboard_crud')
    var cp_migration    = $('#clipboard_migration')
    var cp_routes       = $('#clipboard_routes')
    let kolom           = "'column1','column2','column3','column4','column5','column6','column7'"
    let validasi        = "'column1'        => 'required'"
    let data            = "'column1'        => $request->column1"
    let data_comment    = "// 'column1'        => $request->column1"
    let migrations      = "$table->string('column1')"
    res_model.text(`<?php
    
namespace App\\Models;
    
use Illuminate\\Database\\Eloquent\\Model;
    
class ${table} extends Model{
    protected $table = "${table.toLowerCase().replace(" ", "_")}";
    protected $fillable = [${kolom}];

    // public $timestamps = false;

    /**
     * Create by LeeNuksID :D
     *
     * Thanks For Using Laragen
     */
}`)
        res_crud.text(`<?php
    
namespace App\\Http\\Controllers;

use Illuminate\\Http\\Request;
use App\\${table};

class ${table}Controller extends Controller{

    public function index(){
        $data = ${table}::get();
        if(count($data) > 0){
            return response()->json([
                'status'    => 'success',
                'data'      => $data
            ]);
        }else{
            return response()->json([
                'status'    => 'failed',
                'data'      => null
            ]);
        }
    }
    public function store(Request $request){
        $this->validate($request, [
            ${validasi}
        ]);

        $send = ${table}::create([
            ${data}
        ]);

        // $send = ${table}::insert([
        ${data_comment}
        // ]);
        
        // $send = ${table}::create($request->all());

        if ($send) {
            return response()->json([
                'status'    => 'success',
                'pesan'     => 'Berhasil Menambah',
            ]);
        }
    }

    public function update(Request $request,$id){
        $this->validate($request, [
            ${validasi}
        ]);

        $${table.toLowerCase()} = ${table}::find($id);

        $array = [
            ${data}
        ];

        if ($${table.toLowerCase()}->update($array)) {
            return response()->json([
                'status'    => 'success',
                'pesan'     => 'Berhasil Mengubah',
            ]);
        }
    }

    public function destroy($id){
        $${table.toLowerCase()} = ${table}::find($id);
        if ($${table.toLowerCase()}->delete()) {
            return response()->json([
                'status'    => 'success',
                'pesan'     => 'Berhasil Menghapus',
            ]);
        }
    }
    
    /**
     * Create by LeeNuksID :D
     *
     * Thanks For Using Laragen
     */
}`)
        res_migration.text(`<?php
    
use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

class ${table} extends Migration{
    
    public function up(){
        Schema::create('${table.toLowerCase().replace(" ", "_")}', function (Blueprint $table) {
            $table->id();
            ${migrations}
            $table->timestamps();

            // Options: See More at https://laravel.com/docs/8.x/migrations#creating-columns
            // integer
            // bigInteger
            // binary
            // boolean
            // char
            // date
            // dateTime
            // decimal
            // double
            // enum('level', ['easy', 'hard']);
            // float
            // longText
        });
    }

    public function down(){
        Schema::dropIfExists('${table.toLowerCase().replace(" ", "_")}');
    }

    /**
     * Create by LeeNuksID :D
     *
     * Thanks For Using Laragen
     */
}`)
        res_routes.text(`<?php
    
use App\\Http\\Controllers\\${table}Controller;

$app->get('/', function() use ($app) {
    return $app->app->version();
});

$router->group(['prefix'=>'api/v1'], function() use($router){

    $router->get('${table.toLowerCase().replace(" ", "_")}', '${table}Controller@index');
    $router->post('${table.toLowerCase().replace(" ", "_")}', '${table}Controller@store');
    $router->put('${table.toLowerCase().replace(" ", "_")}/{id}', '${table}Controller@update');
    $router->delete('${table.toLowerCase().replace(" ", "_")}/{id}', '${table}Controller@destroy');

});`)
    
    cp_model.text('')
    cp_crud.text('')
    cp_migration.text('')
    cp_model.text(res_model.text())
    cp_crud.text(res_crud.text())
    cp_migration.text(res_migration.text())
    cp_routes.text(res_routes.text())
    list_column_val = "";
}

function generate(){
    var table           = $('#table_name')
    var list_column_val = $('#list_column').val()
    var list_column     = list_column_val.split(',')
    var res_model       = $('#result_models')
    var res_crud        = $('#result_crud')
    var res_migration   = $('#result_migration')
    var res_routes      = $('#result_routes')
    var cp_model        = $('#clipboard_models')
    var cp_crud         = $('#clipboard_crud')
    var cp_migration    = $('#clipboard_migration')
    var cp_routes       = $('#clipboard_routes')
    let kolom           = ""
    if (table.val() === "" || list_column_val === "") {
        Swal.fire(
            'Oopss..',
            `Please Fill In The Required Fields`,
            'error'
        )
    }else{
        for (let i = 0; i < list_column.length; i++) {
            if (i === list_column.length-1) {
                kolom += '"'+list_column[i]+'"'
            }else{
                kolom += '"'+list_column[i]+'",'
            }
        }
        let validasi           = ""
        for (let i = 0; i < list_column.length; i++) {
            if (i === list_column.length-1) {
                validasi += '"'+list_column[i]+'"         => "required"'
            }else{
                validasi += '"'+list_column[i]+'"         => "required",\n            '
            }
        }
        let data           = ""
        for (let i = 0; i < list_column.length; i++) {
            if (i === list_column.length-1) {
                data += `"${list_column[i]}"         => $request->${list_column[i]}`
            }else{
                data += `"${list_column[i]}"         => $request->${list_column[i]},\n            `
            }
        }
        let data_comment           = ""
        for (let i = 0; i < list_column.length; i++) {
            if (i === list_column.length-1) {
                data_comment += `//     "${list_column[i]}"         => $request->${list_column[i]}`
            }else{
                data_comment += `//     "${list_column[i]}"         => $request->${list_column[i]},\n        `
            }
        }
        let migrations           = ""
        for (let i = 0; i < list_column.length; i++) {
            if (i === list_column.length-1) {
                migrations += `$table->string('${list_column[i]}');`
            }else{
                migrations += `$table->string('${list_column[i]}');\n            `
            }
        }
        res_model.text(`<?php

namespace App\\Models;
    
use Illuminate\\Database\\Eloquent\\Model;
    
class ${table.val().charAt(0).toUpperCase() + table.val().substr(1)} extends Model{
    protected $table = "${table.val().toLowerCase().replace(" ", "_")}";

    protected $fillable = [${kolom}];

    // public $timestamps = false;

    /**
     * Create by LeeNuksID :D
     *
     * Thanks For Using Laragen
     */
}`)
        res_crud.text(`<?php
    
namespace App\\Http\\Controllers;

use Illuminate\\Http\\Request;
use App\\Models\\${table.val().charAt(0).toUpperCase() + table.val().substr(1)};

class ${table.val().charAt(0).toUpperCase() + table.val().substr(1)}Controller extends Controller{

    public function index(){
        $data = ${table.val().charAt(0).toUpperCase() + table.val().substr(1)}::get();
        if(count($data) > 0){
            return response()->json([
                'status'    => 'success',
                'pesan'     => 'berhasil',
                'data'      => $data
            ]);
        }else{
            return response()->json([
                'status'    => 'success',
                'pesan'     => 'Data Kosong',
                'data'      => null
            ]);
        }
    }
    public function store(Request $request){
        $this->validate($request, [
            ${validasi}
        ]);

        $send = ${table.val().charAt(0).toUpperCase() + table.val().substr(1)}::create([
            ${data}
        ]);

        // $send = ${table.val().charAt(0).toUpperCase() + table.val().substr(1)}::insert([
        ${data_comment}
        // ]);
        
        // $send = ${table.val().charAt(0).toUpperCase() + table.val().substr(1)}::create($request->all());


        if ($send) {
            return response()->json([
                'status'    => 'success',
                'pesan'     => 'Berhasil Menambah',
            ]);
        }
    }

    public function update(Request $request,$${table.val().toLowerCase()}){
        $this->validate($request, [
            ${validasi}
        ]);

        $${table.val().toLowerCase()} = ${table.val().charAt(0).toUpperCase() + table.val().substr(1)}::find($${table.val().toLowerCase()});

        $array = [
            ${data}
        ];

        if ($${table.val().toLowerCase()}->update($array)) {
            return response()->json([
                'status'    => 'success',
                'pesan'     => 'Berhasil Mengubah',
            ]);
        }
    }

    public function destroy($${table.val().toLowerCase()}){
        $${table.val().toLowerCase()} = ${table.val().charAt(0).toUpperCase() + table.val().substr(1)}::find($${table.val().toLowerCase()});
        if ($${table.val().toLowerCase()}->delete()) {
            return response()->json([
                'status'    => 'success',
                'pesan'     => 'Berhasil Menghapus',
            ]);
        }
    }
    
    /**
     * Create by LeeNuksID :D
     *
     * Thanks For Using Laragen
     */
}`)
        res_migration.text(`<?php
    
use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

class ${table.val().charAt(0).toUpperCase() + table.val().substr(1)} extends Migration{
    
    public function up(){
        Schema::create('${table.val().toLowerCase().replace(" ", "_")}', function (Blueprint $table) {
            $table->id();
            ${migrations}
            $table->timestamps();

            // Options: See More at https://laravel.com/docs/8.x/migrations#creating-columns
            // integer
            // bigInteger
            // binary
            // boolean
            // char
            // date
            // dateTime
            // decimal
            // double
            // enum('level', ['easy', 'hard']);
            // float
            // longText
        });
    }

    public function down(){
        Schema::dropIfExists('${table.val().toLowerCase().replace(" ", "_")}');
    }

    /**
     * Create by LeeNuksID :D
     *
     * Thanks For Using Laragen
     */
}`)
        res_routes.text(`<?php
    
$app->get('/', function() use ($app) {
    return $app->app->version();
});

$router->group(['prefix'=>'api/v1'], function() use($router){

    $router->get('${table.val().toLowerCase().replace(" ", "_")}', '${table.val().charAt(0).toUpperCase() + table.val().substr(1)}Controller@index');
    $router->post('${table.val().toLowerCase().replace(" ", "_")}', '${table.val().charAt(0).toUpperCase() + table.val().substr(1)}Controller@store');
    $router->put('${table.val().toLowerCase().replace(" ", "_")}/{id}', '${table.val().charAt(0).toUpperCase() + table.val().substr(1)}Controller@update');
    $router->delete('${table.val().toLowerCase().replace(" ", "_")}/{id}', '${table.val().charAt(0).toUpperCase() + table.val().substr(1)}Controller@destroy');

});`)
    
        cp_model.text('')
        cp_crud.text('')
        cp_migration.text('')
        cp_model.text(res_model.text())
        cp_crud.text(res_crud.text())
        cp_migration.text(res_migration.text())
        cp_routes.text(res_routes.text())
        list_column_val = "";
    }
}
