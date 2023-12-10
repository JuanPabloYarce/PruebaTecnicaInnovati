// studentRoutes.js

const express = require('express');
const router = express.Router();
const Student = require('../models/studentModel');
const mongoose = require('mongoose');

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
      const student = new Student(studentData); // Crear una nueva instancia del modelo de estudiante
  
      const newStudent = await student.save(); // Guardar el estudiante en la base de datos
      res.status(201).json(newStudent); // Responder con el nuevo estudiante creado
    } catch (err) {
      res.status(400).json({ message: err.message }); // Manejar errores de inserción
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

// Other routes for updating, deleting, etc.

module.exports = router;
