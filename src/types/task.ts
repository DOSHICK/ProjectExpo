export type TaskStatus = 'pending' | 'inProgress' | 'completed' | 'cancelled';

export interface Task {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    address: string;
    status: TaskStatus;
    createdAt: string;
}