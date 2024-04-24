const express = require("express")
const app = express()
const PORT = 3000;
const path = require("path")
const hbs = require('express-handlebars');
app.set('views', path.join(__dirname, 'views'));         // ustalamy katalog views
app.engine('hbs', hbs.engine({ defaultLayout: 'main.hbs', extname: '.hbs', partialsDir: "views/partials",
helpers: {         
        deList: function (list) {
            let delistedList = ""
            list.map(el=>{
                delistedList+=el+"\n"
            })
            return delistedList
        }
    }
}));   // domyślny layout, potem można go zmienić
app.set('view engine', 'hbs');                           // określenie nazwy silnika szablonów

const context = [
    {id:0,project:["BMW CP60 MPAD"],po:["Ga, Sindhu"],swle5:["CP60_High 100%","CP60_Addon 100%","G70_TAF 100%"],swle6:["Only SW integration tests planned for project"],results:["Pass 99.8%; Fall 0.2%: Skip 0%","Pass 99.8%; Fall 0.2%: Skip 0%","Pass 99.8%; Fall 0.2%: Skip 0%"]},
    {id:1,project:["BMW CP60 MPAD"],po:["Ga, Sindhu","Novac, Woychyeh"],swle5:["CP60_High 100%","CP60_Addon 100%","G70_TAF 100%"],swle6:["Only SW integration tests planned for project"],results:["Pass 99.8%; Fall 0.2%: Skip 0%","Pass 99.8%; Fall 0.2%: Skip 0%","Pass 99.8%; Fall 0.2%: Skip 0%"]},
    {id:2,project:["BMW CP60 MPAD"],po:["Ga, Sindhu"],swle5:["CP60_High 100%","CP60_Addon 100%","G70_TAF 100%"],swle6:["Only SW integration tests planned for project"],results:["Pass 99.8%; Fall 0.2%: Skip 0%","Pass 99.8%; Fall 0.2%: Skip 0%","Pass 99.8%; Fall 0.2%: Skip 0%"]},
]

const context2 = [
    {
        id:0,
        swle5:
            {
                tbr:"0",
                ir:"0",
                accepted:"2778",
                nt:"495",
                tip:"3273",
                tnot:"1099",
                npoat:"1099 / 100%",
                npomt:"0 / 0%",
                paccepted:"100%",
                ptotal:"100%"
            },
        swle6:
            {
                tbr:"0",
                ir:"0",
                accepted:"2778",
                nt:"495",
                tip:"3273",
                tnot:"1099",
                npoat:"1099 / 100%",
                npomt:"0 / 0%",
                paccepted:"100%",
                ptotal:"100%"
            },
    },
    {
        id:1,
        swle5:
            {
                tbr:"0",
                ir:"0",
                accepted:"2778",
                nt:"495",
                tip:"3273",
                tnot:"1099",
                npoat:"1099 / 100%",
                npomt:"0 / 0%",
                paccepted:"100%",
                ptotal:"100%"
            },
        swle6:
            {
                tbr:"0",
                ir:"0",
                accepted:"2778",
                nt:"495",
                tip:"3273",
                tnot:"1099",
                npoat:"1099 / 100%",
                npomt:"0 / 0%",
                paccepted:"100%",
                ptotal:"100%"
            },
    }
]

app.get("/", function (req, res) {
    
    res.render('table.hbs', {element:context});   // nie podajemy ścieżki tylko nazwę pliku
})
app.get("/info", function (req, res) {
    let currcontext = {}
    context2.map(el=>{
        if(el.id==req.query.id)
            currcontext = el
    })
    console.log(currcontext,req.query.id)
    res.render('id.hbs', {context:currcontext});   // nie podajemy ścieżki tylko nazwę pliku
})
app.get("/chart", function(req,res){
    res.render('chart.hbs', {id:req.query.id});
})
app.use(express.static('static'))
app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT )
})