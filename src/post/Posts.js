import React, { Component } from "react";
import { list } from "./apiPost";
import DefaultPost from "../images/mountains.jpg";
import { Link } from "react-router-dom";
import { Player } from "video-react";

class Posts extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      page: 1,
    };
  }

  loadPosts = (page) => {
    list(page).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ posts: data });
      }
    });
  };

  componentDidMount() {
    this.loadPosts(this.state.page);
  }

  loadMore = (number) => {
    this.setState({ page: this.state.page + number });
    this.loadPosts(this.state.page + number);
  };

  loadLess = (number) => {
    this.setState({ page: this.state.page - number });
    this.loadPosts(this.state.page - number);
  };

  renderPosts = (posts) => {
    return (
      <div className="row">
        {posts.map((post, i) => {
          const posterId = post.postedBy ? `/user/${post.postedBy._id}` : "";
          const posterName = post.postedBy ? post.postedBy.name : " Unknown";

          return (
            <div className="card col-md-5 col-sm-10 mx-auto" key={i}>
              <div className="card-body">
                {(post.photo &&
                  post.photo.contentType === "image/jpeg") ||
                (post.photo &&
                  post.photo.contentType === "image/png") ||
                (post.photo &&
                  post.photo.contentType === "image/jpg") ||
                (post.photo &&
                  post.photo.contentType === "image/gif") ? (
                  <img
                    src={post.photo.url}
                    alt={post.title}
                    onError={(i) => (i.target.style.display = "none")}
                    className="img-thunbnail"
                    style={{
                      height: "100%",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (post.photo &&
                    post.photo.contentType === "video/mp4") ||
                  (post.photo &&
                    post.photo.contentType === "video/3gp") ||
                  (post.photo &&
                    post.photo.contentType === "video/mov") ||
                  (post.photo &&
                    post.photo.contentType === "video/flv") ? (
                  <Player
                    autoPlay
                    loop
                    controls
                    playsInline
                    muted
                    src={`${post.photo.url}`}
                    width="100%"
                    height="100%"
                  />
                ) : (
                  ""
                )}
                {/* {post.photo ? (
                  <img
                    src={post.photo.url}
                    alt={post.title}
                    onError={(i) => (i.target.src = `${DefaultPost}`)}
                    className="img-thunbnail mb-3"
                    style={{ height: "200px", width: "100%" }}
                  />
                ) : (
                  <img
                    src={DefaultPost}
                    alt={post.title}
                    onError={(i) => (i.target.src = `${DefaultPost}`)}
                    className="img-thunbnail mb-3"
                    style={{ height: "200px", width: "100%" }}
                  />
                )} */}

                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.body.substring(0, 100)}</p>
                <br />
                <p className="font-italic mark">
                  Posted by <Link to={`${posterId}`}>{posterName} </Link>
                  on {new Date(post.created).toDateString()}
                </p>
                <Link
                  to={`/post/${post._id}`}
                  className="btn btn-raised btn-primary btn-sm"
                >
                  Read more
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  render() {
    const { posts, page } = this.state;
    return (
      <div className="container">
        <h2 className="mt-1 mb-4 text-center">
          {!posts.length ? "No more posts!" : `All ${posts.length} posts`}
        </h2>

        {this.renderPosts(posts)}

        {page > 1 ? (
          <button
            className="btn btn-raised btn-warning mr-5 mt-5 mb-5"
            onClick={() => this.loadLess(1)}
          >
            Previous ({this.state.page - 1})
          </button>
        ) : (
          ""
        )}

        {posts.length ? (
          <button
            className="btn btn-raised btn-success mt-5 mb-5"
            onClick={() => this.loadMore(1)}
          >
            Next ({page + 1})
          </button>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Posts;
