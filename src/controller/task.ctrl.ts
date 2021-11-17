import * as Task from '../model/task'
import { db } from '../db'
import { Request, Response } from 'express'

// /task/list
export async function get_tasks_list(req: Request, res: Response) {

    const query_res = await db.query('SELECT * FROM tasks;')

    res.status(200).json(query_res.rows)
}

// /task/:id
export async function get_task_by_id(req: Request, res: Response) {

    const id = req.params.id

    const err = Task.validate_values({id})

    if (!err.ok) return res.status(422).json({err})

    const query = 'SELECT * FROM tasks WHERE id=$1;'

    db
        .query(query, [id])
        .then(query_res => res.json(query_res.rows))
        .catch(query_err => res.json({err: {ok: false, errors: [query_err.stack]}}))
}

// /task/search/:key
export async function get_task_by_key(req: Request, res: Response) {

    let key = `%${req.params.key}%`

    const query = `SELECT * FROM tasks WHERE name LIKE $1::text OR description LIKE $1::text;`

    db
        .query(query, [key])
        .then(query_res => res.json(query_res.rows))
        .catch(query_err => res.json({err: {ok: false, errors: [query_err.stack]}}))
}

// /task/create
export async function new_task(req: Request, res: Response) {
    req.body.id = 0
    
    const task: Task.iTask = {}

    const err = Task.validate_values(req.body, task)

    if (!err.ok) return res.status(422).json({err})

    Task.format_date(task.date!, task)

    const query = `INSERT INTO tasks(name, description, creation_date) VALUES
                        ($1::text, $2::text, to_date($3::text, 'YYYY-MM-DD'))`
    
    db
        .query(query, [task.name, task.description, task.date])
        .then(() => res.sendStatus(201))
        .catch(query_err => res.json({err: {ok: false, errors: [query_err.stack]}}))
}

// /task/edit
export async function edit_task(req: Request, res: Response) {

    delete req.body.date

    const task: Task.iTask = {}

    const err = Task.validate_values(req.body, task)

    if (!err.ok) return res.status(422).json({err})

    Task.format_date(new Date().toString(), task)

    const query = `UPDATE tasks SET name=$2::text, description=$3::text, creation_date=to_date($4::text, 'YYYY-MM-DD') WHERE id=$1;`
    
    db
        .query(query, [task.id, task.name, task.description, task.date])
        .then(() => res.sendStatus(201))
        .catch(query_err => res.json({err: {ok: false, errors: [query_err.stack]}}))
}

// /task/delete/:id
export async function delete_task(req: Request, res: Response) {
    const id = req.params.id

    const err = Task.validate_values({id})

    if (!err.ok) return res.status(422).json({err})

    const query = `DELETE FROM tasks WHERE id=$1;`
    
    db
        .query(query, [id])
        .then(() => res.sendStatus(201))
        .catch(query_err => res.json({err: {ok: false, errors: [query_err.stack]}}))
}