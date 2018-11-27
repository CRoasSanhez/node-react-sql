var express = require('express');
var usersService = require('../services/UsersService');
var responses = require('../models/responses')
var router = express.Router();

// GET album filter5
router.get('/filter5', async function (req, res) {
    try {
        var data = await usersService.CreateUsersService().Filter5();
        res.end(JSON.stringify(responses.successResponse(data, 200, "success")));

    } catch (e) {
        res.end(JSON.stringify(responses.badRequest(e, 400, "Invalid request")));
    }
});

// GET users response
router.get('/', async function (req, res) {
    try {
        var data = await usersService.CreateUsersService().GetUsers();
        res.end(JSON.stringify(responses.successResponse(data, 200, "success")));

    } catch (e) {
        res.end(JSON.stringify(responses.badRequest(e, 400, "Invalid request")));
    }
});

// CREATE and returns users response
router.post('/', async function (req, res) {
    try {
        var user = req.body.user;
        if (!user) {
            res.end(JSON.stringify(responses.badRequest(e, 400, "Bad request")));
        } else {
            var data = await usersService.CreateUsersService(user).CreateUser();
            res.end(JSON.stringify(responses.successResponse(data, 200, "success")));
        }

    } catch (e) {
        res.end(JSON.stringify(responses.badRequest(e, 400, "Invalid request")));
    }
});

// UPDATE users response
router.put('/', async function (req, res) {
    try {
        var user = req.body.user;
        if (!user) {
            res.end(JSON.stringify(responses.badRequest(e, 400, "Bad request")));
        } else {
            var data = await usersService.CreateUsersService(user).UpdateUser();
            res.end(JSON.stringify(responses.successResponse(data, 200, "success")));
        }

    } catch (e) {
        res.end(JSON.stringify(responses.badRequest(e, 400, "Invalid request")));
    }
});

// DELETE users response
router.delete('/', async function (req, res) {
    try {
        var user = req.body.user;
        if (!user) {
            res.end(JSON.stringify(responses.badRequest(e, 400, "Bad request")));
        } else {
            var data = await usersService.CreateUsersService(user).DeleteUser();
            res.end(JSON.stringify(responses.successResponse(data, 200, "success")));
        }

    } catch (e) {
        res.end(JSON.stringify(responses.badRequest(e, 400, "Invalid request")));
    }
});

module.exports = router;