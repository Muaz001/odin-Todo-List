import "./styles.css"

import { make_project, get_projects} from "./todos.js";



function addTodo(form){
    let submit_btn = NaN;

    if (form.className === "todo_form") {  // Where classname is used to pass the name of the form
        submit_btn = document.querySelector(".submit_todo");  // This button only shows up when New task is clicked

        submit_btn.addEventListener("click", () =>{
            let project_name = document.querySelector("#add_existing").value;
            form.setAttribute("hidden", "");  

            if (project_name === ""){   // If not project name entered, change project name to default
                project_name = "Default";
            }

            let todoData = {};
            let inputs = document.querySelectorAll("form.todo_form div.todo_inputs input"); // Getting all inputs from inside the div which is isnide a form only
            for (let each of inputs){
                if (each.name === "chkbx") {  // Checking if its the check box input 
                    if (each.checked) {         // Checking if checkbox is checked or not
                        todoData[each.name] = "true";
                    }
                    else {
                        todoData[each.name] = "false";
                    }
                }
                else {
                    todoData[each.name] = each.value;
                }
            }
            
            // make_todo(todoData.title, todoData.desc, todoData.date, todoData.prty, todoData.chkbx);
            make_project(todoData.title, todoData.desc, todoData.date, todoData.prty, todoData.chkbx, project_name)

            // Clearing inputs
            for (let each of inputs){
                each.value = "";
            }
            display();
        });
    }
    else if (form.className === "prjct_form") {
        submit_btn = document.querySelector(".submit_prjct")

        submit_btn.addEventListener("click", () =>{
            let project_name = document.querySelector("#prjctName").value;

            let todoData = {};
            let inputs = document.querySelectorAll("form.prjct_form div.todo_inputs input"); // Getting all inputs from inside the div only
            for (let each of inputs){
                if (each.name === "chkbx") {  // Checking if its the check box input 
                    if (each.checked) {         // Checking if checkbox is checked or not
                        todoData[each.name] = true;
                    }
                    else {
                        todoData[each.name] = false;
                    }
                }
                else {
                    todoData[each.name] = each.value;
                }
            }
            // make_todo(todoData.title, todoData.desc, todoData.date, todoData.prty, todoData.chkbx);
            make_project(todoData.title, todoData.desc, todoData.date, todoData.prty, todoData.chkbx, project_name)

            // Clearing inputs
            for (let each of inputs){
                each.value = "";
            }
            display();
        });
    }
}



function display(pre_made=NaN){
    let display = document.querySelector(".display");
    display.replaceChildren();  // Clearing the display for new things to load

    let projects = NaN;
    if (pre_made){   // For displaying the screen on initial page load(when nothing clicked)
        projects = get_projects("default");
    }
    else{  
        projects = get_projects();
    }

    for (let project in projects){
        let project_card = document.createElement("div");
        
        let project_name  = document.createElement("h4");
        project_name.textContent = project;
        project_card.append(project_name);

        let todos = projects[project]; // Getting each project's list (i.e todos)
        for (let todo of todos) {  // Getting each todo in the todos list
            let todo_card = document.createElement("ol");
            for (let data in todo){
                let each_todo = document.createElement("li");
                each_todo.textContent = todo[data]; //Storing each property of todo
                
                todo_card.append(each_todo);
            }
            project_card.append(todo_card);
        }
        display.append(project_card);
    }
}


function main(){
    display("pre_made");

    let new_todo = document.querySelector(".add_todo");
    new_todo.addEventListener("click", () => {
        let form = document.querySelector(".todo_form");
        form.removeAttribute("hidden");

        // let existing_project = document.querySelector("#add_existing");
        addTodo(form); 
    });


    let new_prjct = document.querySelector(".add_project")
    new_prjct.addEventListener("click", () => {
        let form = document.querySelector(".prjct_form");

        let project_name = document.querySelector("#prjctName");

        // Now create an data structure for project, adn start adding todos in it using addTodo
        addTodo(form);
    });
}

main();
