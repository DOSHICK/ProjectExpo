import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import TaskCard from '../components/TaskCard';
import { Task, TaskStatus } from '../types/task';
import { loadTasks, saveTasks } from '../storage/taskStorage';

type Props = {
    navigation: any;
};

const TaskListScreen: React.FC<Props> = ({ navigation }) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [sortType, setSortType] = useState<'date' | 'status'>('date');

    const loadAllTasks = async () => {
        const loaded = await loadTasks();
        setTasks(loaded);
    };

    useEffect(() => {
        loadAllTasks();
    }, []);

    useFocusEffect(
        useCallback(() => {
            loadAllTasks();
        }, []),
    );

    const handleStatusChange = async (id: string, status: TaskStatus) => {
        const updated = tasks.map((t) => (t.id === id ? { ...t, status } : t));
        await saveTasks(updated);
        setTasks(updated);
    };

    const handleDelete = async (id: string, title: string) => {
        const filtered = tasks.filter((t) => t.id !== id);
        await saveTasks(filtered);
        setTasks(filtered);
    };

    const handleAddTask = (newTask: Task) => {
        const newTasks = [newTask, ...tasks];
        saveTasks(newTasks);
        setTasks(newTasks);
    };

    const getSortedTasks = () => {
        if (sortType === 'date') {
            return [...tasks].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        } else {
            const order = { pending: 0, inProgress: 1, completed: 2, cancelled: 3 };
            return [...tasks].sort((a, b) => order[a.status] - order[b.status]);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>My tasks</Text>
                <View style={styles.sortRow}>
                    <Text style={styles.sortLabel}>Sort by:</Text>
                    <TouchableOpacity
                        style={styles.sortButton}
                        onPress={() => setSortType((prev) => (prev === 'date' ? 'status' : 'date'))}>
                        <Text style={styles.sortButtonText}>{sortType === 'date' ? 'date' : 'status'}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <FlatList
                data={getSortedTasks()}
                renderItem={({ item }) => (
                    <TaskCard
                        task={item}
                        onPress={(task) => navigation.navigate('TaskDetail', { task })}
                        onStatusChange={handleStatusChange}
                        onDelete={handleDelete}
                    />
                )}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
                ListEmptyComponent={
                    <View style={styles.empty}>
                        <Text style={styles.emptyText}>No tasks</Text>
                    </View>
                }
            />

            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate('AddTask', { onTaskAdded: handleAddTask })}>
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F9FA' },
    header: { padding: 20, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#6E6E6E', paddingTop: 40 },
    headerTitle: { fontSize: 26, fontWeight: '700', marginBottom: 10 },
    sortRow: { flexDirection: 'row', alignItems: 'center' },
    sortLabel: { fontSize: 16, marginRight: 10 },
    sortButton: { backgroundColor: '#EFF6FF', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 20 },
    sortButtonText: { fontWeight: '500' },
    list: { paddingHorizontal: 16, paddingBottom: 80, paddingTop: 12 },
    fab: {
        position: 'absolute',
        bottom: 60,
        right: 24,
        backgroundColor: '#2563EB',
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
    fabText: { fontSize: 40, color: 'white', marginTop: -7},
    empty: { alignItems: 'center', marginTop: 100 },
    emptyText: { fontSize: 20, color: '#9CA3AF' },
    emptySubtext: { fontSize: 14, color: '#D1D5DB', marginTop: 8 },
});

export default TaskListScreen;
