import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'

export class News extends Component {
  articles = []
  constructor() {
    super();
    this.state = {
      articles: this.articles,
      loading: false,
      page: 1
    }
  }

  async componentDidMount() {
    console.log("cdm")
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=476e593d84a64a1baace5827ee057fa0&page=1&pagesize=${this.props.pagesize}`
    this.setState({loading:true});
    let data = await fetch(url);
    let parseddata = await data.json()
    console.log(parseddata)
    this.setState({ articles: parseddata.articles,
       totalResults: parseddata.totalResults,
      loading:false
     })
  }

  handleprevbutton = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=476e593d84a64a1baace5827ee057fa0&page=${this.state.page - 1}&pagesize=${this.props.pagesize}`
    this.setState({loading:true});
    let data = await fetch(url);
    let parseddata = await data.json()
    console.log(parseddata)
    this.setState({
      page: this.state.page - 1,
      articles: parseddata.articles,
    })
  }

  handlenextbutton = async () => {
    if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pagesize)) ){
      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=476e593d84a64a1baace5827ee057fa0&page=${this.state.page + 1}&pagesize=${this.props.pagesize}`
      this.setState({loading:true});
      let data = await fetch(url);
      let parseddata = await data.json()
      console.log(parseddata)
      this.setState({
        page: this.state.page + 1,
        articles: parseddata.articles,
        loading:false
      })
    }
  }
  render() {
    return (
      <div className="container my-3">
        <h2 className="text-center">NewApp - Top Headlines</h2>
        {this.state.loading && <Spinner/>}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return <div className="col-md-4">
              <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageurl={element.urlToImage ? element.urlToImage : "https://images.wsj.net/im-785590/social"} newsurl={element.url} />
            </div>
          })}
        </div>
        <div className="d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" class="btn btn-dark" onClick={this.handleprevbutton}>&larr;Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults /this.props.pagesize)} type="button" class="btn btn-dark" onClick={this.handlenextbutton}>Next&rarr;</button>

        </div>

      </div>
    )
  }
}

export default News
