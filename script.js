let addbutton = document.querySelector(".addbtn");
let addbuttonModal = document.querySelector(".add");
let modal = document.querySelector(".modal");
let allTickets = document.querySelector(".allTickets");
let allColors = document.querySelectorAll(".prioritysel");
let colors = {  low:"green",
                mid:"yellow", 
                high:"red"
            };
let revcolors = {  green:'low',
                    yellow:'mid',
                    red:'high'
            };
let currColor = "green";
let addbtnclick = false;
let id = 0;
addbutton.addEventListener("click", (e) => {
    // addbutton.style.display = "flex";
    addbtnclick = !addbtnclick;
    if (addbtnclick) {
        modal.style.display = "flex";
    }
    else {
        modal.style.display = "none";
    }
});

//adding to allTickets
addbuttonModal.addEventListener("click", (e) => {
    let textArea = document.querySelector(".textarea");
    // console.log('hi');
    addTicket(textArea.value, shortid());
    modal.style.display = "none";
    addbtnclick = false;
    textArea.value = "";

})

addTicket = (text, shortid) => {
    let ticketHolder = document.createElement("div");
    ticketHolder.classList.add("ticket-holder");
    ticketHolder.setAttribute("id", "id"+id);
    ticketHolder.innerHTML = `
        <div class="priority-color ${revcolors[currColor]}" id="id${id}"></div>
        <div class="id">ID: ${shortid}</div>
        <div class="text-area">${text}</div>
    `;
    allTickets.appendChild(ticketHolder);
    id++;
}

//selecting priority
allColors.forEach((color) => {
    color.addEventListener("click", (e)=>{
        allColors.forEach((col) => {
            col.classList.remove("priorityBorder");
        });
        color.classList.add("priorityBorder");
        let currPriority = color.classList[1];
        // console.log(currPriority, colors[currPriority])
        currColor = colors[currPriority];
    })
})

//
