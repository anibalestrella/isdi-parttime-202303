// import context from './context'

// export default () => context.token = null

import context from './context';

export default () => {
    // Clear the token in the context
    context.token = null;

    // Clear the token in session storage
    sessionStorage.removeItem('token');

    // Perform any other necessary logout actions
    // ...
};
