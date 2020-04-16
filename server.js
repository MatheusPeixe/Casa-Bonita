const express = require("express")
const server = express()
const db =  require("./db")

// configurando arquivos estatico(css)
server.use(express.static("public"))
server.use(express.urlencoded({ extended: true}))

//configuração do nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server,
    noCache: true, //bollean
})

// rota "/"
server.get("/", function(req, res){

    db.all(`SELECT * FROM ideas`, function(err, rows) {
        if ( err) {
            console.log(err)
            return res.send("Erro no banco de Dados!")
        }

        const reversedIdeas = [...rows].reverse(2);

    let lastIdeas = []
        for (let idea of reversedIdeas ) {
            if ( lastIdeas.length < 2 ) {
                lastIdeas.push(idea)
        }
    }

    return res.render("index.html", {ideas: lastIdeas})
})
    })

server.get("/ideias", function(req, res){

    

    db.all(`SELECT * FROM ideas`, function(err, rows) {
        if ( err) {
            console.log(err)
            return res.send("Erro no banco de Dados!")
        }

        const reversedIdeas = [...rows].reverse()
        return res.render("ideias.html", {
            ideas: reversedIdeas,
            teste: () => { alert("ola") }
        })

    })
})

server.post("/", function(req, res){
    const query = `
    INSERT INTO ideas(
        image,
        title,
        category,
        description,
        link
    ) VALUES (?,?,?,?,?);
    `
    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link,
    ]

    //colocando dados na tablea
        db.run (query, values, function(err){
            if ( err) {
                console.log(err)
                return res.send("Erro no banco de Dados!")
            }

            return res.redirect("/ideias")
        })
})

server.delete("/:id", async (request, response) => {
    const id = request.params.id;
    await db.run(`DELETE FROM ideas WHERE id= ?`, [id], (err) => {
        if (err) {
            return console.log(err);
        }
    });
    response.send('deletado')
});

// ligando servidor
server.listen(3000)