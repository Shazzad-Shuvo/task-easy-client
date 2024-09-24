import TaskCard from "../TaskCard/TaskCard";

const TaskColumn = ({ status, tasks, onDrop }) => {
  const statusTitle = status.charAt(0).toUpperCase() + status.slice(1);

  const allowDrop = (e) => {
    e.preventDefault();
  };

  return (
    <div className="bg-white rounded-md p-4"
    onDragOver={allowDrop}
    onDrop={(e) => onDrop(e, status)}>
      <h2 className="text-xl font-semibold p-4 border-b-2 border-gray-500">
        {statusTitle}
      </h2>

      <div
        className=""
      >
        {
        tasks.length ? (
          tasks.map((task) => <TaskCard key={task._id} task={task}></TaskCard>)
        ) : (
          <p className="py-10 text-center">No {statusTitle} Tasks</p>
        )
        }
      </div>
    </div>
  );
};

export default TaskColumn;
