import React from 'react';
import PropTypes from 'prop-types';
import {Alert} from 'reactstrap';
import {connect} from 'react-redux';

import WeatherDisplay from 'components/WeatherDisplay.jsx';
import WeatherForm from 'components/WeatherForm.jsx';
import {cancelWeather} from 'api/open-weather-map.js';
import {getWeather} from 'states/weather-actions.js';
import PostForm from 'components/PostForm.jsx';
import PostList from 'components/PostList.jsx';
import {createPost, createVote} from 'api/posts.js';
import {listPosts} from "states/post-actions.js";

import './Today.css';

class Today extends React.Component {
    static propTypes = {
        city: PropTypes.string,
        code: PropTypes.number,
        group: PropTypes.string,
        description: PropTypes.string,
        temp: PropTypes.number,
        unit: PropTypes.string,
        weatherLoading: PropTypes.bool,
        masking: PropTypes.bool,
        dispatch: PropTypes.func,
		searchText: PropTypes.string,
		postLoading: PropTypes.bool,
		posts: PropTypes.array
    };

    constructor(props) {
        super(props);

        this.handleCreatePost = this.handleCreatePost.bind(this);
        this.handleCreateVote = this.handleCreateVote.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(getWeather('Hsinchu', this.props.unit));
        this.listPosts(this.props.searchText);
    }

    componentWillUnmount() {
        if (this.props.weatherLoading) {
            cancelWeather();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.searchText !== this.props.searchText) {
            this.listPosts(nextProps.searchText);
        }
    }

    render() {
        const {city, group, description, temp, unit, masking, posts, postLoading} = this.props;

        document.body.className = `weather-bg ${group}`;
        document.querySelector('.weather-bg .mask').className = `mask ${masking ? 'masking' : ''}`;

        return (
            <div className='today'>
                <div className='weather'>
                    <WeatherForm city={city} defaultUnit={unit} submitAction={getWeather} />
                    <WeatherDisplay {...{group, description, temp, unit, masking}} day='today'/>
                </div>
                <div className='posts'>
                    <PostForm onPost={this.handleCreatePost} />
                    <PostList posts={posts} onVote={this.handleCreateVote} />{
                        postLoading &&
                        <Alert color='warning' className='loading'>Loading...</Alert>
                    }
                </div>
            </div>
        );
    }

	listPosts(searchText) {
        this.props.dispatch(listPosts(searchText));
    }

    handleCreatePost(mood, text) {
        createPost(mood, text).then(() => {
            this.listPosts(this.props.searchText);
        }).catch(err => {
            console.error('Error creating posts', err);
        });
    }

    handleCreateVote(id, mood) {
        createVote(id, mood).then(() => {
            this.listPosts(this.props.searchText);
        }).catch(err => {
            console.error('Error creating vote', err);
        });
    }
}

export default connect((state) => {
    return {
        ...state.weather,
		...state.posts,
        unit: state.unit
    };
})(Today);
