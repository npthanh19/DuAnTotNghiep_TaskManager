import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import './board.css';

const initialData = {
  columns: {
    'column-1': { id: 'column-1', title: 'To Do', cardIds: ['card-1', 'card-2', 'card-3'] },
    'column-2': { id: 'column-2', title: 'In Progress', cardIds: [] },
    'column-3': { id: 'column-3', title: 'Preview', cardIds: [] },
    'column-4': { id: 'column-4', title: 'Done', cardIds: [] },
  },
  cards: {
    'card-1': { id: 'card-1', task_name: 'Sample Task 1', project_name: 'Project A', user_id: 'user-1', status: 'Pending' },
    'card-2': { id: 'card-2', task_name: 'Sample Task 2', project_name: 'Project B', user_id: 'user-2', status: 'In Progress' },
    'card-3': { id: 'card-3', task_name: 'Sample Task 3', project_name: 'Project C', user_id: 'user-3', status: 'Completed' },
  },
  users: {
    'user-1': { id: 'user-1', avatarUrl: 'url_to_avatar_1' },
    'user-2': { id: 'user-2', avatarUrl: 'url_to_avatar_2' },
    'user-3': { id: 'user-3', avatarUrl: 'url_to_avatar_3' },
  },
};

export const View = () => {
  const [data, setData] = useState(initialData);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const startColumn = data.columns[source.droppableId];
    const finishColumn = data.columns[destination.droppableId];

    if (startColumn === finishColumn) {
      const newCardIds = Array.from(startColumn.cardIds);
      newCardIds.splice(source.index, 1);
      newCardIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...startColumn,
        cardIds: newCardIds,
      };

      setData({
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      });
      return;
    }

    const startCardIds = Array.from(startColumn.cardIds);
    startCardIds.splice(source.index, 1);
    const newStart = {
      ...startColumn,
      cardIds: startCardIds,
    };

    const finishCardIds = Array.from(finishColumn.cardIds);
    finishCardIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finishColumn,
      cardIds: finishCardIds,
    };

    setData({
      ...data,
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-columns" direction="horizontal">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="columns-container"
          >
            {Object.values(data.columns).map((column) => (
              <Droppable key={column.id} droppableId={column.id} type="card">
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="column"
                  >
                    <div className="column-header">
                      <h2>
                        {column.title}
                        <span className="column-count">({column.cardIds.length})</span>
                      </h2>
                      {column.title === 'To Do' && <i className="bi bi-list-task"></i>}
                      {column.title === 'In Progress' && <i className="bi bi-hourglass-split"></i>}
                      {column.title === 'Preview' && <i className="bi bi-eye"></i>}
                      {column.title === 'Done' && <i className="bi bi-check-circle"></i>}
                    </div>
                    {column.cardIds.map((cardId, index) => {
                      const card = data.cards[cardId];
                      const user = data.users[card.user_id];
                      return (
                        <Draggable key={card.id} draggableId={card.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="card"
                            >
                              <div className="card-header">
                                <h4 className='task_name'>{card.task_name}</h4>
                                <button className="details-button">
                                  <i className="bi bi-info-circle"></i>
                                </button>
                              </div>
                              <div className="people">
                                <p>Status: {card.status}</p>
                                <img src={user.avatarUrl} alt={`${card.user_id} avatar`} className="avatar" />
                              </div>
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
