import React from "react";

function index() {
    return (
        <div suppressHydrationWarning>{new Date().toLocaleTimeString()}</div>
    );
}

export default index;
