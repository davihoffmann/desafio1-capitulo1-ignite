import React, { ReactElement, useState, useRef, useEffect } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import editIcon from '../assets/icons/edit/edit.png'
import trashIcon from '../assets/icons/trash/trash.png'
import { Task } from './TasksList';

interface TaskItemProps {
  index: number;
  task: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (taskId: number, taskNewTitle: string) => void;
}

export function TaskItem({index, task, toggleTaskDone, removeTask, editTask}: TaskItemProps): ReactElement {
  const [editing, setEditing] = useState(false);
  const [taskTitle, setTaskTitle] = useState(task.title);
  const textInputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (textInputRef.current) {
      if (editing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [editing])

  function handleStartEditing() {
    setEditing(true);
  }

  function handleCancelEditing() {
    setTaskTitle(task.title);
    setEditing(false);
  }

  function handleSubmitEditing() {
    editTask(task.id, taskTitle);
    setEditing(false);
  }

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
        >
          <View 
            testID={`marker-${index}`}
            style={task.done ? styles.taskMarkerDone :  styles.taskMarker}
          >
            { task.done && (
              <Icon 
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>

          <TextInput 
            ref={textInputRef}
            value={taskTitle}
            onChangeText={setTaskTitle}
            editable={editing}
            onSubmitEditing={handleSubmitEditing}
            style={task.done ? styles.taskTextDone : styles.taskText}
          />
        
          {/* <Text style={task.done ? styles.taskTextDone :  styles.taskText}>
            {task.title}
          </Text> */}
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        {
          editing ? (
            <TouchableOpacity
              style={{ paddingHorizontal: 24 }}
              onPress={handleCancelEditing}
            >
              <Icon name="x" size={24} color="#b2b2b2" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{ paddingHorizontal: 24 }}
              onPress={handleStartEditing}
            >
              <Image source={editIcon} />
            </TouchableOpacity>
          )
        }
        <View style={styles.divisor} />
        <TouchableOpacity
          testID={`trash-${index}`}
          style={[{ paddingHorizontal: 24 }, editing && { opacity: 0.2 }] }
          onPress={() => removeTask(task.id)}
          disabled={editing}
        >
          <Image source={trashIcon} />
        </TouchableOpacity>
      </View>
  </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
  divisor: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(196, 196, 196, 0.24)'
  }
});
 