import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Task } from '../types/task';

type Props = {
    navigation: any;
    route: any;
};

const AddTaskScreen: React.FC<Props> = ({ navigation, route }) => {
    const { onTaskAdded } = route.params;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [dueDate, setDueDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const titleRef = useRef<TextInput>(null);
    const descriptionRef = useRef<TextInput>(null);
    const addressRef = useRef<TextInput>(null);

    const handleSave = () => {
        if (!title.trim()) {
            titleRef.current?.focus();
            return;
        }
        if (!description.trim()) {
            descriptionRef.current?.focus();
            return;
        }
        if (!address.trim()) {
            addressRef.current?.focus();
            return;
        }

        const newTask: Task = {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 4),
            title: title.trim(),
            description: description.trim(),
            address: address.trim(),
            dueDate: dueDate.toISOString(),
            status: 'inProgress',
            createdAt: new Date().toISOString(),
        };
        onTaskAdded(newTask);
        navigation.goBack();
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.label}>Title</Text>
                <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder='Title' />

                <Text style={styles.label}>Description</Text>
                <TextInput
                    style={[styles.input, { minHeight: 80 }]}
                    multiline
                    value={description}
                    onChangeText={setDescription}
                    placeholder='description'
                />

                <Text style={styles.label}>Address</Text>
                <TextInput style={styles.input} value={address} onChangeText={setAddress} placeholder='address' />

                <Text style={styles.label}>Date, time</Text>
                <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
                    <Text style={styles.dateText}>{dueDate.toLocaleString()}</Text>
                </TouchableOpacity>
                {showDatePicker && (
                    <DateTimePicker
                        value={dueDate}
                        mode='datetime'
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={(event, selectedDate) => {
                            setShowDatePicker(false);
                            if (selectedDate) setDueDate(selectedDate);
                        }}
                    />
                )}

                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                        <Text style={[styles.buttonText, { color: 'white' }]}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F9FA', padding: 20 },
    form: { 
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 16,
        marginBottom: 16,
        borderColor: '#6E6E6E',
        borderWidth: 1,
        borderStyle: 'solid',
        elevation: 2,
    },
    label: { fontSize: 15, fontWeight: '500', marginBottom: 6, marginTop: 12 },
    input: {
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingVertical: 10,
        marginBottom: 12,
    },
    dateButton: {
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 14,
        marginBottom: 20,
        backgroundColor: '#F9FAFB',
    },
    dateText: { fontSize: 16, color: '#2563EB' },
    buttonRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 12, marginTop: 20 },
    cancelButton: { flex: 1, backgroundColor: '#F3F4F6', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
    saveButton: {  flex: 1, backgroundColor: '#2563EB', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
    buttonText: { fontSize: 16, fontWeight: '600', color: '#1F2937' },
});

export default AddTaskScreen;
