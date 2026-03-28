class Todo {
    constructor(title, description, date, priority, check, id){
        this.title = title;
        this.description = description;
        this.date = date;
        this.priority = priority;
        this.check = check
        this.id = id
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
        let id = projects["Default"].length;  // Getting length of how many todos exist, and making it id for a new todo
        let new_todo = new Todo(`Task: ${title}`, `Description: ${desc}`, `Date: ${date}`, `Priority: ${priority}`, `Completed: ${chkbx || "No"}`, id); //Making new todo 

        projects["Default"].push(new_todo);         

        localStorage.setItem("saved_projects", JSON.stringify(projects));
    }
    else{
        let current_projects = JSON.parse(localStorage.getItem("saved_projects"));  // Getting projects fron local storage
        if (name in current_projects) {
            let id = current_projects[name].length;
            let new_todo = new Todo(`Task: ${title}`, `Description: ${desc}`, `Date: ${date}`, `Priority: ${priority}`, `Completed: ${chkbx || "No"}`,id); //Making new todo, where (id + 1)  adds increases id number for every new card
            current_projects[name].push(new_todo); //Appending new todo to the project

            localStorage.setItem("saved_projects", JSON.stringify(current_projects));

            // make_todo(title, desc, date, priority, chkbx);
        }
        else {
            current_projects[name] = [];
            let id = current_projects[name].length;
            let new_todo = new Todo(`Task: ${title}`, `Description: ${desc}`, `Date: ${date}`, `Priority: ${priority}`, `Completed: ${chkbx || "No"}`,id); //Making new todo 

            current_projects[name].push(new_todo); 

            localStorage.setItem("saved_projects", JSON.stringify(current_projects));
        }
    }
    return JSON.parse(localStorage.getItem("saved_projects"));

}


function get_projects(default_project=NaN){
    // localStorage.clear();
    if (default_project){
        return make_project("Muaz's Birthday", "Wish him birthday", "8th september", "1", "No", "Default", "default_project");  // where 1 in integer form is used to keep check of each card's id
    }

    // localStorage.clear();    // Uncomment this to clear the local storage
    return JSON.parse(localStorage.getItem("saved_projects"));
}


function remove_todo(project_name, todo_id){
    let projects = JSON.parse(localStorage.getItem("saved_projects"));
    
    projects[project_name] = projects[project_name].filter(todo => {
        if (todo.id !== todo_id){
            return todo;
        }
    })
    
    localStorage.setItem("saved_projects", JSON.stringify(projects));
}

export { make_project, get_projects, remove_todo};