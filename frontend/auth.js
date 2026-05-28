// auth.js
(function() {
    const path = window.location.pathname.toLowerCase();
    
    // Do NOT run auth middleware if we are on the login page!
    // The login page handles itself and should never auto-redirect.
    if (path.includes("login.html")) {
        return;
    }

    const userStr = localStorage.getItem("user");
    if (!userStr) {
        window.location.replace("login.html");
        return;
    }

    let user;
    try {
        user = JSON.parse(userStr);
    } catch (e) {
        localStorage.removeItem("user");
        localStorage.removeItem("user_id");
        window.location.replace("login.html");
        return;
    }

    if (!user || !user.user_id || !user.role) {
        localStorage.removeItem("user");
        localStorage.removeItem("user_id");
        window.location.replace("login.html");
        return;
    }
    
    let currentPage = null;
    if (path.includes("student-dashboard.html")) {
        currentPage = "student-dashboard.html";
    } else if (path.includes("company-dashboard.html")) {
        currentPage = "company-dashboard.html";
    } else if (path.includes("supervisor-dashboard.html")) {
        currentPage = "supervisor-dashboard.html";
    } else if (path.includes("dean-dashboard.html")) {
        currentPage = "dean-dashboard.html";
    }
    
    const pageRoleMap = {
        "student-dashboard.html": "student",
        "company-dashboard.html": "company",
        "supervisor-dashboard.html": "supervisor",
        "dean-dashboard.html": "dean"
    };

    if (currentPage) {
        const requiredRole = pageRoleMap[currentPage];
        if (user.role !== requiredRole) {
            console.log("Unauthorized access detected. Current role:", user.role, "Required role:", requiredRole);
            alert("Unauthorized access! Redirecting...");
            window.location.replace("login.html");
            return;
        }
    }

    fetch("http://localhost:3000/validate-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user.user_id, role: user.role })
    })
    .then(res => res.json())
    .then(data => {
        if (!data.valid) {
            console.log("Session validation failed from backend.");
            alert("Session expired or invalid. Please login again.");
            localStorage.removeItem("user");
            localStorage.removeItem("user_id");
            sessionStorage.clear();
            window.location.replace("login.html");
        }
    })
    .catch(err => {
        console.error("Error validating session:", err);
    });

    window.logout = function() {
        console.log("Logout initiated. Clearing storage.");
        localStorage.removeItem("user");
        localStorage.removeItem("user_id"); 
        sessionStorage.clear();
        window.location.replace("login.html");
    };
})();

