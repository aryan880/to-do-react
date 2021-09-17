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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  }),
);

export default function Display(props) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = value => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <StylesProvider injectFirst>
      <List className={classes.root}>
        {props.item.map((task, index) => {
          const labelId = `checkbox-list-label-${task.field}`;
          return (
            <ListItem
              onClick={() => {
                handleToggle(task.field);
              }}
              key={task.field}
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
                  checked={checked.indexOf(task.field) !== -1}
                />
              </ListItemIcon>
              <ListItemText
                style={{
                  textDecoration:
                    checked.indexOf(task.field) !== -1
                      ? 'line-through'
                      : 'none',
                }}
                id={labelId}
                primary={`${task.field}`}
              />
              <ListItemSecondaryAction>
                <IconButton
                  onClick={() => props.onUpdate(index, task.field)}
                  edge="end"
                  aria-label="update"
                >
                  <Update />
                </IconButton>
                <IconButton
                  onClick={() => props.onDelete(index)}
                  edge="end"
                  aria-label="delete"
                >
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </StylesProvider>
  );
}
