# TODO App Booster CQRS
## Task Description

Your task is to develop a simple todo application using the Booster Framework, focusing on implementing CQRS (Command Query Responsibility Segregation) and Event Sourcing architectural patterns. Additionally, this assignment introduces a business rule that restricts the number of todo items for a single subject or on a single day. This assignment aims to evaluate your understanding and application of technical and architectural software concepts, along with business rule enforcement.
Instructions:

    Setup:

    Review the Booster Framework documentation available at Booster Framework Documentation.
    Set up your development environment by installing the necessary dependencies.

    Application Requirements:

    Develop a todo application where users can create, read, update, and delete (CRUD) todo items.
    Implement the application using CQRS and Event Sourcing architectural patterns provided by the Booster Framework.
    Enforce the business rule that restricts the number of todo items for a single label or on a single day to a maximum of three.

    Functionality:

    Todo Management:Allow users to create new todo items with a title, label, description, and due date.
    Ensure that users cannot create more than three todo items for a single subject or on a single day.
    Enable users to mark todo items as completed or delete them.
    Provide functionality to list all todo items and filter them based on their completion status.

    Reflective Questions:
    Upon completing the application, answer the following questions:

    CQRS (Command Query Responsibility Segregation):How did you separate the command and query responsibilities in your application?
    Discuss the advantages of using CQRS for a todo application.
    Event Sourcing:Explain how you implemented Event Sourcing in your todo application.
    What benefits do you see in using Event Sourcing for tracking todo item changes?
    Business Rule Enforcement:Describe how you enforced the business rule limiting the number of todo items for a single subject or on a single day.
    Discuss any challenges you encountered while implementing this business rule and how you addressed them.
    Testing:Describe your testing approach for ensuring the correctness of the todo application, including testing the enforcement of the business rule.
    How did you ensure that the CQRS and Event Sourcing implementations are functioning as expected?
    Don't implement it, however how would you implement a feature that emails a user every day his list of todays of that day?
    Don't implement it, how you secure the API with a user account? What protocols or SaaS service would you use for user management?

Submission Guidelines:

    Submit the source code of your todo application along with any relevant documentation by email.
    Note that a frontend is not required, you can use Postman to demonstrate you application
    The responses to the reflective questions can be handled during the interview

## Tech Stack

We use:

* Nodejs18.17.1
* Booster2.9.2

##  Local Environment Setup

Use the following commands to build, clean and run the application on your local repo:

    boost build
    boost clean
    boost start -e local -p 8000


## GraphQL Commands

I've used Postman to send these graphql commands but other tools like altair would work as wel. Send the queries to: http://localhost:8000/graphql

Create new todo items:

    mutation {
        CreateTodoItem(input:  {
            todoItemId: 1,
            title: "My First Todo Item!",
            label: "General",
            description: "This is my very first Todo Item.",
            dueDate: "2024-01-01"
        })
    }

    mutation {
        CreateTodoItem(input:  {
            todoItemId: 2,
            title: "My Second Todo Item!",
            label: "General",
            description: "The second thing you should do!",
            dueDate: "2024-01-01"
        })
    }

    mutation {
        CreateTodoItem(input:  {
            todoItemId: 3,
            title: "My Third Todo Item!",
            label: "General",
            description: "The third thing you should do!",
            dueDate: "2024-01-01"
        })
    }

    These todo item should fail and throw an error because of our business rules:
    mutation {
        CreateTodoItem(input:  {
            todoItemId: 4,
            title: "My Fourth Todo Item!",
            label: "General",
            description: "This todo item will fail.",
            dueDate: "2024-01-01"
        })
    }

    mutation {
        CreateTodoItem(input:  {
            todoItemId: 4,
            title: "My Fourth Todo Item!",
            label: "Work",
            description: "This todo item will fail.",
            dueDate: "2024-01-01"
        })
    }

But this one will work again:
    mutation {
        CreateTodoItem(input:  {
            todoItemId: 4,
            title: "My Fourth Todo Item!",
            label: "Work",
            description: "This todo item will fail.",
            dueDate: "2024-01-02"
        })
    }


Read the todo items:

 query {
        TodoReadModels {
            id
            title
            label
            description
            dueDate
            completed
        }
    }
Update a todo item:

    mutation {
        UpdateTodoItem(input:  {
            todoItemId: 2,
            title: "My Last Todo Item!",
            label: "General",
            description: "The last thing you should do!",
            dueDate: "2024-01-01"
        })
    }

Complete a todo item:

    mutation {
        CompleteTodoItem(input:  {
            todoItemId: 2,
        })
    }

To filter based on completions status use the following queries: 

 query {
        TodoReadModels (filter: {completed: {eq: true}}){
            id
            title
            label
            description
            dueDate
            completed
        }
    }

 query {
        TodoReadModels (filter: {completed: {eq: false}}){
            id
            title
            label
            description
            dueDate
            completed
        }
    }


