const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/authenticate');

// VER VISTA PARA AGREGAR LINKS
router.get('/add', isLoggedIn, (req, res) => {
    res.render('links/add');
});

// AGREGAR UN LINK
router.post('/add', isLoggedIn, async (req, res) => {
    const { title, url, description } = req.body;
    const newLinks = {
        title,
        url,
        description,
        user_id: req.user.id    // enlazo el usuario al link
    };
    // Hacemos la peticion post a la db:
    await pool.query('INSERT INTO links SET ?', [newLinks]);
    req.flash('success', 'Link saved successfully');
    res.redirect('/links');
});

// VER TODOS LOS LINKS GUARDADOS
router.get('/', isLoggedIn, async (req, res) => {
    const links = await pool.query('SELECT * FROM links WHERE user_id = ?', [req.user.id]);
    res.render('links/list', { links })
});

// ELIMINAR LINKS
router.get('/delete/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;      // de req.params tomo el id
    await pool.query('DELETE FROM links WHERE ID = ?', [id]);
    req.flash('success', 'Link deleted successfully');
    res.redirect('/links');
});

// EDITAR LINKS
router.get('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const links = await pool.query('SELECT * FROM links WHERE id = ?', [id]);
    res.render('links/edit', { link: links[0] });
});

router.post('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const { title, description, url } = req.body;
    const newLink = {
        title,
        description,
        url
    };
    await pool.query('UPDATE links set ? WHERE id = ?', [newLink, id]);
    req.flash('success', 'Link updated successfully');
    res.redirect('/links');
});

module.exports = router;