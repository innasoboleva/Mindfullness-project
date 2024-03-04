import React from 'react';

function FAQ() {

    return (
        <React.Fragment>
            <div>
                <h1>Frequently Asked Questions (FAQ)</h1>
                <h2>General Questions</h2>
                <ul>
                    <li>
                        <h3>What is included in monthly subscription?</h3>
                        <p>Unlimited zoom calls with our coaches.</p>
                    </li>
                    <li>
                        <h3>Why do we use it?</h3>
                        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                    </li>
                </ul>

                <h2>Technical Questions</h2>
                <ol>
                    <li>
                        <h3>What if I paid subscription but I cannot access content or schedule calls?</h3>
                        <p>Please contact Irina Soboleva at irina.soboleva@gmail.com. She will add you.</p>
                    </li>
                    <li>
                        <h3>What is CSS?</h3>
                        <p>CSS stands for Cascading Style Sheets, which is used to style the HTML elements.</p>
                    </li>
                </ol>
            </div>
        </React.Fragment>);
}

export default FAQ;