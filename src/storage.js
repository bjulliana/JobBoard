let storage = {
    urlServer: 'http://localhost:3000',
    sessionId: localStorage.getItem('sessionId') || null,
    userId   : localStorage.getItem('userId') || null
};

export default storage;
