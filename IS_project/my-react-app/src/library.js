import React, { useState, useEffect } from 'react';

function Library() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const jwtToken = localStorage.getItem('token');
    
        fetch('http://127.0.0.1:8000/api/library', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`,
          },
        })
          .then(response => response.json())
          .then(data => {
            if (data.status == 'success') {
                setPosts(data['posts']);
            } else {
              console.log(data.error)
            }
          })
          .catch(error => {
            console.error('Error: ', error);
          });
      }, []);
   
    useEffect(() => {
        const fetchPosts = async () => {
            const response = await axios.get('/api/posts/');
            setPosts(response.data);
        };
        fetchPosts();
    }, []);

    return (
        <React.Fragment>
            <div>
            <h1>Content</h1>
            {posts.map(post => (
                <div key={post.id}>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                    <iframe width="560" height="315" src={post.video_url} allowFullScreen></iframe>
                </div>
            ))}
        </div>
        </React.Fragment>
    )

};

export default Library;