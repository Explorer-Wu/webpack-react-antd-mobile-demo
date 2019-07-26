import React from 'react';
import { withRouter } from 'react-router-dom';

function NoMatch(props) {
    const { location } = props
    return (
        <div>
            <h2>404</h2>
            <p>No match for <code>{location.pathname}</code></p>
        </div>
    );
    
}

export default withRouter(NoMatch);