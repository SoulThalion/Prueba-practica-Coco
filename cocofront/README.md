<details>
<summary><b>Project Endpoints</b></summary>

METHOD | ENDPOINT          | TOKEN | ROLE | DESCRIPTION                | POST PARAMS                            | RETURNS
-------|-------------------|-------|------|----------------------------|----------------------------------------|--------------------
GET    | /projects         | YES   | all | Get All Projects                |                                        | { message: 'Projects fetched successfully', data: [`project`]}
POST   | /projects         | YES   | all | Create a new Project       | `name`, `description`, `owner_id` | { message: 'Project created successfully', data: `project`}
GET    | /projects/{id}    | YES   | all | Get One Project             | `params: id`                           | { message: 'Project fetched successfully', data: `project`}
PATCH  | /projects/{id}    | YES   | all | Update a Project           | `name`, `description` | { message: 'Project updated successfully', data: `project`}
DELETE | /projects/{id}    | YES   | all | Delete a Project           | `params: id`                           | { message: 'Project deleted successfully', data: `project`}
</details>

<details>
<summary><b>Task Endpoints</b></summary>

METHOD | ENDPOINT          | TOKEN | ROLE | DESCRIPTION                | POST PARAMS                            | RETURNS
-------|-------------------|-------|------|----------------------------|----------------------------------------|--------------------
GET    | /tasks            | YES   | all | Get All Tasks                  |                                        | { message: 'Tasks fetched successfully', data: [`task`]}
POST   | /tasks            | YES   | all | Create a new Task          | `title`, `description`, `due_date`, `assigned_to`, `project_id` | { message: 'Task created successfully', data: `task`}
GET    | /tasks/{id}       | YES   | all | Get One Task               | `params: id`                           | { message: 'Task fetched successfully', data: `task`}
GET    | /tasks/project/{id} | YES   | all | Get Tasks by Project       | `params: id`                           | { message: 'Tasks fetched successfully', data: [`task`]}
PATCH  | /tasks/{id}       | YES   | all | Update a Task             | `title`, `description`, `due_date`, `assigned_to` | { message: 'Task updated successfully', data: `task`}
DELETE | /tasks/{id}       | YES   | all | Delete a Task             | `params: id`                           | { message: 'Task deleted successfully', data: `task`}
</details>

<details>
<summary><b>Comment Endpoints</b></summary>

METHOD | ENDPOINT          | TOKEN | ROLE | DESCRIPTION                | POST PARAMS                            | RETURNS
-------|-------------------|-------|------|----------------------------|----------------------------------------|--------------------
GET    | /comments         | YES   | all | Get All Comments               |                                        | { message: 'Comments fetched successfully', data: [`comment`]}
GET    | /comments/task/{id} | YES   | all | Get Comments by Task          | `params: id`                           | { message: 'Comments fetched successfully', data: [`comment`]}
POST   | /comments         | YES   | all | Create a new Comment        | `content`, `taskId`, `userId`         | { message: 'Comment created successfully', data: `comment`}
GET    | /comments/{id}    | YES   | all | Get One Comment             | `params: id`                           | { message: 'Comment fetched successfully', data: `comment`}
PATCH  | /comments/{id}    | YES   | all | Update a Comment           | `title`, `description`, `due_date`, `assigned_to`                               | { message: 'Comment updated successfully', data: `comment`}
DELETE | /comments/{id}    | YES   | all | Delete a Comment           | `params: id`                           | { message: 'Comment deleted successfully', data: `comment`}
</details>

<details>
<summary><b>User Endpoints</b></summary>

METHOD | ENDPOINT          | TOKEN | ROLE | DESCRIPTION                | POST PARAMS                            | RETURNS
-------|-------------------|-------|------|----------------------------|----------------------------------------|--------------------

GET    | /auth/user        | YES   | all | Get User By Token          |                                        | { message: 'User fetched successfully', data: `user`}
</details>

<details>
<summary><b>Auth Endpoints</b></summary>

METHOD | ENDPOINT          | TOKEN | ROLE | DESCRIPTION                | POST PARAMS                            | RETURNS
-------|-------------------|-------|------|----------------------------|----------------------------------------|--------------------
POST   | /auth/login       | -     | -    | User Login                 | `email`, `password`                 | { message: 'User logged in successfully', data: `token`}
POST   | /auth/logout      | YES   | all | User Logout                |                                        | { message: 'User logged out successfully'}
POST   | /auth/refresh     | YES   | all | Refresh Token              |                                        | { message: 'Token refreshed successfully', data: `token`}
POST   | /auth/me          | YES   | all | Get Current User           |                                        | { message: 'User fetched successfully', data: `user`}
POST   | /auth/registrer   | -     | -    | Register a User            | `name`, `email`, `password` | { message: 'User registered successfully', data: `user`}
GET    | /auth/user        | YES   | all | Get User By Token          |                                        | { message: 'User fetched successfully', data: `user`}
</details>
