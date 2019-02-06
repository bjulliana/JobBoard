let Job = require('../models/Job');

module.exports.getJobs = function (req, res) {
    Job.find(function (err, jobs) {
        if (err) {
            return res.json(err);
        }
        return res.json(jobs);
    });
};

module.exports.addJob = function (req, res) {
    let data   = req.body;
    let newJob = new Job({
        title      : data.title,
        category   : data.category,
        type       : data.type,
        city       : data.city,
        province   : data.province,
        description: data.description
    });
    newJob.save(function (err, job) {
        if (err) {
            return res.status(500).send(err);
        }
        return res.json(job);
    });
};

module.exports.getJob = function (req, res) {
    var data = req.params.id;
    Job.findOne({_id: data}, function (err, job) {
        if (err) {
            return res.status(500).send(err);
        }
        if (!job) {
            return res.status(404).send(err);
        }
        return res.json(job);
    });
};
