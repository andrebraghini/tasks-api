# tasks-api


## Running on docker

Run the **build.sh** file to install dependencies and build the projects.
After that, you can run the `docker compose up`.

```sh
# Install dependencies and Build projects
./build.sh

# Run docker compose
docker compose up -d
```

Open Apollo Explorer https://studio.apollographql.com/sandbox/explorer to explore the local server running at http://localhost:4000


### Step by step test

1. Sign up
```graph
mutation {
  signUp(username: "josh", password: "abc123")
}
```

2. Login
```graph
query {
  login(username: "josh", password: "abc123") {
    access_token
  }
}
```

3. Add new task (Use the access_token from login as Authentication Bearer Token on headers)
```graph
mutation {
  addTask(title: "Do something", description: "Do it fast", status: TODO)
}
```

4. Get all user tasks (Use the access_token from login as Authentication Bearer Token on headers)
```graph
query {
  tasks {
    id
    title
    description
    status
  }
}
```

5. Update task (Use the access_token from login as Authentication Bearer Token on headers)
```graph
mutation {
  updateTask(id: "fe52e7da-4895-4ee9-8888-31cd4fe4c368", status: IN_PROGRESS) {
    id
    title
    description
    status
  }
}
```
