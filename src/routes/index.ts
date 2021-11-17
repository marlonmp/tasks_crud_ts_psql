import { Router } from 'express'

// functions
import * as task from '../controller/task.ctrl'

const router = Router()

router.get('/task/list', task.get_tasks_list)

router.get('/task/:id', task.get_task_by_id)

router.get('/task/search/:key', task.get_task_by_key)

router.post('/task/create', task.new_task)

router.put('/task/edit', task.edit_task)

router.delete('/task/delete/:id', task.delete_task)

export { router }