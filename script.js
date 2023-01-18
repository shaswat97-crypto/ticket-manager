let addbutton = document.querySelector(".addbtn");
let modal = document.querySelector(".modal");
let allTickets = document.querySelector(".allTickets");
let addbtnclick = false;
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

modal.addEventListener("keydown", (e) => {
    let key = e.key;
    if(key === "Shift"){
        console.log('hi');
        addTicket();
        let textArea = document.querySelector(".textarea");
        modal.style.display = "none";
        addbtnclick = false;
        textArea.value = "";
    }
})

addTicket = () => {
    let ticketHolder = document.createElement("div");
    ticketHolder.classList.add("ticket-holder");
    ticketHolder.innerHTML = `
        <div class="priority-color"></div>
        <div class="text-area">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio incidunt illo, voluptas illum placeat
            dignissimos.
        </div>
    `;
    allTickets.appendChild(ticketHolder);
}
