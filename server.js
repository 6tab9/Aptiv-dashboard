const express = require("express")
const app = express()
const PORT = 3000;
const path = require("path")
const hbs = require('express-handlebars');
const yaml = require('js-yaml');
const fs   = require('fs');
const swe = require("C:\\Users\\yf6ch6\\jednak_express\\swe.json") // pobieranie danych z json (z bazy danych)
let data //pobieranie danych z yamla
try {
  data = yaml.load(fs.readFileSync('C:\\Users\\yf6ch6\\jednak_express\\Book1.yaml', 'utf8'));
} catch (e) {
  console.log(e);
}
let context = []
zip() // łączenie jsona i yamla
app.set('views', path.join(__dirname, 'views'));         // ustalamy katalog views
app.engine('hbs', hbs.engine({ defaultLayout: 'main.hbs', extname: '.hbs', partialsDir: "views/partials",
helpers: {         
        deList: function (list) { //do wyświetlania rekordów
            let delistedList = ""
            if(list!=undefined){
                list.map(el=>{
                    if(el.name!=undefined)
                        delistedList+=el.name+"\n"
                    else
                        delistedList+=el+"\n"
                })
                return delistedList
            }

        },
        realName:function(fakeName){ //skracanie nazwy
            if(fakeName.includes(" ")){
                return fakeName.split(" ")[0]
            }
            else{
                return "Press"
            }
        }
    }
}));
app.set('view engine', 'hbs'); 


app.get("/", function (req, res) {
    res.render('table.hbs', {element:context});
})
app.get("/info", function (req, res) {

    let swe5 = { //domyślne testy gdyby baza była pusta
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
    let swe6 = {
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
    swe.map(el=>{ //wybieranie poprawnego rekordu
        if(el.id==req.query.id&&req.query.pid.length>0){
            el.swe5.map(elem=>{
                if(elem.pid==req.query.pid){
                        swe5 = elem
                }
            })
            el.swe6.map(elem=>{
                if(elem.pid==req.query.pid){
                            swe6 = elem
                }
            })
        }
    })
    res.render('id.hbs',{swe5:swe5,swe6:swe6})
})
app.get("/chart", function(req,res){
    res.render('chart.hbs', {id:req.query.id}); //chart nie działa
})

function zip(){
    data.map(el=>{
        if(swe[el.id]!=undefined){
            context.push(
                {
                    id:el.id,
                    project:el.project,
                    po:el.po,
                    swe5:swe[el.id].swe5,
                    swe6:swe[el.id].swe6,
                    results:el.results
                }
            )
        }
        else{
            context.push(
                {
                    id:el.id,
                    project:el.project,
                    po:el.po,
                    results:el.results
                }
            )
        }

    })
    console.log(context)
}



app.use(express.static('static'))
app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT )
})