import React from 'react';
import { List, ListItem, Badge } from 'react-native-elements';
//import { TASK } from '../../model';
import { APP_COLORS } from '../../styles/color';
import { style } from './style';


const TASK = {
  enregistreStatus: 'Enregitré',
  collecteStatus: 'Collecté',
  valideStatus: 'Validé',

};

const TaskList = ({List, onPressCallBack, onLongPressCallBack }) => (

  <List containerStyle={style.list}>
    {List.map(task, i) => (
      <ListItem
        key={i}
        title={task.traitement}

        badge={{
          element: (
            <Badge
              value={task.status}
              containerStyle={
                task.status === TASK.todoStatus
                  ? { backgroundColor: APP_COLORS.accent }
                  : { backgroundColor: APP_COLORS.lightPrimaryColor }
              }
            />
          )
        }}
      />
    ))}
  </List>



);



export default TaskList;
