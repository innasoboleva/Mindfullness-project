import React, { useState, useEffect } from 'react';
import { PopupButton } from "react-calendly";

function Scheduler() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // const jwtToken = localStorage.getItem('token');
    
        fetch('http://127.0.0.1:8000/api/scheduler', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${jwtToken}`,
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
            <h2>Расписание Mindfullness club</h2>
            {posts.map(post => (
                <div key={post.id}>
                    <p>{post.day}</p>
                    <h6>{post.semi_title}</h6>
                    <h4>{post.title}</h4>
                    <p>{post.name}</p>
                    <p>{post.time}</p>
                    <div className="calendly">
                    <PopupButton
                        url={post.url}
                        // url="https://calendly.com/irsokolova/rj"
                        rootElement={document.getElementById("root")}
                        text="Записаться"
                    />
                    </div>
                </div>
            ))}
        </div>
        </React.Fragment>
    )

};

export default Scheduler;