let plusButton = document.querySelector(".fa-plus");
let mainContainer = document.querySelector(".main-container");
let body = document.body;
let deleteState = false;
let crossBtn = document.querySelector(".fa-times");
crossBtn.addEventListener("click", setDeleteState);
plusButton.addEventListener("click", createModal);

function createModal() {
    // create modal
    let modalContainer = document.querySelector(".modal_container");
    if (modalContainer == null) {
        modalContainer = document.createElement("div");
        modalContainer.setAttribute("class", "modal_container");
        modalContainer.innerHTML = `<div class="input_container">
        <h1 class="modal_input" 
        placeholder="PROFILE">PROFILE</h1>
        <form>
        <label for="fname">USER-NAME:</label><br>
      <input type="text" id="fname" name="username" value=""><br><br>
      <label for="lname">EMAL-ID:</label><br>
  <input type="text" id="email" name="mail" value=""><br><br>
  <label for="lname">SOCIAL MEDIA HANDLE:</label><br>
  <input type="text" id="socialmedia" name="media" value="">
  
      </form>
        
    </div>`;
         body.appendChild(modalContainer);
         handleModal(modalContainer);
    }
    // let textarea = modalContainer.querySelector(".modal_input");
    // // textarea.value = "";

    
}

function handleModal(modal_container) {
    let cColor = "black";
    let figure=document.querySelector(".figure");
    let username =document.querySelector("#fname");
    let link =document.querySelector("#email");
    let media=document.querySelector("#socialmedia");
    media.addEventListener("keydown", function (e) {
        if (e.key == "Enter" && username.value!=""){
            //console.log("Task ", textArea.value, "color ", cColor);
            //  remove modal
            modal_container.remove();
            

            // create taskBox
            createTask(cColor,username.value,link.value);
            figure.remove();



        }
    })
}

function createTask(color,task1,task2) {
    // color area click-> among colors
    let taskContainer = document.createElement("div");

    //let uid = new ShortUniqueId();

    taskContainer.setAttribute("class", "task_container");
    taskContainer.innerHTML = `<div class="task_filter ${color}">
    
   
    </div>
    <div class="task_desc_container">
    <i class="fa fa-user" style="font-size:28px">${task1}</i>
        // <div class="task_desc" contenteditable="true" >
        
        </div>
        
        
    </div>
    <div class="task_desc_container">
    <i class="fa fa-envelope" style="font-size:26px">${task2}</i>
        // <div class="task_desc" contenteditable="true" ></div>
    </div>
</div >`;
    mainContainer.appendChild(taskContainer);
    // let taskFilter = taskContainer.querySelector(".task_filter");
    // taskFilter.addEventListener("click", changeColor);
    taskContainer.addEventListener("click", deleteTask);
}

function setDeleteState(e) {

    let crossBtn = e.currentTarget;
    // console.log(crossBtn.parent)
    let parent = crossBtn.parentNode;
    if (deleteState == false) {
        parent.classList.add("active");
    } else {
        parent.classList.remove("active");
    }
    deleteState = !deleteState;
}
function deleteTask(e) {
    let taskContainer = e.currentTarget;
    if (deleteState) {
        taskContainer.remove();
    }
}
