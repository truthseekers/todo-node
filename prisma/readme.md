FROM ROOT DIRECTORY

run node src/index.js  (it doesnt work from src/)

{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU5Njg5ODI2Mn0.I6i7bHNQ2DUMM8-ZYIRqjWEfwhMTo-iaB-wnjvpLx_w"
}

mutation {
  login(
    email: "alice@prisma.io"
    password: "graphql"
  ) {
    token
    user {
      email
      links {
        url
        description
      }
    }
  }
}

Juicy J:
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTU5NjkwMzU1OX0.QY9hjUvp3o0ZrJ750KJVbmxcmzEpr8JKJILqRI5nOA0"
}

list rap songs: id 240


***********************
Create a list with todos. Try to delete with same user first. use console.logs in the statement AND in deleteTodo to see if they show up there. *************


id 242 - 248


SEVEN (id 248)
