const express = require("express")
const server = express()

const ideas = [
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729007.svg",
        title: "Curso de Programação",
        category: "Estudo",
        description: " Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
        url: "https://www.softblue.com.br/",
    },

    {
        img: "https://image.flaticon.com/icons/svg/2729/2729005.svg",
        title: "Exercícios",
        category: "Saúde",
        description: " Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
        url: "https://saude.abril.com.br/fitness/coronavirus-12-exercicios-para-fazer-em-casa-durante-o-isolamento-social/",
    },

    {
        img: "https://image.flaticon.com/icons/svg/2729/2729027.svg",
        title: "Meditação",
        category: "Tranquilidade",
        description: " Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
        url: "https://gnosisbrasil.com/introducao-a-meditacao/",
    },

    {
        img: "https://image.flaticon.com/icons/svg/2729/2729001.svg",
        title: "Livros",
        category: "Leitura",
        description: " Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
        url: "https://casavogue.globo.com/LazerCultura/Livros/noticia/2020/03/10-livros-para-ler-durante-quarentena.html",
    }
]

// configurando arquivos estatico(css)
server.use(express.static("public"))

//configuração do nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server,
    noCache: true, //bollean
})

// rota "/"
server.get("/", function(req, res){

    // const reversedIdeas = [...ideas].slice(2);

    // let lastIdeas = []
    // for (let idea of reversedIdeas ) {
    //     if ( lastIdeas.length < 2 ) {
    //         lastIdeas.push(idea)
    //     }
    // }

    return res.render("index.html", { ideas: [...ideas].slice(2) });
})

server.get("/ideias", function(req, res) {
    return res.render("ideias.html", { ideas: [...ideas].reverse() })
})

// ligando servidor
server.listen(3000)