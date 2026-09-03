import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';

export default function TaskCard({ title, done, onToggle, onDelete }) {
  return (
    <View style={styles.card}>
      {/* Toggle button */}
      <Pressable onPress={onToggle} style={styles.row}>
        <Ionicons
          name={done ? 'checkmark-circle' : 'ellipse-outline'}
          size={24}
          color={done ? colors.teal : colors.gray}
          style={styles.icon}
        />
        <Text style={[styles.title, done && styles.doneText]}>{title}</Text>
      </Pressable>

      {/* Delete button */}
      <Pressable onPress={onDelete} style={styles.deleteBtn} hitSlop={8}>
        <Ionicons name="trash-outline" size={20} color={colors.red} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: colors.lightBg,
    borderRadius: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    marginRight: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.navy,
    flexShrink: 1,
  },
  doneText: {
    textDecorationLine: 'line-through',
    color: colors.gray,
  },
  deleteBtn: {
    padding: 4,
    marginLeft: 8,
  },
});
