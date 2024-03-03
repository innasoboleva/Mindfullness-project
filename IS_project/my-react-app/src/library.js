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
                setPosts(data.data);
                console.log('data', data)
            } else {
              console.log(data.error)
            }
          })
          .catch(error => {
            console.error('Error: ', error);
          });
      }, []);

    return (
        <React.Fragment>
            <div>
            <h2>Mindfullness club - Library</h2>
            {posts.map(post => (
                <div key={post.id}>
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                    <iframe width="560" height="315" src={post.video_url}
                    title={post.title} 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowfullscreen
                    ></iframe>
                </div>
            ))}
        </div>
        </React.Fragment>
    )

};

export default Library;