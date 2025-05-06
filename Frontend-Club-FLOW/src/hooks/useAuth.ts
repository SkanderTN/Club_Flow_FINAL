export function useAuth() {
    if (typeof window === "undefined") {
      return {
        token: null,
        userId: null,
        email: null,
        roles: [],
        isLoggedIn: false,
        isAdmin: false,
        isUser: false,
      };
    }
  
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const email = localStorage.getItem("email");
    const roles = JSON.parse(localStorage.getItem("roles") || "[]");
  
    return {
      token,
      userId,
      email,
      roles,
      isLoggedIn: !!token,
      isAdmin: roles.includes("ROLE_ADMIN"),
      isUser: roles.includes("ROLE_USER"),
    };
  }
  