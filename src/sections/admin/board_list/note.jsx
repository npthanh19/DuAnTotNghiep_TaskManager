               {/* {sprints?.map((sprint) => (
                    <div key={sprint.id} className="mb-4">
                         <h4 className="mb-3 d-flex align-items-center">
                              <div className="form-check me-2">
                                   <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id={`sprint-${sprint.id}`}
                                        onChange={(e) => handleToggleAllTasks(sprint.id, e.target.checked)}
                                   />
                              </div>
                              <span>
                                   {sprint.id} <small className="text-muted">({sprint.dateRange})</small>
                              </span>
                         </h4>

                         

                         <DragDropContext onDragEnd={(result) => handleDragEnd(result, sprint.id)}>
                              <Droppable droppableId={sprint.id}>
                                   {(provided) => (
                                        <div {...provided.droppableProps} ref={provided.innerRef} className="list-group">
                                             {sprint.tasks.map((task, index) => (
                                                  <Draggable key={task.id} draggableId={task.id} index={index}>
                                                       {(provided) => (
                                                            <div
                                                                 {...provided.draggableProps}
                                                                 {...provided.dragHandleProps}
                                                                 ref={provided.innerRef}
                                                                 className="d-flex align-items-center py-2 border-bottom">
                                                                 <div className="form-check me-3">
                                                                      <input
                                                                           className="form-check-input"
                                                                           type="checkbox"
                                                                           checked={task.completed}
                                                                           onChange={() => handleTaskCompletionToggle(sprint.id, task.id)}
                                                                      />
                                                                 </div>
                                                                 <div className="me-auto">
                                                                      <span className="me-2">{task.id}</span>
                                                                      <span>{task.name}</span>
                                                                 </div>
                                                                 <select
                                                                      className="form-select board-list form-select-sm me-4 select-status"
                                                                      value={task.status}
                                                                      onChange={(e) => handleStatusChange(sprint.id, task.id, e.target.value)}>
                                                                      <option value="TO DO">To Do</option>
                                                                      <option value="IN PROGRESS">In Progress</option>
                                                                      <option value="REVIEW">Review</option>
                                                                      <option value="DONE">Done</option>
                                                                 </select>
                                                                 <span
                                                                      className={`badge bg-${
                                                                           task.status === 'DONE' ? 'success' : 'primary'
                                                                      } me-3 status-badge`}>
                                                                      {task.status}
                                                                 </span>
                                                                 <span className="me-3">
                                                                      <span className="badge bg-secondary">{task.priority}</span>
                                                                 </span>
                                                                 <span className="me-3 user-id">
                                                                      <img src={task.assignee} className="w-50 rounded-circle" alt="User Avatar" />
                                                                 </span>
                                                            </div>
                                                       )}
                                                  </Draggable>
                                             ))}
                                             {provided.placeholder}
                                        </div>
                                   )}
                              </Droppable>
                         </DragDropContext>

                         <span className="text-muted cursor-pointer" onClick={() => toggleInputVisibility(sprint.id)}>
                              + Created
                         </span>

                         {isInputVisible[sprint.id] && (
                              <div className="input-group mt-2">
                                   <input
                                        type="text"
                                        className="form-control form-control-sm"
                                        placeholder="Add new task"
                                        value={newTask}
                                        onChange={(e) => setNewTask(e.target.value)}
                                   />
                                   <button className="btn btn-primary btn-sm" onClick={() => handleAddTask(sprint.id)}>
                                        Add Task
                                   </button>
                              </div>
                         )}
                    </div>
               ))} */}

               {/* Phần "Unassigned Tasks" */}
               {/* <DragDropContext onDragEnd={(result) => handleDragEnd(result, null)}>
                    <Droppable droppableId="unassigned-tasks">
                         {(provided) => (
                              <div ref={provided.innerRef} {...provided.droppableProps} className="task-column">
                                   <h4>Unassigned Tasks</h4>
                                   {taskNotWorkTime?.map((task, index) => (
                                        <Draggable key={task.id} draggableId={String(task.id)} index={index}>
                                             {(provided) => (
                                                  <div
                                                       {...provided.draggableProps}
                                                       {...provided.dragHandleProps}
                                                       ref={provided.innerRef}
                                                       className="d-flex align-items-center py-2 border-bottom">
                                                       <div className="form-check me-3">
                                                            <input
                                                                 className="form-check-input"
                                                                 type="checkbox"
                                                                 checked={task.completed}
                                                                 onChange={() => handleTaskCompletionToggle(null, task.id)}
                                                            />
                                                       </div>
                                                       <div className="me-auto">
                                                            <span className="me-2">{task.id}</span>
                                                            <span>{task.name}</span>
                                                       </div>
                                                       <select
                                                            className="form-select board-list form-select-sm me-4 select-status"
                                                            value={task.status}
                                                            onChange={(e) => handleStatusChange(null, task.id, e.target.value)}>
                                                            <option value="TO DO">To Do</option>
                                                            <option value="IN PROGRESS">In Progress</option>
                                                            <option value="REVIEW">Review</option>
                                                            <option value="DONE">Done</option>
                                                       </select>
                                                       <span
                                                            className={`badge bg-${
                                                                 task.status === 'DONE' ? 'success' : 'primary'
                                                            } me-3 status-badge`}>
                                                            {task.status}
                                                       </span>
                                                       <span className="me-3">
                                                            <span className="badge bg-secondary">{task.priority}</span>
                                                       </span>
                                                       <span className="me-3 user-id">
                                                            <img src={task.assignee} className="w-50 rounded-circle" alt="User Avatar" />
                                                       </span>
                                                  </div>
                                             )}
                                        </Draggable>
                                   ))}
                                   {provided.placeholder}
                              </div>
                         )}
                    </Droppable>
               </DragDropContext> */}



          //      const handleDragEnd = (result) => {
          //       const { source, destination } = result;
      
          //       if (!destination) return;
      
          //       if (source.droppableId === 'unassignTasks') {
          //            const movedTask = taskNotWorkTime[source.index];
          //            const updatedUnassignTasks = Array.from(taskNotWorkTime);
          //            updatedUnassignTasks.splice(source.index, 1);
      
      
          //            if (destination.droppableId === 'unassignTasks') {
          //                 updatedUnassignTasks.splice(destination.index, 0, movedTask);
          //            } else {
          //                 const updatedSprints = sprints.map((sprint) => {
          //                      if (sprint.id === destination.droppableId) {
          //                           const updatedTasks = Array.from(sprint.tasks);
          //                           updatedTasks.splice(destination.index, 0, movedTask);
          //                           return { ...sprint, tasks: updatedTasks };
          //                      }
          //                      return sprint;
          //                 });
          //                 setSprints(updatedSprints);
          //                 setTaskNotWorkTime(updatedUnassignTasks);
          //            }
                     
          //       } else {
          //            const sourceSprint = sprints.find((sprint) => sprint.id === source.droppableId);
          //            const destinationSprint = sprints.find((sprint) => sprint.id === destination.droppableId);
      
          //            if (sourceSprint && destinationSprint) {
          //                 const movedTask = sourceSprint.tasks[source.index];
          //                 const updatedSourceTasks = Array.from(sourceSprint.tasks);
          //                 updatedSourceTasks.splice(source.index, 1);
      
          //                 if (source.droppableId === destination.droppableId) {
      
          //                      updatedSourceTasks.splice(destination.index, 0, movedTask);
          //                      const updatedSprints = sprints.map((sprint) => {
          //                           if (sprint.id === source.droppableId) {
          //                                return { ...sprint, tasks: updatedSourceTasks };
          //                           }
          //                           return sprint;
          //                      });
          //                      setSprints(updatedSprints);
          //                 } else {
          //                      const updatedDestinationTasks = Array.from(destinationSprint.tasks);
          //                      updatedDestinationTasks.splice(destination.index, 0, movedTask);
      
          //                      const updatedSprints = sprints.map((sprint) => {
          //                           if (sprint.id === source.droppableId) {
          //                                return { ...sprint, tasks: updatedSourceTasks };
          //                           }
          //                           if (sprint.id === destination.droppableId) {
          //                                return { ...sprint, tasks: updatedDestinationTasks };
          //                           }
          //                           return sprint;
          //                      });
          //                      setSprints(updatedSprints);
          //                 }
          //            } else if (!destinationSprint) {
          //                 const movedTask = sourceSprint.tasks[source.index];
          //                 const updatedSourceTasks = Array.from(sourceSprint.tasks);
          //                 updatedSourceTasks.splice(source.index, 1);
      
          //                 const updatedSprints = sprints.map((sprint) => {
          //                      if (sprint.id === source.droppableId) {
          //                           return { ...sprint, tasks: updatedSourceTasks };
          //                      }
          //                      return sprint;
          //                 });
          //                 const updatedUnassignTasks = Array.from(taskNotWorkTime);
          //                 updatedUnassignTasks.splice(destination.index, 0, movedTask);
      
          //                 setSprints(updatedSprints);
          //                 setTaskNotWorkTime(updatedUnassignTasks);
          //            }
          //       }
          //  };