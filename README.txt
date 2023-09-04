para crear un nuevo usuario
url: http://localhost:3030/api/create-user
Post
json: { 
    "nombre": "example",
    "email": "user@example.com",
    "password": "example"
}
para loging 
login
POST
url:http://localhost:3030/api/login
json:
{ 
    "email": "user@example.com",
    "password": "example",
}

crear producto
POST
url: http://localhost:3030/api/create-product
JSON:
{  
    "email": "user@example.com",
    "password": "example",
    "nombre_producto": product_example
    "precio_producto": 7000,
    "cantidad_disponible":5,
    "fecha_de_ingreso": "yyyy-mm-dd"
}

actualizar producto
url: http://localhost:3030/api/update-product
JSON
{  	
    "email": "user@example.com",
    "password": "example",
    "nombre_producto": product_example
    "precio_producto": 7000,
    "cantidad_disponible":5,
    "fecha_de_ingreso": "yyyy-mm-dd"
}

eliminar producto
GET
url: http://localhost:3030/api/delete-product/Numero_de_lote


Obtener producto
GET
url: http://localhost:3030/api/product/Numero_de_lote

ver compras por usuario
GET
url: http://localhost:3030/api/compras