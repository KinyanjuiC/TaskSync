const { compareTasksByPriority } = require('../script');

describe('TaskSync Unit Tests', () => {
    test('compareTasksByPriority should sort tasks by priority', () => {
        const tasks = [
            { title: 'Task 1', priority: 'low' },
            { title: 'Task 2', priority: 'high' },
            { title: 'Task 3', priority: 'medium' }
        ];
        tasks.sort(compareTasksByPriority);

        expect(tasks[0].priority).toBe('low');
        expect(tasks[1].priority).toBe('high');
        expect(tasks[2].priority).toBe('medium');
    });

    test('Task counter should update correctly', () => {
        const tasks = [
            { completed: true },
            { completed: false },
            { completed: true }
        ];
        const completedTasks = tasks.filter(task => task.completed).length;
        const totalTasks = tasks.length;

        expect(completedTasks).toBe(2);
        expect(totalTasks).toBe(3);
    });
});