import { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskCard from '../components/TaskCard';
import { colors } from '../theme';

export default function AddTaskScreen() {
  const [taskText, setTaskText] = useState('');
  const [tasks, setTasks] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [quote, setQuote] = useState("Loading today's motivation...");
  const [isLoaded, setIsLoaded] = useState(false);

  // ── Lab 8: Load tasks from AsyncStorage on mount ──────────────────────────
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'tasks'), (snapshot) => {
      const loadedTasks = snapshot.docs.map((docItem) => ({
        id: docItem.id,
        ...docItem.data(),
      }));
      setTasks(loadedTasks);
    });
    return unsubscribe;
  }, []);
  // ── Lab 8: Save tasks to AsyncStorage whenever they change ────────────────
  useEffect(() => {
    if (!isLoaded) return; // Prevent overwriting stored data before load
    async function saveTasks() {
      try {
        await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
      } catch (e) {
        console.warn('Failed to save tasks:', e);
      }
    }
    saveTasks();
  }, [tasks, isLoaded]);

  // ── Lab 9: Fetch a motivational quote ─────────────────────────────────────
  function fetchQuote() {
    fetch('https://api.quotable.io/random')
      .then((res) => res.json())
      .then((data) => setQuote(data.content))
      .catch(() => setQuote('Believe in yourself and get it done!'));
  }

  useEffect(() => {
    fetchQuote();
  }, []);

  // ── Lab 7: Add task with validation ───────────────────────────────────────
  async function handleAddTask() {
    if (taskText.trim() === '') {
      setErrorMessage('Please type a task before adding it.');
      return;
    }
    await addDoc(collection(db, 'tasks'), { title: taskText, done: false });
    setTaskText('');
    setErrorMessage('');
  }
  async function handleToggleTask(id, currentDone) {
    await updateDoc(doc(db, 'tasks', id), { done: !currentDone });
  }
  async function handleDeleteTask(id) {
    await deleteDoc(doc(db, 'tasks', id));
  }

  return (
    <View style={styles.container}>

      {/* Lab 9: Motivational quote */}
      <View style={styles.quoteBox}>
        <Text style={styles.quoteText}>"{quote}"</Text>
        <Button title="New Quote" onPress={fetchQuote} color={colors.teal} />
      </View>

      <Text style={styles.heading}>Add a Task</Text>

      {/* Lab 7: Input + validation */}
      <TextInput
        style={styles.input}
        placeholder="What do you need to do?"
        placeholderTextColor={colors.gray}
        value={taskText}
        onChangeText={(text) => {
          setTaskText(text);
          if (errorMessage) setErrorMessage('');
        }}
      />
      {errorMessage !== '' && (
        <Text style={styles.error}>{errorMessage}</Text>
      )}

      <Button title="Add Task" onPress={handleAddTask} color={colors.navy} />

      <Text style={styles.count}>You have {tasks.length} task(s)</Text>

      {/* Lab 7: Celebration message */}
      {tasks.length > 0 && tasks.every((t) => t.done) && (
        <Text style={styles.celebration}>All done! Great work 🎉</Text>
      )}

      {/* Lab 6: FlatList with empty state, separator, toggle, delete */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskCard
            title={item.title}
            done={item.done}
            onToggle={() => handleToggleTask(item.id, item.done)}
            onDelete={() => handleDeleteTask(item.id)}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No tasks yet — add one above! 👆</Text>
        }
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
  },
  quoteBox: {
    backgroundColor: colors.lightBg,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  quoteText: {
    fontStyle: 'italic',
    color: colors.navy,
    marginBottom: 8,
    fontSize: 14,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    color: colors.navy,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D8DEE9',
    borderRadius: 8,
    padding: 10,
    marginBottom: 6,
    color: colors.navy,
  },
  error: {
    color: colors.red,
    fontSize: 13,
    marginBottom: 6,
  },
  count: {
    marginTop: 10,
    marginBottom: 4,
    color: colors.gray,
  },
  celebration: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.teal,
    marginVertical: 8,
  },
  list: {
    marginTop: 8,
  },
  empty: {
    textAlign: 'center',
    marginTop: 32,
    color: colors.gray,
    fontSize: 15,
  },
  separator: {
    height: 8,
  },
});
