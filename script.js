//todo
//edit lock ke baad upni posi pe aar
//color change not working

let addbutton = document.querySelector(".addbtn");
let removeButton = document.querySelector(".removebtn");
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
let id = 0;
if (localStorage.getItem("ticket_manager_id") && localStorage.getItem("ticket_manager_id").length > 0) {
    id = Math.max(localStorage.getItem("ticket_manager_id"), id);
}
let currColor = "green";
let addbtnclick = false;
let ticketArray = [];
if (localStorage.getItem("ticket_manager")) {
    // allTickets.innerHTML = "";
    ticketArray = JSON.parse(localStorage.getItem("ticket_manager"));
    // console.log(ticketArray);
    ticketArray.forEach(ticket => {
        let ticketHolder = document.createElement("div");
        render(ticket.id, ticket.shortid, ticket.color, ticket.text, ticketHolder, -1);
    })
}
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

removeButton.addEventListener("click", (e) => {
    // addbutton.style.display = "flex";
    addbtnclick = false;
    modal.style.display = "none";
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
    let ticketObject = {
        shortid,
        text,
        color: revcolors[currColor],
        id
    }
    ticketArray.push(ticketObject);


    //save to local
    localStorage.setItem("ticket_manager", JSON.stringify(ticketArray));

    //render
    let tickets = document.querySelectorAll(".ticket-holder");
    render(id, shortid, revcolors[currColor], text, ticketHolder, -1);
    id++;
    localStorage.setItem("ticket_manager_id", id);
    // console.log(id);
}

function render(id, shortid, color, text, ticketHolder, index) {
    console.log(id);
    let ticketArr = document.querySelectorAll(".ticket-holder");
    ticketHolder.classList.add("ticket-holder");
    ticketHolder.setAttribute("id", "id" + id);
    ticketHolder.innerHTML = `
        <div class="priority-color ${color}" id="id${id}"></div>
        <div class="id">ID : ${shortid}</div>
        <div class="text-area">${text}</div>
        <div class="btn-cont">
        <button class="">Edit</button>
        <button class="">Remove</button>
      </div>
    `;

    index--;
    if (ticketArr.length > 0 && index >= 0)
        ticketArr[index].insertAdjacentElement("afterend", ticketHolder);
    else if (index == -1 && ticketArr.length>0) {
        ticketArr[0].insertAdjacentElement("beforebegin", ticketHolder);
    }
    else allTickets.appendChild(ticketHolder);
    editFn(ticketHolder, id);
    changePriority(ticketHolder, id);
    removeFn(ticketHolder);
}

function removeFn(ticketHolder) {
    let remEl = ticketHolder.querySelector(".btn-cont>:last-child");
    remEl.addEventListener("click", (e) => {
        let elid = Number(e.target.parentElement.parentElement.id.substring(2));
        //remove from ui
        removeTicket(e.target.parentElement.parentElement.id);

        //remove from local s
        for (let i = 0; i < ticketArray.length; i++) {
            let ticket = ticketArray[i];
            // console.log(ticket.id, elid);
            if (ticket.id == elid) {
                ticketArray.splice(i, 1);
                break;
            }
        }
        localStorage.setItem("ticket_manager", JSON.stringify(ticketArray));
        //reset id
        if(ticketArray.length == 0){
            localStorage.setItem("ticket_manager_id", 0);
            id=0;
        }
    })
}

//function for edit button
function editFn(ticketHolder, id) {
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

            //udpate in local
            for (let i = 0; i < ticketArray.length; i++) {
                let ticket = ticketArray[i];
                if (`id${ticket.id}` == e.target.parentElement.parentElement.id) {
                    ticket.text = textArea.innerHTML;
                    break;
                }
            }
            localStorage.setItem("ticket_manager", JSON.stringify(ticketArray));

            //remove from ui
            let index = removeTicket(e.target.id);

            //add from local storage
            let objArr = JSON.parse(localStorage.getItem("ticket_manager"));
            for (let i = 0; i < objArr.length; i++) {
                let obj = objArr[i];
                if (`id${obj.id}` == e.target.id) {
                    let ticketHolder = document.createElement("div");
                    render(id, obj.shortid, obj.color, obj.text, ticketHolder, index);
                    break;
                }
            }
        }

    })
}

function removeTicket(id) {
    let index = 0;
    let allTickets = document.querySelectorAll(".ticket-holder");
    // console.log(allTicketsHolder);
    for (let i = 0; i < allTickets.length; i++) {
        let ticket = allTickets[i];
        if (ticket.id == id) {
            ticket.remove();
            break;
        }
        index++;
    }
    return index;
}

//function for priority patti
function changePriority(ticketHolder, id) {
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

        //udpate in local
        for (let i = 0; i < ticketArray.length; i++) {
            let ticket = ticketArray[i];

            if (`id${ticket.id}` == e.target.id) {
                ticket.color = arr[indx];
                break;
            }
        }
        localStorage.setItem("ticket_manager", JSON.stringify(ticketArray));

        //remove from ui
        let index = removeTicket(e.target.id);

        //add from local storage
        let objArr = JSON.parse(localStorage.getItem("ticket_manager"));
        for (let i = 0; i < objArr.length; i++) {
            let obj = objArr[i];
            if (`id${obj.id}` == e.target.id) {
                let ticketHolder = document.createElement("div");
                render(id, obj.shortid, obj.color, obj.text, ticketHolder, index);
                break;
            }
        }
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

        //border
        //remove from all
        colorElArr.forEach((col) => {
            col.classList.remove("priorityBorder");
        });
        //add to this
        colorEl.classList.add("priorityBorder");

        let color = e.target.classList[1];
        let allTickets = document.querySelectorAll(".ticket-holder");
        //reset all tickets
        allTickets.forEach(ticket => {
            ticket.style.display = "inline";
        });
        //filter
        allTickets.forEach((ticket) => {
            let patti = ticket.querySelector('.priority-color');
            let ticketColor = patti.classList[1];
            if (ticketColor != color) {
                ticket.style.display = "none";
            }
        })
        search();
    })
}

//reset
function reset() {
    let allTickets = document.querySelectorAll(".ticket-holder");
    let inEl = document.querySelectorAll('input')[0];

    inEl.value = '';

    //remove  all borders
    colorElArr.forEach((col) => {
        col.classList.remove("priorityBorder");
    });

    allTickets.forEach(ticket => {
        ticket.style.display = "inline";
    });
}

//search
function search() {
    //get filtered color
    let color = null;
    colorElArr.forEach((colorEl) => {
        if (colorEl.classList.contains("priorityBorder")) {
            color = colorEl.classList[1];
        }
    });
    let inEl = document.querySelectorAll('input')[0];
    let allTickets = document.querySelectorAll(".ticket-holder");
    allTickets.forEach((ticket) => {
        ticket.style.display = 'none';
    })
    allTickets.forEach((ticket) => {
        let idEl = ticket.querySelector('.id');
        let textEl = ticket.querySelector('.text-area');
        let patti = ticket.querySelector('.priority-color');
        let text = inEl.value;
        if (idEl.innerHTML.includes(text) || textEl.innerHTML.includes(text)) {
            if (color) {
                let pattiColor = patti.classList[1];
                if (color == pattiColor) {
                    ticket.style.display = "inline";
                }
            }
            else {
                ticket.style.display = "inline";
            }
        }
    })

}
