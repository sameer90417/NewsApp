import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

export class News extends Component {

  constructor(){
    super();
    console.log("Hello I am a constructor from news component class");
    this.state = {
      articles : [],
      loading : false,
      page : 1
    }
  }

  async componentDidMount(){
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=2e549950868047d280a960da1605ec12&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading : true});
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
    this.setState({
      articles : parseData.articles, 
      totalResults : parseData.totalResults,
      loading : false
    });
  }

  handleNextClick = async() => {

    if (!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))) {
      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=2e549950868047d280a960da1605ec12&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
      this.setState({loading : true});
        let data = await fetch(url);
        let parseData = await data.json();
        console.log(parseData);

        this.setState({
          articles : parseData.articles,
          page : this.state.page+1,
          loading : false
        })
    } 
    
  }

  handlePrevClick = async() => {

    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=2e549950868047d280a960da1605ec12&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    this.setState({loading : true});
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);

    this.setState({
      articles : parseData.articles,
      page : this.state.page-1,
      loading : false
    })

  }

  render() {
    return (
      <div className="container my-3">
        
        <div className="row">
        <h1 className="text-center" >NewsMonkey - Top Headlines</h1>

        {this.state.loading && <Spinner/>}

          {!this.state.loading && this.state.articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
                    <NewsItem title={element.title ? element.title.slice(0, 45) : ""} 
                              description={element.description ? element.description.slice(0,88) : ""} 
                              imageUrl={element.urlToImage ? element.urlToImage : "https://media.zenfs.com/en/reuters-finance.com/cb924ba69c54da6e9f8ec2da23c9f7d0"} 
                              newsUrl={element.url} />
                  </div>
          })}

          <div className="container d-flex justify-content-between">
            <button disabled={this.state.page <= 1} type="button" className="btn btn-primary" onClick={this.handlePrevClick}>&larr; Previous</button>
            <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-primary" onClick={this.handleNextClick}>Next &rarr;</button>
          </div>
          
        </div>
      </div>
    );
  }
}

export default News;
