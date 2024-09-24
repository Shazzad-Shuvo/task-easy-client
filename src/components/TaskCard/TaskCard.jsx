
const TaskCard = ({task}) => {
    return (
        <div 
        className="cursor-grab"
        draggable
        onDragStart={(e) =>{
            e.dataTransfer.setData('taskId', task._id)
        }}
        >
            <h2>{task.title}</h2>
        </div>
    );
};

export default TaskCard;