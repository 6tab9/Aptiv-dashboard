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
                if(el.name!=undefined)
                    delistedList+=el.name+"\n"
                else
                    delistedList+=el+"\n"
            })
            return delistedList
        }
    }
}));   // domyślny layout, potem można go zmienić
app.set('view engine', 'hbs');                           // określenie nazwy silnika szablonów

const context = require("C:\\Users\\yf6ch6\\jednak_express\\dane.json")

app.get("/", function (req, res) {
    
    res.render('table.hbs', {element:context});   // nie podajemy ścieżki tylko nazwę pliku
})
app.get("/info", function (req, res) {
    let swle5 = {
        "tbr":"XX",
        "ir":"XX",
        "accepted":"XX",
        "nt":"XX",
        "tip":"XX",
        "tnot":"XX",
        "npoat":"XX / XX %",
        "npomt":"XX / XX %",
        "paccepted":"XX %",
        "ptotal":"XX %"
    }
    let swle6 = {
        "tbr":"XX",
        "ir":"XX",
        "accepted":"XX",
        "nt":"XX",
        "tip":"XX",
        "tnot":"XX",
        "npoat":"XX / XX %",
        "npomt":"XX / XX %",
        "paccepted":"XX %",
        "ptotal":"XX %"
    }
    context.map(el=>{
        if(el.id==req.query.id&&req.query.pid.length>0){
            el.swle5.map(elem=>{
                if(elem.pid==req.query.pid){
                        swle5 = elem
                }
            })
            el.swle6.map(elem=>{
                if(elem.pid==req.query.pid){
                            swle6 = elem
                }
            })
        }
    })
    res.render('id.hbs',{swle5:swle5,swle6:swle6})
})
app.get("/chart", function(req,res){
    res.render('chart.hbs', {id:req.query.id});
})
app.use(express.static('static'))
app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT )
})