import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import { Delete, Update } from '@material-ui/icons';
import './Display.css';
import { StylesProvider } from '@material-ui/styles';
import { Tooltip } from '@mui/material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  }),
);

function Display(props) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([]) as any;

  const handleToggle = i => {
    const currentIndex = checked.indexOf(i);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(i);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  function onDragEnd(result) {
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
  }
  return (
    <StylesProvider injectFirst>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="list">
          {provided => {
            return (
              <List
                innerRef={provided.innerRef}
                {...provided.droppableProps}
                className={classes.root}
              >
                {props.item.map((task, index) => {
                  const labelId = `checkbox-list-label-${index}`;
                  return (
                    <Draggable draggableId={labelId} index={index}>
                      {provided => {
                        return (
                          <ListItem
                            innerRef={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            onClick={() => {
                              handleToggle(index);
                            }}
                            key={index}
                            id={index}
                            role={undefined}
                            dense
                            button
                          >
                            <ListItemIcon>
                              <Checkbox
                                edge="start"
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ 'aria-labelledby': labelId }}
                                checked={checked.indexOf(index) !== -1}
                              />
                            </ListItemIcon>
                            <ListItemText
                              style={{
                                textDecoration:
                                  checked.indexOf(index) !== -1
                                    ? 'line-through'
                                    : 'none',
                              }}
                              id={labelId}
                              primary={`${task.field}`}
                            />
                            <ListItemSecondaryAction>
                              <Tooltip title="Update">
                                <IconButton
                                  onClick={() =>
                                    props.onUpdate(index, task.field)
                                  }
                                  edge="end"
                                  aria-label="update"
                                >
                                  <Update />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Delete">
                                <IconButton
                                  onClick={() => props.onDelete(index)}
                                  edge="end"
                                  aria-label="delete"
                                >
                                  <Delete />
                                </IconButton>
                              </Tooltip>
                            </ListItemSecondaryAction>
                          </ListItem>
                        );
                      }}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </List>
            );
          }}
        </Droppable>
      </DragDropContext>
    </StylesProvider>
  );
}
const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Display);
