document.addEventListener("DOMContentLoaded", function(){

    let dateEl = document.getElementById("date");

    $.ajax({
        url: "http://date.jsontest.com",
        dataType: "json"
    })
        .done(function (data) {
            dateEl.innerText = data.date+" "+data.time;
        });


    $.ajax({
        url: "https://swapi.co/api/people/4/",
        dataType: "json"
    })
        .done(function(person){
            addSwPersonElement(person);
        });

    $.ajax({
        url: "https://swapi.co/api/films/1/",
        dataType: "json"
    })
        .done(function(dataCrawl){
            let parentElem = document.getElementById("sw");
            let crawlEl = document.createElement("p");
            crawlEl.innerText = dataCrawl.opening_crawl;
            parentElem.appendChild(crawlEl);
        })

});

function addSwPersonElement(personData){
    let parentElem = document.getElementById("sw");

    let headerEl = document.createElement("h2");
    headerEl.innerText = personData.name

    let listEl = document.createElement("ul");

    let hairEl = document.createElement("li");
    hairEl.innerText = "hair: "+personData["hair_color"];

    let heightEl = document.createElement("li");
    heightEl.innerText = "height "+personData.height;

    listEl.appendChild(hairEl);
    listEl.appendChild(heightEl);

    parentElem.appendChild(headerEl);
    parentElem.appendChild(listEl);


}