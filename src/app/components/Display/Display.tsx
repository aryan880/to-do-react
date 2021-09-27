import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import { Delete, Update } from '@material-ui/icons';
import './Display.css';
import { StylesProvider } from '@material-ui/styles';
import { Tooltip } from '@mui/material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import { dndUpdateList, setCheck, updateChecked } from '../List/ListActions';
import _ from 'lodash';

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

  function onDragEnd(result) {
    const { destination, source } = result;
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    props.dndUpdate(destination.index, source.index);
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
                {props.arrayList.map((task, index) => {
                  console.log(task);
                  return (
                    <Draggable
                      draggableId={task.id}
                      index={index}
                      key={task.id}
                    >
                      {provided => {
                        return (
                          <ListItem
                            innerRef={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            key={task.id}
                            id={index}
                          >
                            <ListItemIcon>
                              <Checkbox
                                onChange={event => {
                                  props.checkBoxToggle(
                                    task.id,
                                    event.target.checked,
                                  );
                                }}
                                edge="start"
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ 'aria-labelledby': task.id }}
                                checked={task.isDone}
                              />
                            </ListItemIcon>
                            <ListItemText
                              style={{
                                textDecoration: task.isDone
                                  ? 'line-through'
                                  : 'none',
                              }}
                              id={task.id}
                              primary={`${task.value}`}
                            />
                            <Tooltip title="Update">
                              <IconButton
                                onClick={() =>
                                  props.onUpdate(task.id, task.value)
                                }
                                edge="end"
                                aria-label="update"
                              >
                                <Update />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                              <IconButton
                                onClick={() => props.onDelete(task.id)}
                                edge="end"
                                aria-label="delete"
                              >
                                <Delete />
                              </IconButton>
                            </Tooltip>
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
  return {
    arrayList: _.sortBy(state.list.list, task => task.sortOrder),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    checkBoxToggle: (id, v) => dispatch(setCheck(id, v)),
    dndUpdate: (destination, source) =>
      dispatch(dndUpdateList(destination, source)),
    // checkBoxUpdate: (s, d) => dispatch(updateChecked(s, d)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Display);
