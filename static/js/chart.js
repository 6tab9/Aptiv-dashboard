const cid = document.getElementById("myChart").classList.value
const xValues = [];
const yValues = [];
const yValues2 = [];
const parameters = [
        {
            id:0,
            value:50,
            value2:40,
            date:"27-01-2043"
        },
        {
            id:0,
            value:70,
            value2:35,
            date:"28-01-2043"
        },
        {
            id:0,
            value:85,
            value2:50,
            date:"58-01-2043"
        },
        {
            id:0,
            value:45,
            value2:51,
            date:"58-06-2043"
        },
        {
            id:0,
            value:65,
            value2:60,
            date:"58-09-2043"
        },
    ]

parameters.map(el=>{
    if(el.id==cid){
        yValues.push(el.value)
        yValues2.push(el.value2)
        xValues.push(el.date)
        console.log(cid)
    }
})

new Chart("myChart", {
type: "line",
data: {
    labels: xValues,
    datasets:[
        {
            data: yValues,
            label:"swe.5 test",
            fill:false,
            borderColor:'red'
        },
        {
            data: yValues2,
            label:"swe.5 test",
            fill:false,
            borderColor:'blue'
        }
]
},
options: {}
});