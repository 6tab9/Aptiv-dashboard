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
        },
        deList2: function (list) {
            let delistedList = ""
            list.map(el=>{
                delistedList+=el.name+"\n"
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
    console.log(req.query.id)
})
app.get("/chart", function(req,res){
    res.render('chart.hbs', {id:req.query.id});
})
app.use(express.static('static'))
app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT )
})