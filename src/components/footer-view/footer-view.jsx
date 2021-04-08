import React from 'react';

export function FooterView(props) {
  return (
    <footer className="text-muted py-5">
      <div className="container">
        <p className="float-right">
          <a href="#">Back to top</a>
        </p>
        <p>myFlix is an example of a React project!</p>
        <p>Want the source code? <a href="https://github.com/xorth">Visit my GitHub</a>.</p>
      </div>
    </footer>
  );
}
