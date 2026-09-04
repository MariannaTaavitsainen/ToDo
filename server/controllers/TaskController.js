import { selectAllTasks, insertTask, deleteTaskById } from '../models/Task.js' 
 
const getTasks = async (req, res,next) => { 
  try { 
    const result = await selectAllTasks() 
    return res.status(200).json(result.rows || []) 
  } catch (error) { 
    return next(error) 
  } 
} 

const createTask = async (req, res, next) => { 
  try { 
    const description = req.body.task?.description?.trim() 
 
    if (!description) { 
            const error = new Error('Task description is required') 
      error.status = 400 
      return next(error) 
    } 
 
    const result = await insertTask(description) 
    return res.status(201).json(result.rows[0]) 
  } catch (error) { 
    return next(error) 
  } 
}

const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params
    const result = await deleteTaskById(id)
    if (result.rowCount === 0) {
      const error = new Error('Task not found')
      error.status = 404
      return next(error)
    }
    return res.status(200).json({ id: id })
  } catch (error) {
    return next(error)
  }
}

export { getTasks, createTask, deleteTask } 

