var express = require('express');
var albumService = require('../services/AlbumsService');
var responses = require('../models/responses')
var router = express.Router();

// GET album filter2
router.get('/filter2', async function (req, res) {
    try {
        let allowedParams = ["id", "title", "artist", "label", "upc", "genre", "userid", "status", "countrycode"];
        let query = [];

        allowedParams.forEach((item) => {
            if (req.query[item]) {
                query.push(item + "='" + req.query[item] + "'");
            }
        })
        if (query.length > 0) {
            query = query.join(" AND ");
        } else {
            query = "id>0";
        }

        var data = await albumService.CreateAlbumService().Filter2(query);
        res.end(JSON.stringify(responses.successResponse(data, 200, "success")));

    } catch (e) {
        res.end(JSON.stringify(responses.badRequest(e, 400, "Invalid request")));
    }
});

// GET album filter4
router.get('/filter4', async function (req, res) {
    try {
        var data = await albumService.CreateAlbumService().Filter4();
        res.end(JSON.stringify(responses.successResponse(data, 200, "success")));

    } catch (e) {
        res.end(JSON.stringify(responses.badRequest(e, 400, "Invalid request")));
    }
});

// GET album response
router.get('/', async function (req, res) {
    try {
        var data = await albumService.CreateAlbumService().GetAlbum();
        res.end(JSON.stringify(responses.successResponse(data, 200, "success")));

    } catch (e) {
        res.end(JSON.stringify(responses.badRequest(e, 400, "Invalid request")));
    }
});

// CREATE and returns album response
router.post('/', async function (req, res) {
    try {
        var album = req.body.album;
        if (!album) {
            res.end(JSON.stringify(responses.badRequest(e, 400, "Bad request")));
        } else {
            var data = await albumService.CreateAlbumService(album).CreateAlbum();
            res.end(JSON.stringify(responses.successResponse(data, 200, "success")));
        }

    } catch (e) {
        res.end(JSON.stringify(responses.badRequest(e, 400, "Invalid request")));
    }
});

// UPDATE album response
router.put('/', async function (req, res) {
    try {
        var album = req.body.album;
        if (!album) {
            res.end(JSON.stringify(responses.badRequest(e, 400, "Bad request")));
        } else {
            var data = await albumService.CreateAlbumService(album).UpdateAlbum();
            res.end(JSON.stringify(responses.successResponse(data, 200, "success")));
        }

    } catch (e) {
        res.end(JSON.stringify(responses.badRequest(e, 400, "Invalid request")));
    }
});

// DELETE album response
router.delete('/', async function (req, res) {
    try {
        var album = req.body.album;
        if (!album) {
            res.end(JSON.stringify(responses.badRequest(e, 400, "Bad request")));
        } else {
            var data = await albumService.CreateAlbumService(album).DeleteAlbum();
            res.end(JSON.stringify(responses.successResponse(data, 200, "success")));
        }

    } catch (e) {
        res.end(JSON.stringify(responses.badRequest(e, 400, "Invalid request")));
    }
});

module.exports = router;