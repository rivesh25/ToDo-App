import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

const App = () => {
  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem('todos');
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem('todos'));
      setTodos(todos);
    }
  }, []);

  const saveToLS = (params) => {
    localStorage.setItem('todos', JSON.stringify(params))
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished);
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo);
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS(newTodos);
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS(newTodos);

  }

  const handleAdd = () => {
    const newTodos = [...todos, { id: uuidv4(), todo, iscompleted: false }];
    setTodos(newTodos)
    setTodo('')
    saveToLS(newTodos);
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].iscompleted = !newTodos[index].iscompleted;
    setTodos(newTodos);
    saveToLS(newTodos);
  }


  return (
    <div className='min-h-screen bg-violet-50'>
      <Navbar />
      <div className='container mx-auto my-8 px-4 max-w-4xl'>
        <div className='bg-white rounded-2xl shadow-xl p-8 mb-6'>
          <h2 className='text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2'>
            <span className='text-3xl'>📝</span>
            Add a New Task
          </h2>
          <div className='flex gap-3 items-center'>
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              placeholder='Enter your task here...'
              className='flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all duration-200'
            />
            <button
              onClick={handleAdd}
              disabled={todo.length <= 3}
              className='bg-violet-600 hover:bg-violet-700 disabled:bg-gray-400 disabled:cursor-not-allowed px-6 py-3 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200'
            >
              Add Task
            </button>
          </div>
        </div>

        <div className='bg-white rounded-2xl shadow-xl p-8'>
          <div className='flex justify-between items-center mb-6'>
            <h2 className='text-2xl font-bold text-gray-800 flex items-center gap-2'>
              <span className='text-3xl'>📋</span>
              Your Tasks
              <span className='text-sm font-normal text-gray-500 ml-2'>({todos.length})</span>
            </h2>
            <label className='flex items-center gap-2 cursor-pointer bg-violet-50 px-4 py-2 rounded-lg hover:bg-violet-100 transition-colors duration-200'>
              <input
                onChange={toggleFinished}
                type="checkbox"
                checked={showFinished}
                className='w-4 h-4 text-violet-600 rounded focus:ring-violet-500'
              />
              <span className='text-sm font-medium text-gray-700'>Show Completed</span>
            </label>
          </div>

          <div className='todos space-y-3'>
            {todos.length === 0 && (
              <div className='text-center py-12'>
                <p className='text-6xl mb-4'>📭</p>
                <p className='text-gray-400 text-lg'>No tasks yet. Add your first task above!</p>
              </div>
            )}
            {todos.map(item => {
              return (showFinished || !item.iscompleted) && (
                <div
                  key={item.id}
                  className='todo flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200 group'
                >
                  <input
                    name={item.id}
                    onChange={handleCheckbox}
                    type="checkbox"
                    checked={item.iscompleted}
                    className='w-5 h-5 text-violet-600 rounded focus:ring-violet-500 cursor-pointer shrink-0'
                  />
                  <div className={`flex-1 text-gray-800 ${item.iscompleted ? "line-through text-gray-400" : ""}`}>
                    {item.todo}
                  </div>
                  <div className='buttons flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
                    <button
                      onClick={(e) => handleEdit(e, item.id)}
                      className='bg-blue-500 hover:bg-blue-600 px-4 py-2 text-white text-sm font-medium rounded-lg shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200'
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={(e) => handleDelete(e, item.id)}
                      className='bg-red-500 hover:bg-red-600 px-4 py-2 text-white text-sm font-medium rounded-lg shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200'
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
