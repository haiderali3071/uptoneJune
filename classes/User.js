var axios = require('axios');
var qs = require('qs');
import AsyncStorage from '@react-native-async-storage/async-storage';
const api = require('../api.json')
const search_user_url = api.search_user
const get_hashtag_posts_url = api.get_hashtag_posts
const get_post_comments_url = api.get_post_comments
const get_all_posts_url = api.get_all_posts
const get_followers_url = api.get_followers
const update_user_url = api.update_user
const send_code_url = api.send_code;
const recover_password_url = api.recover_password

class User {
  calculateTime = (updateDate: Date) => {
    let message = '';
    updateDate = new Date(updateDate);
    const currDate = new Date();
    const diffTime = Math.abs(updateDate - currDate) / 60000;
    let minutes = parseFloat(diffTime).toFixed(0);
    if (minutes < 60) {
      if (minutes < 2) {
        message = minutes + ' minute ago';
      } else {
        message = minutes + ' minutes ago';
      }
    } else {
      let hours = minutes / 60;
      if (hours < 24) {
        hours = parseFloat(hours).toFixed(0);
        if (hours < 2) {
          message = hours + ' hour ago';
        } else {
          message = hours + ' hours ago';
        }
      } else {
        let days = hours / 24;
        days = parseFloat(days).toFixed(0);
        if (days < 2) {
          message = days + ' day ago';
        } else {
          message = days + ' days ago';
        }
      }
    }

    return message;
  };

  calculatePostTime = (updateDate: Date)=>{
    let message = '';
    updateDate = new Date(updateDate);
    const currDate = new Date();
    const diffTime = Math.abs(updateDate - currDate) / 60000;
    let minutes = parseFloat(diffTime).toFixed(0);
    if (minutes < 60) {
     message = minutes + 'm';
    } else {
      let hours = minutes / 60;
      if (hours < 24) {
        hours = parseFloat(hours).toFixed(0);
        message = hours + 'h';
      } else {
        let days = hours / 24;
        days = parseFloat(days).toFixed(0);
        message = days + 'd';
      }
    }

    return message;
  }

  calculateCommentTime = (updateDate: Date)=>{
    let message = '';
    updateDate = new Date(updateDate);
    const currDate = new Date();
    const diffTime = Math.abs(updateDate - currDate) / 60000;
    let minutes = parseFloat(diffTime).toFixed(0);
    if (minutes < 60) {
     message = minutes + ' min';
    } else {
      let hours = minutes / 60;
      if (hours < 24) {
        hours = parseFloat(hours).toFixed(0);
        message = hours + ' hour';
      } else {
        let days = hours / 24;
        days = parseFloat(days).toFixed(0);
        message = days + ' day';
      }
    }

    return message;
  }

  findUsers = (keyword)=>{
      var config = {
      method: 'get',
      url: search_user_url+keyword,
    };

    return axios(config);
  }

  getHashtagPosts = (hashtag,token)=>{
      var config = {
        method: 'get',
        url: get_hashtag_posts_url+hashtag,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
           authorization: token,
        },
      };

    return axios(config);
  }

  getPostComments = (postId,token)=>{
     var config = {
        method: 'get',
        url: get_post_comments_url+postId,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
           authorization: token,
        },
      };

    return axios(config);
  }

  getAllPosts = (token)=>{
     var config = {
        method: 'get',
        url: get_all_posts_url,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
           authorization: token,
        },
      };

    return axios(config);
  }

  getFollowers = (userId,token)=>{
     var config = {
        method: 'get',
        url: get_followers_url+userId,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
           authorization: token,
        },
      };

    return axios(config);
  }

  updateUsername = (username,auth)=>{
    var data = qs.stringify({
      username: username,
    });
    var config = {
      method: 'patch',
      url: update_user_url,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'authorization': auth,
      },
      data: data,
    };
    return axios(config)
  }

  updateDisplayName = (displayName,auth)=>{
    var data = qs.stringify({
      displayname: displayName,
    });
    var config = {
      method: 'patch',
      url: update_user_url,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'authorization': auth,
      },
      data: data,
    };
    return axios(config)
  }

   send_email = (email) => {
    var config = {
      method: 'get',
      url: send_code_url + email,
    };

    return axios(config);
  };

 recoverPassword(email, newPassword) {
    var data = qs.stringify({ email: email, newPassword: newPassword });
    var config = {
      method: 'put',
      url: recover_password_url,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: data,
    };

    return axios(config);
  }
}
export default User;
