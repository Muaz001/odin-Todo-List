class Todo {
    constructor(title, description, date, priority, check){
        this.title = title;
        this.description = description;
        this.date = date;
        this.priority = priority;
        this.check = check
    }

    setPriority (value){
        this.priority = value;
    }

}

// function make_todo(title, description, date, priority, check) {
//     return new Todo(title, description, date, priority, check);
// };


function make_project(title, desc, date, priority, chkbx, name, default_project=NaN){
    // localStorage.clear();    // Uncomment this to clear the local storage


    // Checking if no projects exist, then make a default project first and add premade todos. Then store locally
    if (default_project){  //Checking if projects exist.
        let projects = {Default: []};  // making a default project and adding it to the projects

        // let todo1 = new Todo("Muaz's Birthday", "Wish birthday to Muaz", "8th september", "1", "false");
        // let todo2 = new Todo("Hasan's Birthday", "Wish birthday to Hasan", "3rd August", "2", "false");

        // projects["Default"].push(todo1);
        // projects["Default"].push(todo2);        
        
        let new_todo = new Todo(`Task: ${title}`, `Description: ${desc}`, `Date: ${date}`, `Priority: ${priority}`, `Completed: ${chkbx || "No"}`); //Making new todo 

        projects["Default"].push(new_todo);         

        localStorage.setItem("saved_projects", JSON.stringify(projects));
    }
    else{
        let current_projects = JSON.parse(localStorage.getItem("saved_projects"));  // Getting projects fron local storage
        if (name in current_projects) {
            let new_todo = new Todo(`Task: ${title}`, `Description: ${desc}`, `Date: ${date}`, `Priority: ${priority}`, `Completed: ${chkbx || "No"}`); //Making new todo 
            current_projects[name].push(new_todo); //Appending new todo to the project

            localStorage.setItem("saved_projects", JSON.stringify(current_projects));

            // make_todo(title, desc, date, priority, chkbx);
        }
        else {
            current_projects[name] = [];
            let new_todo = new Todo(`Task: ${title}`, `Description: ${desc}`, `Date: ${date}`, `Priority: ${priority}`, `Completed: ${chkbx} || "No"`); //Making new todo 

            current_projects[name].push(new_todo); 

            localStorage.setItem("saved_projects", JSON.stringify(current_projects));
        }
    }
    return JSON.parse(localStorage.getItem("saved_projects"));

}


function get_projects(default_project=NaN){
    if (default_project){
        return make_project("Muaz's Birthday", "Wish birthday to Muaz", "8th september", "1", "No", "Default", "default_project");
    }

    // localStorage.clear();    // Uncomment this to clear the local storage
    return JSON.parse(localStorage.getItem("saved_projects"));
}

export { make_project, get_projects};