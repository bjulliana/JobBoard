let Job = require('../models/Job');

module.exports.getJobs = function (req, res) {
    Job.find(function (err, jobs) {
        if (err) {
            return res.json(err);
        }
        return res.json(jobs);
    }).populate('category');
};

module.exports.getJobsbyCategory = function (req, res) {
    Job.find({category: req.params.id}, function (err, jobs) {
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

module.exports.searchJob = function (req, res) {
    let src     = req.params.search;
    const regex = new RegExp(escapeRegex(src), 'gi');

    Job.find({title: regex}, function (err, jobs) {
        if (err) {
            return res.json(err);
        } else {
            return res.json(jobs);
        }
    });
};

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}
