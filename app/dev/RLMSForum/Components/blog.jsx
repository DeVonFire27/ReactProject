import React from 'react';
import ReactDOM from 'react-dom';
import Request from 'superagent';
import NewComment from './newComment.jsx';

var posts=[];
export default class Blog extends React.Component{
    constructor()
    {
        super();
        this.state={};
        this.getData.bind(this);
    }
    doStuff(stuff){

        var posts = this.state.data[0].posts;
        var now =  new Date();
        var min;
        if(now.getMinutes() <10)
        {

            min = "0" + now.getMinutes();
        }else{min =now.getMinutes()}
        var newPost = {
            username: "[placeholder]",
            comment: stuff,
            timestamp: now.getDay() + "/" +now.getMonth()+ '/' + now.getFullYear() + " " + now.getHours() + ":" + min
        };
        if(posts)
        {
            posts.unshift(newPost);
            this.state.data[0].posts = posts;
        }
        else{
            var tempArray =[];
            tempArray.push(newPost);
            var x = this.state.data[0].posts = tempArray;
        }

        Request.post('http://localhost:3000/postForum').send(this.state.data[0]).end(function(err,res){
            if(err){console.log(err)}

        });
        this.forceUpdate();

    }getData(isTimer)
    {

        var url = 'http://localhost:3000/getForum';
        Request.get(url).then(result =>{

            if(isTimer){
                isTimer.setState({data:JSON.parse(result.text)});
            }else {
                this.setState({data: JSON.parse(result.text)});
            }

        });


}
    componentWillMount(){
    this.getData()

    }
    componentDidMount(){
        this.timer = setInterval(()=>{this.getData(this)},15000);
    }

    render(){

        if(this.state.data){

            posts = this.state.data[0].posts;
            let blogs = this.state.data.map((item,i) =>
            {
                //console.log(item);
                if(posts) {
                    this.comments = item.posts.map((stuff, k) => {
                        return <Comment key={k} data={stuff}></Comment>
                    });
                }else {
                    console.log(item);
                }
                return(
                    <div className="col-sm-6 col-sm-offset-3 header">

                        <div id="headBar">
                            <h1 className="text-center">{item.batchName}</h1>
                        </div>

                        <hr/>
                        <p className="Desc">{item.description}</p>
                        <NewComment doStuff={this.doStuff.bind(this)}></NewComment>
                        <hr id="dividerComments"/>
                        {this.comments}

                    </div>
                )
            });
            return(
                <div>
                    {blogs}
                </div>
            )
        }else{
            return(
                <p>stuff</p>
            )
        }
    }
}
const Comment = (props) => {

    return (
        <div>
            <div className="row comments">
                <span id="status">
                    <p className="col-sm-6">{props.data.username}</p>
                    <p className="col-sm-6">{props.data.timestamp}</p>
                </span>
            </div>


            <p className="col-sm-offset-1">{props.data.comment}</p>
        </div>
    )

}
