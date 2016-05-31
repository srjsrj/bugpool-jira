var Bugpool = React.createClass({
    getInitialState: function() {
        return {
            groupedIssues: []
        };
    },
    componentDidMount: function() {
        var _this = this;
        _this.serverRequest = $.get('/t', function(result) {
            console.log(result);
            _this.setState({
                groupedIssues: result
            });
        });
    },
    render: function() {
        return (
            <div>
                {
                    Object.keys(this.state.groupedIssues).map(function(value, index) {
                        console.log(value)
                        return <Card key={index} data={value} />
                    })
                }
            </div>
        )
  }
});

var Card = React.createClass({
    componentDidMount: function() {
        console.log(this.props);
    },
    render: function() {
        return (
            <div>
                {this.props.data}
            </div>
        )
    }
});

ReactDOM.render(
    <Bugpool/>,
    document.getElementById('bugpool')
);
