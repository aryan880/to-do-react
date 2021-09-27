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
import { v4 as uuidv4 } from 'uuid';

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

    console.log(destination, source, draggableId);
    let sourceValue;

    sourceValue = props.arrayList.filter((l, i) => {
      return i === source.index;
    });

    let newArr = [...props.arrayList];
    newArr.splice(source.index, 1);
    newArr.splice(destination.index, 0, ...sourceValue);
    console.log(newArr);
    props.dndUpdate(newArr);

    // props.checkBoxUpdate(source.index, destination.index);
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
                  const labelId = `checkbox-list-label-${index}`;
                  return (
                    <Draggable draggableId={labelId} index={index}>
                      {provided => {
                        return (
                          <ListItem
                            innerRef={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            key={index}
                            id={index}
                            role={undefined}
                          >
                            <ListItemIcon>
                              <Checkbox
                                onClick={() => {
                                  props.checkBoxToggle(index);
                                }}
                                edge="start"
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ 'aria-labelledby': labelId }}
                                checked={
                                  props.checkedState.indexOf(index) !== -1
                                }
                              />
                            </ListItemIcon>
                            <ListItemText
                              style={{
                                textDecoration:
                                  props.checkedState.indexOf(index) !== -1
                                    ? 'line-through'
                                    : 'none',
                              }}
                              id={labelId}
                              primary={`${task.field}`}
                            />
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
  console.log(state.list.list);
  return {
    arrayList: state.list.list,
    checkedState: state.checkBox.checked,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    checkBoxToggle: v => dispatch(setCheck(v)),
    dndUpdate: arr => dispatch(dndUpdateList(arr)),
    // checkBoxUpdate: (s, d) => dispatch(updateChecked(s, d)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Display);
