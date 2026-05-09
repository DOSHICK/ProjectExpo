import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Task, TaskStatus } from '../types/task';

type Props = {
    task: Task;
    onPress: (task: Task) => void;
    onStatusChange: (id: string, status: TaskStatus) => void;
    onDelete: (id: string, title: string) => void;
};

const getStatusName = (status: TaskStatus): string => {
    switch (status) {
        case 'inProgress':
            return 'inProgress';
        case 'completed':
            return 'completed';
        case 'cancelled':
            return 'cancelled';
        default:
            return 'something went wrong';
    }
};

const getStatusStyle = (status: TaskStatus) => {
    switch (status) {
        case 'inProgress':
            return { backgroundColor: '#17A2B8' };
        case 'completed':
            return { backgroundColor: '#28A745' };
        case 'cancelled':
            return { backgroundColor: '#DC3545' };
        default:
            return { backgroundColor: '#6C757D' };
    }
};

const TaskCard = ({ task, onPress, onStatusChange, onDelete }: Props) => {
    const dueFormatted = new Date(task.dueDate).toLocaleString([], {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
       <TouchableOpacity onPress={() => onPress(task)} >
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Text style={styles.title}>{task.title}</Text>
                <Text style={[styles.statusBadge, getStatusStyle(task.status)]}>{getStatusName(task.status)}</Text>
            </View>

            <Text style={styles.description} numberOfLines={2}>
                {task.description}
            </Text>

            <Text style={styles.detail}>Date: {dueFormatted}</Text>
            <Text style={styles.detail}>Place: {task.address}</Text>

            <View style={styles.actions}>
                {task.status !== 'inProgress' && (
                    <TouchableOpacity style={styles.smallBtn} onPress={() => onStatusChange(task.id, 'inProgress')}>
                        <Text>inProgress</Text>
                    </TouchableOpacity>
                )}
                {task.status !== 'completed' && (
                    <TouchableOpacity style={styles.smallBtn} onPress={() => onStatusChange(task.id, 'completed')}>
                        <Text>Done</Text>
                    </TouchableOpacity>
                )}
                {task.status !== 'cancelled' && (
                    <TouchableOpacity style={styles.smallBtn} onPress={() => onStatusChange(task.id, 'cancelled')}>
                        <Text>Cancel</Text>
                    </TouchableOpacity>
                )}
                <TouchableOpacity
                    style={[styles.smallBtn, styles.deleteBtn]}
                    onPress={() => onDelete(task.id, task.title)}>
                    <Text >Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 16,
        marginBottom: 16,
        borderColor: '#6E6E6E',
        borderWidth: 1,
        borderStyle: 'solid',
        elevation: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        flex: 1,
    },
    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
        overflow: 'hidden',
    },
    description: {
        fontSize: 14,
        color: '#4B5563',
        marginBottom: 10,
    },
    detail: {
        fontSize: 13,
        color: '#6B7280',
        marginBottom: 4,
    },
    actions: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 12,
        gap: 8,
    },
    smallBtn: {
        backgroundColor: '#F3F4F6',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 16,
    },
    deleteBtn: {
        backgroundColor: '#ff0000',
    },
});

export default TaskCard;
