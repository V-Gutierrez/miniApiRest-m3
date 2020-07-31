import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const app = express();

app.use(express.json());

app.listen(process.env.PORT);

interface Task {
  id: string;
  title: string;
  content: string;
  completed: boolean;
}

const list: Task[] = [];

app.get('/', (req, res) => {
  res.status(200).json(list);
});

app.get('/search', (req, res) => {
  const { title, content } = req.query;

  const search = list.filter((task) => {
    if (
      task.title.includes(String(title)) ||
      task.content.includes(String(content))
    ) {
      return true;
    }
  });

  return res.json(search);
});

app.post('/', (req, res) => {
  const { title, content } = req.body;

  if (title && content) {
    const newTask: Task = {
      id: uuidv4(),
      title: title,
      content: content,
      completed: false,
    };
    list.push(newTask);

    return res.status(200).json(newTask);
  } else {
    return res.status(400).json('Você deixou de enviar algum dado');
  }
});

app.put('/edit/:id', (req, res) => {
  const { id } = req.params;
  const { title, content, completed } = req.body;

  const findTask = list.findIndex((item) => id === item.id);

  if (findTask > -1) {
    list[findTask] = {
      id: list[findTask].id,
      title: title ? title : list[findTask].title,
      content: content ? content : list[findTask].content,
      completed: completed ? completed : list[findTask].completed,
    };

    return res.status(200).json(list[findTask]);
  } else {
    return res.status(404).json('Tarefa inexistente');
  }
});

app.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  const findTask = list.findIndex((item) => id === item.id);

  if (findTask > -1) {
    list.splice(findTask, 1);
    return res.status(200).json(list);
  } else {
    return res.status(400).json('Tarefa inexistente');
  }
});

app.put('/complete/:id', (req, res) => {
  const { id } = req.params;

  const findTask = list.findIndex((item) => id === item.id);

  if (findTask > -1) {
    list[findTask] = {
      ...list[findTask],
      completed: true,
    };

    return res.status(200).json(list[findTask]);
  } else {
    return res.status(400).json('Tarefa inexistente ou requisição incorreta');
  }
});
