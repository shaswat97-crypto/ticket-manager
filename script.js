let addbutton = document.querySelector(".addbtn");
let addbuttonModal = document.querySelector(".add");
let modal = document.querySelector(".modal");
let allTickets = document.querySelector(".allTickets");
let allColors = document.querySelectorAll(".prioritysel");
let edit = {};
let colors = {
    low: "green",
    mid: "yellow",
    high: "red"
};
let revcolors = {
    green: 'low',
    yellow: 'mid',
    red: 'high'
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
    ticketHolder.setAttribute("id", "id" + id);
    ticketHolder.innerHTML = `
        <div class="priority-color ${revcolors[currColor]}" id="id${id}"></div>
        <div class="id">ID: ${shortid}</div>
        <div class="text-area">${text}</div>
        <div class="btn-cont">
        <button class="">Edit</button>
        <button class="">Remove</button>
      </div>
    `;

    allTickets.appendChild(ticketHolder);
    id++;

    editFn(ticketHolder, id);
    changePriority(ticketHolder);
}

//function for edit button
function editFn(ticketHolder, elid) {
    // console.log('ed', editEl);
    let editEl = ticketHolder.querySelector(".btn-cont>:first-child");
    let textArea = ticketHolder.querySelector(".text-area");

    editEl.addEventListener("click", (e) => {
        if (!edit.elid) edit.elid = true;
        else edit.elid = false;

        if (edit.elid) {
            editEl.innerHTML = "Lock";
            textArea.setAttribute("contenteditable", "true");
        }
        else {
            editEl.innerHTML = "Edit";
            textArea.setAttribute("contenteditable", "false");
        }
    })
}

//function for priority patti
function changePriority(ticketHolder) {
    let patti = ticketHolder.querySelector('.priority-color');
    // console.log(patti);

    patti.addEventListener('click', (e) => {
        let arr = ['low', 'mid', 'high'];
        let currColor = patti.classList[1];
        // console.log(currColor);
        let indx = arr.indexOf(currColor);
        // console.log(indx);
        indx++;
        indx %= 3;
        // console.log(indx)
        patti.classList.remove(currColor);
        patti.classList.add(arr[indx]);
        // console.log(patti.classList[1]);
    })
}

//selecting priority
allColors.forEach((color) => {
    color.addEventListener("click", (e) => {
        allColors.forEach((col) => {
            col.classList.remove("priorityBorder");
        });
        color.classList.add("priorityBorder");
        let currPriority = color.classList[1];
        // console.log(currPriority, colors[currPriority])
        currColor = colors[currPriority];
    })
})

//filtering
let colorElArr = document.querySelectorAll('.pbox');
colorElArr.forEach((colorEl) => {
    addFilter(colorEl);
});
function addFilter(colorEl) {
    colorEl.addEventListener('click', (e) => {
        // console.log(e.target.classList[1]);
        let color = e.target.classList[1];
        let allTickets = document.querySelectorAll(".ticket-holder");
        reset();
        allTickets.forEach((ticket) => {
            let patti = ticket.querySelector('.priority-color');
            let ticketColor = patti.classList[1];
            if (ticketColor != color) {
                ticket.style.display = "none";
            }
        })
    })
}

//reset
function reset(){
    let allTickets = document.querySelectorAll(".ticket-holder");
    allTickets.forEach(ticket => {
        ticket.style.display = "inline";
    });
}
