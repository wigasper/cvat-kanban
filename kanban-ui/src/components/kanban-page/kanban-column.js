import React from "react";

import { Droppable } from "react-beautiful-dnd";

import "antd/dist/antd.css";

import { Card } from "antd";

import KanbanCardComponent from "./kanban-card";

// TODO fix modal situation
// TODO there can be errors for screwed up initial indices, probably
// default for all card positions should be 0 or need logic to figure
// out by column
function KanbanColumnComponent({ column }) {
  /*  const [column, setColumn] = useState(thisColumn);
  const [loading, setLoading] = useState(false);

  const getCol = () => {
     getColumn(column.id)
      .then((res) => {
        if (loading) {
          setColumn(res)
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    //let mounted = true;
    
    getCol();
    
    return () => (setLoading(false));
  }, [column]);
*/

  const renderColumn = () => {
    return (
      <>
        <Droppable droppableId={column.name}>
          {(provided) => (
            <Card
              title={column.name}
              style={{ width: 300, marginTop: 16 }}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {column.cards.map((card, index) => (
                <KanbanCardComponent card={card} index={index} />
              ))}
              {provided.placeholder}
            </Card>
          )}
        </Droppable>
      </>
    );
  };
  //
  return <div>{renderColumn()}</div>;
}
export default KanbanColumnComponent;
