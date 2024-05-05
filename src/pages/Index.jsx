import { useState } from 'react';
import { Box, Button, Container, Flex, Input, List, ListItem, Text, useToast, IconButton } from '@chakra-ui/react';
import { FaTrash, FaEdit, FaSave, FaPlus } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const toast = useToast();

  const handleAddTask = () => {
    if (input.trim() === '') {
      toast({
        title: 'Cannot add empty task.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTasks([...tasks, { id: Date.now(), text: input, isEditing: false }]);
    setInput('');
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleEditTask = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, isEditing: true } : task));
  };

  const handleSaveTask = (id, newText) => {
    if (newText.trim() === '') {
      toast({
        title: 'Cannot save empty task.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTasks(tasks.map(task => task.id === id ? { ...task, text: newText, isEditing: false } : task));
  };

  return (
    <Container maxW="container.md" py={8}>
      <Flex as="nav" mb={4} justify="space-between" align="center">
        <Text fontSize="2xl" fontWeight="bold">Todo App</Text>
      </Flex>
      <Flex mb={4}>
        <Input placeholder="Add a new task" value={input} onChange={(e) => setInput(e.target.value)} />
        <IconButton icon={<FaPlus />} ml={2} onClick={handleAddTask} aria-label="Add task" />
      </Flex>
      <List spacing={3}>
        {tasks.map(task => (
          <ListItem key={task.id} d="flex" justifyContent="space-between" alignItems="center">
            {task.isEditing ? (
              <Input defaultValue={task.text} onBlur={(e) => handleSaveTask(task.id, e.target.value)} />
            ) : (
              <Text>{task.text}</Text>
            )}
            <Flex>
              <IconButton icon={<FaEdit />} mr={2} onClick={() => handleEditTask(task.id)} aria-label="Edit task" />
              <IconButton icon={<FaTrash />} onClick={() => handleDeleteTask(task.id)} aria-label="Delete task" />
            </Flex>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Index;