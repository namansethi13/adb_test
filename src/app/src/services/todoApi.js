class TodoAPI{
    constructor(baseURL){
        this.baseURL = baseURL
    }

    async getTodos(){
        try{
            const response = await fetch(`${this.baseURL}/todos/`);
            if(!response.ok){
                throw new Error(`Failed to fetch todos, code ${(response).status}`)
            }
            return response.json();
        }catch(error){
                throw new Error(`Failed to fetch todos ${error.message}`)
        }
    }

    async createTodos(text){
        try{
            const response = await fetch(`${this.baseURL}/todos/`, {
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({text})
            });
            if(!response.ok){
                throw new Error(`Failed to fetch todos, code ${(response).status}`)
            }
            return response.json();
        }catch(error){
            throw new Error(`Error occured: ${error.message}`)
        }
    }
}

export const todoApi = new TodoAPI(process.env.REACT_APP_BACKEND_ROUTE);
