import { useEffect, useState } from "react";
import Modal from "../../Modal/Modal";
import toast, { Toaster } from "react-hot-toast";
import { MdCreate } from "react-icons/md";
import TaskColumn from "../../TaskColumn/TaskColumn";

const TaskBoard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [totalTasks, setTotalTasks] = useState([]);

  const todoTasks = totalTasks.filter(task => task.status === 'todo');
  const ongoingTasks = totalTasks.filter(task => task.status === 'ongoing');
  const completeTasks = totalTasks.filter(task => task.status === 'complete');


  useEffect(() => {
    fetch("http://localhost:5000/tasks")
      .then(res => res.json())
      .then(data =>{
          console.log(data);
          setTotalTasks(data);
      })
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const title = form.title.value;
    const description = form.description.value;
    const deadline = form.deadline.value;
    const priority = form.priority.value;

    const newTask = { title, description, deadline, priority, status: "todo" };

    //   send data to server
    fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newTask),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          toast.success("Task Created Successfully!");
          form.reset();

          setTotalTasks(prevTasks => [...prevTasks, ])
        }
      });
  };

  // drag and drop --> on drop action
  const onDrop = (e, newStatus) =>{
    const taskId = e.dataTransfer.getData('taskId');
    console.log(taskId, newStatus);

    // update task status in database
    fetch(`http://localhost:5000/tasks/${taskId}`, {
      method: 'PATCH',
      headers:{
        'content-type': 'application/json'
      },
      body: JSON.stringify({status: newStatus})
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if(data.modifiedCount> 0){
        toast.success("Task Updated Successfully!");

        // update task status in UI
        setTotalTasks(prevTasks => prevTasks.map(task => task._id === taskId ? {...task, status: newStatus} : task));
      }
    })
  }


  return (
    <div>
      <h2>Navigated to taskboard</h2>

      <div className="flex justify-center items-center mt-12 ">
        {/* task modal button */}
        <button
          onClick={() => setModalOpen(true)}
          className="border-2 border-cyan-600 text-white text-sm md:text-lg font-medium bg-cyan-400 hover:bg-cyan-500 rounded-full py-2 px-4 transition-colors duration-500 flex items-center gap-2"
        >
          <MdCreate />
          <span>Create Task</span>
        </button>
      </div>

      {/* task modal */}
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <div className="w-[15rem] md:w-[25rem] lg:w-[40rem] p-4">
          <h2 className="text-2xl font-semibold text-center">Add New Task</h2>
          <form onSubmit={handleSubmit}>
            <div className="w-full mt-5">
              <label className="block text-sm md:text-lg mb-2 font-medium">
                Title
              </label>
              <input
                type="text"
                name="title"
                className="block w-full bg-gray-200 rounded-md p-1 md:p-2"
              />
            </div>
            <div className="w-full mt-5">
              <label className="block text-sm md:text-lg mb-2 font-medium">
                Description
              </label>
              <textarea
                name="description"
                className="block w-full bg-gray-200 rounded-md p-1 md:p-2"
              ></textarea>
            </div>
            <div className="w-full mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="w-full">
                <label className="block text-sm md:text-lg mb-2 font-medium">
                  Deadline
                </label>
                <input
                  type="date"
                  name="deadline"
                  className="block w-full bg-gray-200 rounded-md p-1 md:p-2"
                />
              </div>
              <div className="w-full">
                <label className="block text-sm md:text-lg mb-2 font-medium">
                  Priority
                </label>
                <select
                  name="priority"
                  defaultValue={"low"}
                  className="block w-full bg-gray-200 rounded-md p-1 md:p-2"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
            <button className="block mx-auto rounded-full text-center px-5 py-2 text-sm md:text-lg mb-2 font-medium text-white bg-cyan-400 hover:bg-cyan-500 mt-10">
              Create
            </button>
          </form>
        </div>
      </Modal>

      {/* Tasks container */}
      <section>
        <h2>Total Tasks: {totalTasks.length}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-10 bg-gray-300 p-4 rounded-md mx-4 md:mx-28 lg:mx-10">
          <TaskColumn status="todo" tasks={todoTasks} onDrop={onDrop}></TaskColumn>
          <TaskColumn status="ongoing" tasks={ongoingTasks} onDrop={onDrop}></TaskColumn>
          <TaskColumn status="complete" tasks={completeTasks} onDrop={onDrop}></TaskColumn>
        </div>
      </section>
      <Toaster />
    </div>
  );
};

export default TaskBoard;
