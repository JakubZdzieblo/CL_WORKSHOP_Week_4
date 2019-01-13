document.addEventListener("DOMContentLoaded",function(){

    getBooks();
    addBookAction();
    addBookDetailsEvent();
    addBookDeleteEvent();

});


function getBooks(){
    $.ajax({
        url: "http://localhost:8282/books",
        dataType: "json"
    })
        .done(function(books){
            let listEl = document.getElementById("bookList");
            books.forEach( book => addBookToList(listEl, book) );
        })
}

function addBookToList(listEl ,bookObj){
    let newLi = document.createElement("li");
    newLi.dataset.id = bookObj.id;

    let h3El = document.createElement("h3");
    h3El.innerText = bookObj.title;

    let btnDelete = document.createElement("button");
    btnDelete.innerText = "Usuń";
    btnDelete.classList.add("delete");

    h3El.appendChild(btnDelete);

    newLi.appendChild(h3El);
    listEl.appendChild(newLi)
}


function addBookAction(){

    let form = document.getElementById("bookForm");

    form.addEventListener("submit",function(e){
        e.preventDefault();

        //get data from form
        let title = this.querySelector("input[name=title]").value;
        let author = this.querySelector("input[name=author]").value;
        let isbn = this.querySelector("input[name=isbn]").value;
        let publisher = this.querySelector("input[name=publisher]").value;
        let type = this.querySelector("input[name=type]").value;

        //es6 - if variable name is the same as obj. attribute
        let book = {title, author, isbn, publisher, type};

        $.ajax({
            url: "http://localhost:8282/books",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(book),
            dataType: "json"
        })
            .done(function(data){
                console.log(data);
                form.reset();

                let listEl = document.getElementById("bookList");
                addBookToList(listEl, data);
            })
            .fail(function(){
                alert("Nie udało się zapisać książki - spróbuj ponownie");
            })

    })
}

function addBookDeleteEvent(){
    let listEl = document.getElementById("bookList");
    listEl.addEventListener("click", function (e) {
        let caller = e.target;
        if(caller.tagName === "BUTTON" && caller.className.indexOf("delete") !== -1){
            let bookId = caller.parentElement.parentElement.dataset.id;
            $.ajax({
                url: "http://localhost:8282/books/"+bookId,
                type: "DELETE",
                dataType: "json"
            })
                .done(function(){
                    let liToDelete = caller.parentElement.parentElement;
                    liToDelete.parentElement.removeChild(liToDelete);
                    })
        }
    })
}


function addBookDetailsEvent(){
    let listEl = document.getElementById("bookList");
    listEl.addEventListener("click", function (e) {
        let caller = e.target;
        if((caller.tagName === "H3") && (!caller.classList.contains("clicked")) ){
            let bookId = caller.parentElement.dataset.id;
            getBookDetails(bookId, function (book){
                let divEl = document.createElement("div");
                let pEl1 = document.createElement("p");
                let pEl2 = document.createElement("p");
                let pEl3 = document.createElement("p");
                let pEl4 = document.createElement("p");

                pEl1.innerText = "Author: " + book.author;
                pEl2.innerText = "Publisher: " + book.publisher;
                pEl3.innerText = "Type: " + book.type;
                pEl4.innerText = "ISBN: " + book.isbn;

                divEl.appendChild(pEl1);
                divEl.appendChild(pEl2);
                divEl.appendChild(pEl3);
                divEl.appendChild(pEl4);

                caller.parentElement.appendChild(divEl);

                caller.classList.add("clicked");

            })
        } else if((caller.tagName === "H3") && (caller.classList.contains("clicked")) ){
            let divEl = caller.nextElementSibling;
            divEl.parentNode.removeChild(divEl);
            caller.classList.remove("clicked");
        }
    })
}


function getBookDetails(id, callback){
    $.ajax({
        url: "http://localhost:8282/books/"+id,
        dataType: "json"
    })
        .done(function(book){
            if(typeof callback === "function"){
                callback(book);
            }
        })
}