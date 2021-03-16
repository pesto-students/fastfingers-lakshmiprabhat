/* eslint-disable linebreak-style */
const Route = ({ path, children }) => (window.location.pathname === path ? children : null);
export default Route;
