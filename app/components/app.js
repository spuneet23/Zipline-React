var React = require('react');
var ReactDOM = require('react-dom');


var Recent= React.createClass({
   render:function() {
    var count=0;
    var singleUser = this.props.users.map(function(user) {
      count++;
      return (
        <User user={user} key={user.username} count={count}/>
      );
    });
     return(
         <div>
          {singleUser}
         </div>
     )
   }
});

var User= React.createClass({
  render:function() {
    return(
         <div className="row user">
            <div className="col-sm-1 serial">
             <h4>{this.props.count}</h4>
            </div>
             <div className="col-sm-5 username">
              <img src={this.props.user.img} className="img-responsive"/>
              <label>{this.props.user.username}</label>
            </div>
            <div className="col-sm-3 recent">
              <h4>{this.props.user.recent}</h4>
            </div>
            <div className="col-sm-3 alltime">
               <h4>{this.props.user.alltime}</h4>
            </div>
          </div>
      )
  }
});


var App = React.createClass({
  getInitialState: function() {
       return {
        users:[],
        clicked:false
       }
  },
  getUserDataRecent() {
    $.ajax({
      url:'https://fcctop100.herokuapp.com/api/fccusers/top/recent',
      datatype:'json',
      cache:false,
      success: function(data) {
          this.setState({users:data, clicked:false});
        console.log(data)
      }.bind(this)
    })
  },
  getUserAllTime() {
    $.ajax({
      url:'https://fcctop100.herokuapp.com/api/fccusers/top/alltime',
      datatype:'json',
      cache:false,
      success: function(data) {
          this.setState({users:data, clicked:true});
        console.log(data)
      }.bind(this)
    })

  },
  componentDidMount: function() {
    this.getUserDataRecent();
  },
  render: function(){
    if(this.state.clicked==true) {
      var recentIcon= "";
      var allTimeIcon="fa fa-caret-down";
    }else {
       var recentIcon= "fa fa-caret-down";
       var allTimeIcon="";
    }
    return(
           <div>
              <div className="container">
                <div className="panel panel-default">
                  <div className="panel-heading">
                     <h4 className="text-center">Leaderboard</h4>
                  </div>
                  <div className="panel-body">
                   <div className="row top">
                    <div className="col-sm-1">
                     <h4>#</h4>
                    </div>
                     <div className="col-sm-5">
                      <h4>Camper Name</h4>
                    </div>
                    <div className="col-sm-3">
                      <a href="#" onClick={this.getUserDataRecent}><h4>Points in past 30 days  <span className={recentIcon}></span></h4></a>
                    </div>
                    <div className="col-sm-3">
                       <a href="#" onClick={this.getUserAllTime}><h4>All time points  <span className={allTimeIcon}></span></h4></a>
                    </div>
                   </div>
                   <Recent users= {this.state.users} clicked={this.state.clicked} />
                  </div>
                </div>
              </div>
           </div>


      )
  }
});

module.exports = App;