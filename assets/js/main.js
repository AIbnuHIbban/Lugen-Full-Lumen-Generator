$(window).on('load',function(){
    if (!hasOpen()) {
        $('#welcome').modal('show');
        sessionStorage.setItem('ban',true)
    }
});

function hasOpen() {
    if (sessionStorage.getItem('ban')) {
        return true
    }else{
        return false
    }
}

$('textarea').keypress(function(event) {
    if (event.keyCode == 13) {
        event.preventDefault();
        generate()
    }else if(event.keyCode === 71){
        formatter()
        return false
    }
});

function formatter() {
    let value   = $('#list_column').val()
    $('#list_column').val('')
    $('#list_column').val(value.replace(/\n/g,","))
    $('#list_column').val(value.replaceAll("'",""))
    $('#list_column').val(value.replaceAll('"',''))
}

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
    var res_transform   = $('#result_transofrm')
    var res_model       = $('#result_models')
    var res_crud        = $('#result_crud')
    var res_migration   = $('#result_migration')
    var res_routes      = $('#result_routes')
    var res_artisan     = $('#result_artisan')
    var cp_transform    = $('#clipboard_transform')
    var cp_model        = $('#clipboard_models')
    var cp_crud         = $('#clipboard_crud')
    var cp_migration    = $('#clipboard_migration')
    var cp_routes       = $('#clipboard_routes')
    var cp_artisan      = $('#clipboard_artisan')
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
    // protected $hashable = ['password'];

    protected $filterable = [${kolom}];

    /**
     * Create by LeeNuksID :D
     * Thanks For Using Laragen
     */
}`)

    res_transform.text(`<?php

namespace App\\Transformers;

use App\\Models\\${table};
use League\\Fractal\\TransformerAbstract;

class UserTransformer extends TransformerAbstract{
    /**
     * A Fractal transformer.
     *
     * @param  \\App\\Models\\${table}  $${table}
     * @return array
     */
    public function transform(${table} $${table}): array
    {
        return [
            'id'        => (int) $user->id,
            'name'      => (string) $user->name,
            'email'     => (string) $user->email,
            'no_hp'     => (string) $user->no_hp,
            'provinsi'  => (string) $user->provinsi,
            'kota'      => (string) $user->kota,
            'kecamatan' => (string) $user->kecamatan,
        ];
    }
}`)

    res_crud.text(`<?php
    
namespace App\\Http\\Controllers;

use Illuminate\\Http\\Request;
use App\\${table};
use Illuminate\\Validation\\ValidationException;
use Illuminate\\Http\\Response;
use App\\Transformers\\${table}Transformer;


class ${table}Controller extends Controller{

