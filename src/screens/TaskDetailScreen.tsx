import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Task } from '../types/task';

type Props = {
    route: any;
    navigation: any;
};

const TaskDetailScreen: React.FC<Props> = ({ route, navigation }) => {
    const task: Task = route.params.task;

    const formatDate = (iso: string) => {
        return new Date(iso).toLocaleString([], {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getStatusName = (status: string) => {
        switch (status) {
            case 'inProgress':
                return 'in progress';
            case 'completed':
                return 'completed';
            case 'cancelled':
                return 'cancelled';
            default:
                return status;
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>{task.title}</Text>
                <Text style={styles.label}>Status:</Text>
                <Text style={styles.text}>{getStatusName(task.status)}</Text>

                <Text style={styles.label}>Description:</Text>
                <Text style={styles.text}>{task.description}</Text>

                <Text style={styles.label}>Date, time:</Text>
                <Text style={styles.text}>{formatDate(task.dueDate)}</Text>

                <Text style={styles.label}>Place:</Text>
                <Text style={styles.text}>{task.address}</Text>

                <Text style={styles.label}>Date of creation:</Text>
                <Text style={styles.text}>{formatDate(task.createdAt)}</Text>

            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F9FA', padding: 16 },
    card: {backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 16,
        marginBottom: 16,
        borderColor: '#6E6E6E',
        borderWidth: 1,
        borderStyle: 'solid',
        elevation: 2, },
    title: { fontSize: 26, fontWeight: 'bold', marginBottom: 20, },
    label: { fontSize: 16, fontWeight: '600', marginTop: 12, marginBottom: 4 },
    text: { fontSize: 15, color: '#1F2937' },
    button: { backgroundColor: '#2563EB', padding: 14, borderRadius: 12, marginTop: 30, alignItems: 'center' },
    buttonText: { color: 'white', fontWeight: '600', fontSize: 16 },
});

export default TaskDetailScreen;
