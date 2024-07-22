let divNumber = 0;
let enteredValue = 0;                     
let allDivsCreateControlNumber = 0; 

//Create 'Add New User' button
const newUserButton = document.createElement("button")  
newUserButton.id = "newUserButton"
newUserButton.textContent = "Add New User"
newUserButton.classList.add("btn", "btn-primary")
document.body.append(newUserButton)
newUserButton.addEventListener("click", () => { 
    addUser();
    changeUserTotal();
});

//Create 'Remove User' button
const removeUserButton = document.createElement("button")
removeUserButton.id = "removeUserButton"
removeUserButton.textContent = "Remove User"
removeUserButton.classList.add("btn", "btn-danger")
document.body.append(removeUserButton)
removeUserButton.addEventListener("click", () => {
    if (divNumber > 0) {
        removeUser();
        changeUserTotal();
    } else {
        console.log("No users to remove.");
    }
});

//Create 'Remove All Users' button
const removeAllUsersButton = document.createElement("button")
removeAllUsersButton.id = "removeAllUsersButtonId"
removeAllUsersButton.textContent = "Remove All Users"
removeAllUsersButton.classList.add("btn", "btn-warning")
document.body.append(removeAllUsersButton)
removeAllUsersButton.addEventListener("click", () => {
    if (divNumber > 0) {
        removeAllDivs();
    } else {
        console.log("We don't have user.");
    }
});

//Create label and input.
const createForm = document.createElement("form")             
createForm.classList.add("mb-3")
createForm.innerHTML = 
`
<div class="mb-3">
<label for="enteredValue" class="form-label">Enter number</label>
<input type="text" class="form-control" id="enteredValue" >
</div> 
`

const submitButton = document.createElement("button")          
submitButton.type = "submit"
submitButton.classList.add("btn", "btn-primary")
submitButton.textContent = "Save"

createForm.appendChild(submitButton);                           
document.body.append(createForm)                                

createForm.addEventListener('submit', formSubmit)
function formSubmit(event) {
    event.preventDefault();                     
    console.log('save button clicked')
    enteredValue = document.querySelector("#enteredValue").value   
    enteredValue = parseInt(enteredValue)           
    console.log(enteredValue)               
    createForm.reset()
}

function addUser() {
    function allDivsCreate() {           
        const defaultDivElement = document.createElement("div")
        defaultDivElement.classList.add("col-sm-12");
        defaultDivElement.id = "allDivs"
        document.body.append(defaultDivElement)
    }
    if (allDivsCreateControlNumber === 0) {
        allDivsCreate()
        allDivsCreateControlNumber = 1
    }

    const newDivElement = document.createElement("div");
    newDivElement.classList.add("col-sm-12", "counter-container");
    newDivElement.id = `counter-div-${divNumber}`;

    let outputNumber;
    let localCounter = 0;
    let saveButtonCounter = 0;
    let enteredValueName = "";

    //To be the default on the website
    function defaultOutput() {
        outputNumber = document.createElement("h3");
        outputNumber.id = `counter-display-${divNumber}`;
        outputNumber.textContent = `Counter ${divNumber}: 0`;
        newDivElement.appendChild(outputNumber);
        return outputNumber;
    }
    defaultOutput();

    //HTML section that is created every time the Add User button is clicked.
    newDivElement.innerHTML += ` 
    <button class="btn btn-info" id="increase-${divNumber}">Increase User = ${divNumber}</button>
    <button class="btn btn-info" id="decrease-${divNumber}">Decrease User = ${divNumber}</button>
    <button class="btn btn-info" id="reset-${divNumber}">Reset User = ${divNumber}</button>
    <div class="mb-3">
    <label for="enteredValue" class="form-label">Change Counter Name</label>
    <input type="text" class="form-control" id="enteredName-${divNumber}" >
    <button class="btn btn-primary" type="submit" id="saveChangeName-${divNumber}">Save</button>
    </div> 
    `;

    const currentDivNumber = divNumber; 
    divNumber += 1;
    updateTotalUserNumber();
    const allDivs = document.querySelector("#allDivs");  
    allDivs.append(newDivElement);

    // Code section related to the name change button.
    const saveChangeName = document.querySelector(`#saveChangeName-${currentDivNumber}`);
    saveChangeName.addEventListener("click", (event) => {
        saveButtonCounter = 1;
        event.preventDefault();                     
        console.log('save name change button clicked');
        enteredValueName = document.querySelector(`#enteredName-${currentDivNumber}`).value;
        console.log(enteredValueName);
        
        // To reset when you write text and press the save button
        document.querySelector(`#enteredName-${currentDivNumber}`).value = ''; 

        const outputString = document.querySelector(`#counter-display-${currentDivNumber}`);
        if (outputString) {
            outputString.textContent = `${enteredValueName} : ${localCounter}`; 
        } else {
            console.error(`Output number element not found for counter-display-${currentDivNumber}`);
        }
    });

    function changeOutput() {    
        const changeOutputnoFunc = document.querySelector(`#counter-display-${currentDivNumber}`);
        changeOutputnoFunc.textContent = `${enteredValueName ? enteredValueName : "Counter " + currentDivNumber}: ${localCounter}`;
    }

    const increaseButton = document.querySelector(`#increase-${currentDivNumber}`);
    increaseButton.addEventListener("click", () => {
        localCounter += enteredValue;
        console.log(`Counter ${currentDivNumber}: ${localCounter}`);
        changeOutput();
    });

    const decreaseButton = document.querySelector(`#decrease-${currentDivNumber}`);
    decreaseButton.addEventListener("click", () => {
        if (localCounter > 0) {
            if (localCounter < enteredValue) {
                localCounter = 0;
            } else {
                localCounter -= enteredValue;
            }
            console.log(`Counter ${currentDivNumber}: ${localCounter}`);
            changeOutput();
        }
    });

    const resetButton = document.querySelector(`#reset-${currentDivNumber}`);
    resetButton.addEventListener("click", () => {
        localCounter = 0;
        console.log(`Counter ${currentDivNumber}: ${localCounter}`);
        changeOutput();
    });

    return newDivElement;
}

function removeUser(){      
    divNumber -= 1;
    updateTotalUserNumber();
    
    const removeH = document.querySelector(`#counter-display-${divNumber}`);
    const removediv = document.querySelector(`#counter-div-${divNumber}`);
    removeH.remove();
    removediv.remove(); 
    changeUserTotal();
}

let totalUserNumber = divNumber;

function updateTotalUserNumber() {          
    totalUserNumber = divNumber;
    console.log(`Total User Number: ${totalUserNumber}`);
}

const userTotal = document.querySelector("#user-Count");
function changeUserTotal(){                 
    userTotal.textContent = `Total User Number = ${totalUserNumber}`;
}

function removeAllDivs(){
    const deleteAllDivs = document.querySelector("#allDivs");
    deleteAllDivs.remove();
    allDivsCreateControlNumber = 0;
    divNumber = 0;
    updateTotalUserNumber();
    changeUserTotal();
}
