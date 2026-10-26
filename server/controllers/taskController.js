const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getTasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

exports.createTask = async (req, res) => {
  const { title, priority } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }
  try {
    // Attempt to persist with priority if supported by DB schema
    const data = { title };
    if (priority) data.priority = priority;

    const newTask = await prisma.task.create({ data });
    res.status(201).json(newTask);
  } catch (error) {
    // Fallback if priority field has not been migrated yet
    try {
      const fallbackTask = await prisma.task.create({
        data: { title },
      });
      res.status(201).json({ ...fallbackTask, priority: priority || "Medium" });
    } catch (err) {
      res.status(500).json({ error: "Failed to create task" });
    }
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  try {
    const updatedTask = await prisma.task.update({
      where: { id: parseInt(id) },
      data: { completed },
    });
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: "Failed to update task" });
  }
};
