var express = require('express');
var tracksService = require('../services/TracksService');
var responses = require('../models/responses')
var router = express.Router();

router.get("/filter1", async function (req, res) {
    try {
        console.log("filter1")
        var data = await tracksService.CreateTracksService().GetFilter1();
        res.end(JSON.stringify(responses.successResponse(data, 200, "success")));

    } catch (e) {
        res.end(JSON.stringify(responses.badRequest(e, 400, "Invalid request")));
    }
});

router.get("/filter3", async function (req, res) {
    try {
        var data = await tracksService.CreateTracksService().GetFilter3();
        res.end(JSON.stringify(responses.successResponse(data, 200, "success")));

    } catch (e) {
        res.end(JSON.stringify(responses.badRequest(e, 400, "Invalid request")));
    }
});

router.get("/filter6", async function (req, res) {
    try {
        var data = await tracksService.CreateTracksService().GetFilter6();
        res.end(JSON.stringify(responses.successResponse(data, 200, "success")));

    } catch (e) {
        res.end(JSON.stringify(responses.badRequest(e, 400, "Invalid request")));
    }
});

// GET tracks response
router.get('/', async function (req, res) {
    try {
        var data = await tracksService.CreateTracksService().GetTracks();
        res.end(JSON.stringify(responses.successResponse(data, 200, "success")));

    } catch (e) {
        res.end(JSON.stringify(responses.badRequest(e, 400, "Invalid request")));
    }
});

// CREATE and returns tracks response
router.post('/', async function (req, res) {
    try {
        var track = req.body.track;
        if (!track) {
            res.end(JSON.stringify(responses.badRequest(e, 400, "Bad request")));
        } else {
            var data = await tracksService.CreateTracksService(track).CreateTrack();
            res.end(JSON.stringify(responses.successResponse(data, 200, "success")));
        }

    } catch (e) {
        res.end(JSON.stringify(responses.badRequest(e, 400, "Invalid request")));
    }
});

// UPDATE tracks response
router.put('/', async function (req, res) {
    try {
        var track = req.body.track;
        if (!track) {
            res.end(JSON.stringify(responses.badRequest(e, 400, "Bad request")));
        } else {
            var data = await tracksService.CreateTracksService(track).UpdateTrack();
            res.end(JSON.stringify(responses.successResponse(data, 200, "success")));
        }

    } catch (e) {
        res.end(JSON.stringify(responses.badRequest(e, 400, "Invalid request")));
    }
});

// DELETE tracks response
router.delete('/', async function (req, res) {
    try {
        var track = req.body.track;
        if (!track) {
            res.end(JSON.stringify(responses.badRequest(e, 400, "Bad request")));
        } else {
            var data = await tracksService.CreateTracksService(track).DeleteTrack();
            res.end(JSON.stringify(responses.successResponse(data, 200, "success")));
        }

    } catch (e) {
        res.end(JSON.stringify(responses.badRequest(e, 400, "Invalid request")));
    }
});

module.exports = router;