    public function index(){
        $data = ${table}::filter($request)->paginate($request->get('per_page', 20);
        $response = fractal($data, new ${table}Transformer())->toArray();
        return response()->json($users, Response::HTTP_OK);

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
        res_routes.text(`$router->get('${table.toLowerCase().replace(" ", "_")}', '${table}Controller@index');
    $router->post('${table.toLowerCase().replace(" ", "_")}', '${table}Controller@store');
    $router->put('${table.toLowerCase().replace(" ", "_")}/{id}', '${table}Controller@update');
    $router->delete('${table.toLowerCase().replace(" ", "_")}/{id}', '${table}Controller@destroy');`)

        res_artisan.text(`php artisan make:model ${table} -mrc
php artisan make:transformer ${table}
php artisan make:test ${table}
`)
    
    cp_transform.text('')
    cp_model.text('')
    cp_crud.text('')
    cp_migration.text('')
    cp_artisan.text('')
    cp_testing.text('')
    cp_transform.text(res_transform.text())
    cp_model.text(res_model.text())
    cp_crud.text(res_crud.text())
    cp_migration.text(res_migration.text())
    cp_routes.text(res_routes.text())
    cp_artisan.text(res_artisan.text())
    cp_testingartisan.text(res_testing.text())
    list_column_val = "";
}

function generate(){
    var table           = $('#table_name')
    var list_column_val = $('#list_column').val()
    var list_column     = list_column_val.split(',')
    var res_transform   = $('#result_transform')
    var res_model       = $('#result_models')
    var res_crud        = $('#result_crud')
    var res_testing     = $('#result_testing')
    var res_migration   = $('#result_migration')
    var res_routes      = $('#result_routes')
    var res_artisan     = $('#result_artisan')    
    var cp_transform    = $('#clipboard_transform')
    var cp_model        = $('#clipboard_models')
    var cp_crud         = $('#clipboard_crud')
    var cp_testing      = $('#clipboard_testing')
    var cp_migration    = $('#clipboard_migration')
    var cp_routes       = $('#clipboard_routes')
    var cp_artisan      = $('#clipboard_artisan')

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
                validasi += '"'+list_column[i]+'"         => "required",\n                '
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
        let transform             = ""
        for (let i = 0; i < list_column.length; i++) {
            if (i === list_column.length-1) {
                transform += `'${list_column[i]}'        => (string) $${table.val()}->${list_column[i]},`
            }else{
                transform += `'${list_column[i]}'        => (string) $${table.val()}->${list_column[i]},\n            `
            }
        }
        let testing               = ""
        for (let i = 0; i < list_column.length; i++) {
            if (i === list_column.length-1) {
                testing += `"${list_column[i]}"         => 'Test Value'`
            }else{
                testing += `"${list_column[i]}"         => 'Test Value',\n            `
            }
        }
        res_model.text(`<?php

namespace App\\Models;
    
use Illuminate\\Database\\Eloquent\\Model;
// use App\\Traits\\AttributeHashable;
use App\\Traits\\QueryFilterable;
    
class ${table.val().charAt(0).toUpperCase() + table.val().substr(1)} extends Model{
    use QueryFilterable;
    //  AttributeHashable, HasFactory;
    
    protected $table = "${table.val().toLowerCase().replace(" ", "_")}";

    protected $fillable = [${kolom}];

    // public $timestamps = false;
    // protected $hashable = ['password'];

    protected $filterable = [${kolom}];

    /**
     * Create by LeeNuksID :D
     * Thanks For Using Laragen
     */
}`)

    res_transform.text(`<?php

namespace App\\Transformers;

use App\\Models\\${table.val().charAt(0).toUpperCase() + table.val().substr(1)};
use League\\Fractal\\TransformerAbstract;

class ${table.val().charAt(0).toUpperCase() + table.val().substr(1)}Transformer extends TransformerAbstract{
    /**
     * A Fractal transformer.
     *
     * @param  \\App\\Models\\${table.val().charAt(0).toUpperCase() + table.val().substr(1)}  $${table.val()}
     * @return array
     */
    public function transform(${table.val().charAt(0).toUpperCase() + table.val().substr(1)} $${table.val()}): array{
        return [
            'id' => (int) $${table.val()}->id,
            ${transform}
        ];
    }
    
    /**
    * Create by LeeNuksID :D
    * Thanks For Using Laragen
    */
}`)

        res_crud.text(`<?php
    
namespace App\\Http\\Controllers;

use Illuminate\\Http\\Request;
use Illuminate\\Http\\JsonResponse;
use Illuminate\\Validation\\ValidationException;
use Illuminate\\Http\\Response;
use App\\Models\\${table.val().charAt(0).toUpperCase() + table.val().substr(1)};
use App\\Transformers\\${table.val().charAt(0).toUpperCase() + table.val().substr(1)}Transformer;

class ${table.val().charAt(0).toUpperCase() + table.val().substr(1)}Controller extends Controller{

    public function index(Request $request){
        if (isset($_GET['per_page']) || isset($_GET['page'])) {
            $${table.val()} = ${table.val().charAt(0).toUpperCase() + table.val().substr(1)}::paginate($request->get('per_page', 20));
        }else{
            $${table.val()} = ${table.val().charAt(0).toUpperCase() + table.val().substr(1)}::filter($request)->paginate($request->get('per_page', 20));
        }

        $fractal = fractal($${table.val()}, new ${table.val().charAt(0).toUpperCase() + table.val().substr(1)}Transformer())->toArray();

        return response()->json($fractal, Response::HTTP_OK);
    }

    public function index_id($id){
        $${table.val()} = ${table.val().charAt(0).toUpperCase() + table.val().substr(1)}::find($id);
        
        $fractal = fractal($${table.val()}, new ${table.val().charAt(0).toUpperCase() + table.val().substr(1)}Transformer())->toArray();
    
        return response()->json($fractal, Response::HTTP_OK);
    }

    public function store(Request $request){
        $this->validate($request, [
            ${validasi}
        ]);

        $attrs= $request->all();
        $${table.val()} = new ${table.val().charAt(0).toUpperCase() + table.val().substr(1)}($attrs);

        $${table.val()}->save();

        $fractal = fractal($${table.val()}, new ${table.val().charAt(0).toUpperCase() + table.val().substr(1)}Transformer())->toArray();
   
        return response()->json($fractal, Response::HTTP_CREATED);
    }

    public function update(Request $request, $id){
        $attrs    = $request->all();
        $${table.val()} = ${table.val().charAt(0).toUpperCase() + table.val().substr(1)}::findOrFail($id);
        $${table.val()}->fill($attrs);

        $changes = $${table.val()}->getDirty();
        $${table.val()}->save();

        $fractal = fractal($${table.val()}, new ${table.val().charAt(0).toUpperCase() + table.val().substr(1)}Transformer())->toArray();
    
        return response()->json($fractal, Response::HTTP_OK);
    }

    public function destroy($id){
        $${table.val()} = ${table.val().charAt(0).toUpperCase() + table.val().substr(1)}::findOrFail($id);

        $fractal = (bool) $${table.val()}->delete();

        return response()->json($fractal, Response::HTTP_OK);
    }
    
    /**
     * Create by LeeNuksID :D
     * Thanks For Using Laragen
     */
}`)

        res_testing.text(`<?php
class ${table.val().charAt(0).toUpperCase() + table.val().substr(1)}Test extends TestCase{
    /**
     * /${table.val()} [GET]
     */
    public function testShouldReturnAll${table.val().charAt(0).toUpperCase() + table.val().substr(1)}(){

        $this->get("v1/${table.val()}", []);
        $this->seeStatusCode(200);
        $this->seeJsonStructure([
            'data' => ['*' => "id",${kolom} ],
            'meta' => [
                '*' => [
                    'total',
                    'count',
                    'per_page',
                    'current_page',
                    'total_pages',
                    'links',
                ]
            ]
        ]);
        
    }

    /**
     * /${table.val()}/id [GET]
     */
    public function testShouldReturn${table.val().charAt(0).toUpperCase() + table.val().substr(1)}(){
        $this->get("v1/${table.val()}/1", []);
        $this->seeStatusCode(200);
        $this->seeJsonStructure(
            ['data' => "id",${kolom} ]
        );
        
    }

    /**
     * /${table.val()} [POST]
     */
    public function testShouldCreate${table.val().charAt(0).toUpperCase() + table.val().substr(1)}(){

        $parameters = [ 
            ${testing} 
        ];

        $this->post("v1/${table.val()}", $parameters, []);
        $this->seeStatusCode(201);
        $this->seeJsonStructure(
            ['data' => "id",${kolom} ]
        );
        
    }
    
    /**
     * /${table.val()}/id [PUT]
     */
    public function testShouldUpdate${table.val().charAt(0).toUpperCase() + table.val().substr(1)}(){

        $parameters = [ 
            ${testing} 
        ];

        $this->put("v1/${table.val()}/1", $parameters, []);
        $this->seeStatusCode(200);
        $this->seeJsonStructure(
            ['data' => "id",${kolom} ]    
        );
    }

    /**
     * /${table.val()}/id [DELETE]
     */
    public function testShouldDelete${table.val().charAt(0).toUpperCase() + table.val().substr(1)}(){
        
        $this->delete("v1/${table.val()}/1", [], []);
        $this->seeStatusCode(200);
    }

}`)

        res_migration.text(`<?php
    
use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

class Create${table.val().charAt(0).toUpperCase() + table.val().substr(1)}sTable extends Migration{
    
    public function up(){
        Schema::create('${table.val().toLowerCase().replace(" ", "_")}', function (Blueprint $table) {
            $table->id();
            ${migrations}
            $table->timestamps();
        });
    }

    public function down(){
        Schema::dropIfExists('${table.val().toLowerCase().replace(" ", "_")}');
    }

    /**
     * Create by LeeNuksID :D
     * Thanks For Using Laragen
     */
}`)
        res_routes.text(`$router->get('${table.val().toLowerCase().replace(" ", "_")}', '${table.val().charAt(0).toUpperCase() + table.val().substr(1)}Controller@index');
    $router->get('${table.val().toLowerCase().replace(" ", "_")}/{id}', '${table.val().charAt(0).toUpperCase() + table.val().substr(1)}Controller@index_id');
    $router->post('${table.val().toLowerCase().replace(" ", "_")}', '${table.val().charAt(0).toUpperCase() + table.val().substr(1)}Controller@store');
    $router->put('${table.val().toLowerCase().replace(" ", "_")}/{id}', '${table.val().charAt(0).toUpperCase() + table.val().substr(1)}Controller@update');
    $router->delete('${table.val().toLowerCase().replace(" ", "_")}/{id}', '${table.val().charAt(0).toUpperCase() + table.val().substr(1)}Controller@destroy');`)


        res_artisan.text(`php artisan make:model ${table.val().charAt(0).toUpperCase() + table.val().substr(1)} -mrc
php artisan make:transformer ${table.val().charAt(0).toUpperCase() + table.val().substr(1)}Transformer
php artisan make:test ${table.val().charAt(0).toUpperCase() + table.val().substr(1)}Test 

`)

    
        cp_transform.text('')
        cp_model.text('')
        cp_crud.text('')
        cp_migration.text('')
        cp_artisan.text('')
        cp_testing.text('')
        cp_transform.text(res_transform.text())        
        cp_model.text(res_model.text())
        cp_crud.text(res_crud.text())
        cp_migration.text(res_migration.text())
        cp_routes.text(res_routes.text())
        cp_artisan.text(res_artisan.text())
        cp_testing.text(res_testing.text())
        list_column_val = "";
    }
}
