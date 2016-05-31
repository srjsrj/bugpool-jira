var express = require('express');
var util = require('util');
var fs = require('fs');
var morgan = require('morgan');
var errorhandler = require('errorhandler')
var nconf = require('nconf');
var JiraApi = require('jira-client');
var _ = require('underscore');
var app = express();

app.set('view engine', 'html');

nconf.use('file', { file: './config.json' });
nconf.load();

var jira = new JiraApi(nconf.get('jiraConnect'));

app.use(errorhandler());
app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));

app.get('/t', function(req, res) {
    jira.searchJira('issueType in (Bug, Sub-task) AND status="In Progress" AND assignee in (membersOf(jira-developers))').then(function(data) {
        var issues = createList(data);       
        res.json(issues);
    }).catch(function(err) {
        console.error(err);
    });
});

app.listen(3334, function() {
    console.log("App listening on port 3334");
});

function createList(data) {
    var issues = data.issues;
    var groupedByUserIssues = _.groupBy(issues, function(issue) {
        return issue.fields.assignee.name;
    });

    return groupedByUserIssues;
};