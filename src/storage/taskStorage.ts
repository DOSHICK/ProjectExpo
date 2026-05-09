import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../types/task';

const TASKS_KEY = '@TasksStorageKey';

export const loadTasks = async (): Promise<Task[]> => {
    try {
        const raw = await AsyncStorage.getItem(TASKS_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch (error) {
        console.error('tasks load fail', error);
        return [];
    }
};

export const saveTasks = async (tasks: Task[]): Promise<void> => {
    try {
        await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
    } catch (error) {
        console.error('tasks save fail', error);
    }
};