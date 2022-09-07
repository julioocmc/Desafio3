const PORT = process.env.PORT || 8080
const fs = require("fs");

const express = require("express");
const app = express();


class Contenedor { //obtener todos los productos
    async getAll() {
        try {
            const contenido = await fs.promises.readFile("./productos.txt", "utf-8");
            console.log(contenido);
            return JSON.parse(contenido);
        } catch (error) {}
    }
    async getById (id) { //obtener productos mediante id
        const contenido = await this.getAll();
        const productoBuscado = contenido.filter((producto) => producto.id == id);
        console.log(productoBuscado)
        return productoBuscado;
    }
    async getProductRandom() {
        try {
            const contenido = await this.getAll();
            const productRandom = contenido [Math.floor(Math.random() * contenido.lenght)]
            return productRandom
        } catch (error) {}
    }
}

const contenedor = new Contenedor();

const server = app.listen(PORT, () =>{
    console.log("servidor iniciado");

});

app.get("/productos", (req, resp) => {
    contenedor.getAll().then(respuesta => resp.send(respuesta));
});

app.get("/productoRandom", async (req, resp) =>{
    contenedor.getProductRandom().then((product) => resp.send(product))
});

app.get ("*", async (req, resp)=>{
    resp.send('Ir a <a href="./productos">Productos</a> \n Ir a <a href="./productoRandom">Producto Random</a>')
})