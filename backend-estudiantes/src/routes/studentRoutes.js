// studentRoutes.js

const express = require('express');
const router = express.Router();
const Student = require('../models/studentModel');

// GET all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new student
router.post('/', async (req, res) => {
    const { id, firstName, lastName, email, courses } = req.body; // Obtener datos del estudiante del cuerpo de la solicitud
  
    const studentData = {
      id: id,
      firstName: firstName,
      lastName: lastName,
      email: email,
      courses: courses,
    };
  
    try {
      const student = new Student(studentData); 
      const newStudent = await student.save(); 
      res.status(201).json(newStudent); 
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  // Ruta para obtener un estudiante por su ID
  router.get('/:id', async (req, res) => {
    try {
      const student = await Student.findOne({ id: parseInt(req.params.id) });
  
      if (student) {
        res.json(student);
      } else {
        res.status(404).json({ message: 'Estudiante no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  //Update an existing student
  router.put('/:id', async (req, res) => {
    const { id, firstName, lastName, email, courses } = req.body;
  
    try {
      const updatedStudent = await Student.findOneAndUpdate(
        { id: parseInt(req.params.id) },
        { id, firstName, lastName, email, courses },
        { new: true }
      );
  
      if (updatedStudent) {
        res.json(updatedStudent);
      } else {
        res.status(404).json({ message: 'Estudiante no encontrado para actualizar' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// Ruta para actualizar parcialmente un estudiante por su ID
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedStudent = await Student.findOneAndUpdate(
      { id: parseInt(id) },
      { $set: updateData }, // Utilizar $set para actualizar solo los campos proporcionados en updateData
      { new: true }
    );

    if (updatedStudent) {
      res.json(updatedStudent);
    } else {
      res.status(404).json({ message: 'Estudiante no encontrado para actualizar' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


//Delete one student
  router.delete('/:id', async (req, res) => {
    try {
      const deletedStudent = await Student.findOneAndDelete({ id: parseInt(req.params.id) });
  
      if (deletedStudent) {
        res.json({ message: 'Estudiante eliminado exitosamente' });
      } else {
        res.status(404).json({ message: 'Estudiante no encontrado para eliminar' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

module.exports = router;
