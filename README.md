# Ducklings Care Diary Server

## Table of Contents

1. [Description](#Description)
1. [API](#API)
1. [Technologies](#Technologies)

[Live App](https://ducklings-care-diary.beckibloom.now.sh/)

## Description

Sending home classroom reports on paper can create quite a hassle. Ducklings Care Diary would like to introduce a new way to keep notes on each of your students all in one place, and give parents access to view their student reports and progress.

Teachers are able to create their class and register their students, maintaining a diary for each student containing notes on their activities or progress each day.

After parents have been entered by the teacher, parents can view their student's diary and see their growth based on the teacher's notes over time.

> View the Client Repo for Activities Assistant [here](https://github.com/beckibloom/ducklings-care-diary-client)

## API - UPDATE ENDPOINTS

```

/api
.
--/auth
    --POST
      -/login
--/users
    --POST
      -/
    --GET
      -/data
--/students
    --GET
      -/:teacher_id
      -/:teacher_id/:student_id
    --POST
      -/:teacher_id
    --PUT
      -/:teacher_id/:student_id
    --DELETE
      -/:teacher_id/:student_id      
--/diary
    --GET
      -/:student_id
      -/:student_id/:entry_id
    --POST
      -/:student_id
    --PUT
      -/:student_id/:entry_id
    --DELETE
      -/:student_id/:entry_id


```

## Technologies

- React
- HTML
- CSS
- Node
- Express
- PostgreSQL
- Mocha/Chai/Jest
- Heroku/Now CLI
- Zeit