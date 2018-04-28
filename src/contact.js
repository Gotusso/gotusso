// Try to avoid basic spam bots by forcing them to evaluate JS code to
// get the email.
export default function reachMeOut() {
    window.open('mailto:' + window.atob('Z290dXNzb0BnbWFpbC5jb20='), '_blank');
};
