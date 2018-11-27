var express = require('express');
var countryService = require('../services/CountryService');
var responses = require('../models/responses')
var router = express.Router();


// GET country response
router.get('/', async function (req, res) {
    try {
        var data = await countryService.CreateCountryService().GetCountry();
        res.end(JSON.stringify(responses.successResponse(data, 200, "success")));

    } catch (e) {
        res.end(JSON.stringify(responses.badRequest(e, 400, "Invalid request")));
    }
});

// CREATE and returns country response
router.post('/', async function (req, res) {
    try {
        var country = req.body.country;
        if (!country) {
            res.end(JSON.stringify(responses.badRequest(e, 400, "Bad request")));
        } else {
            var data = await countryService.CreateCountryService(country).CreateCountry();
            res.end(JSON.stringify(responses.successResponse(data, 200, "success")));
        }

    } catch (e) {
        res.end(JSON.stringify(responses.badRequest(e, 400, "Invalid request")));
    }
});

// UPDATE country response
router.put('/', async function (req, res) {
    try {
        var country = req.body.country;
        if (!country) {
            res.end(JSON.stringify(responses.badRequest(e, 400, "Bad request")));
        } else {
            var data = await countryService.CreateCountryService(country).UpdateCountry();
            res.end(JSON.stringify(responses.successResponse(data, 200, "success")));
        }

    } catch (e) {
        res.end(JSON.stringify(responses.badRequest(e, 400, "Invalid request")));
    }
});

// DELETE country response
router.delete('/', async function (req, res) {
    try {
        var country = req.body.country;
        if (!country) {
            res.end(JSON.stringify(responses.badRequest(e, 400, "Bad request")));
        } else {
            var data = await countryService.CreateCountryService(country).DeleteCountry();
            res.end(JSON.stringify(responses.successResponse(data, 200, "success")));
        }

    } catch (e) {
        res.end(JSON.stringify(responses.badRequest(e, 400, "Invalid request")));
    }
});

module.exports = router;