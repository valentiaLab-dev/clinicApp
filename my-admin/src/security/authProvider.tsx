const baseUrl = `${import.meta.env.VITE_API_URL}/login`;
const authProvider = {
  login: async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    const request = new Request(baseUrl, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: new Headers({ "Content-Type": "application/json" }),
    });
    try {
      const response = await fetch(request);
      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.statusText);
      }
      const auth = await response.json();
      localStorage.setItem("token", auth.token);
      localStorage.setItem("username", auth.username);
      localStorage.setItem("access", auth.access);
    } catch {
      throw new Error("Network error");
    }
  },

  // Called when the user attempts to log out
  logout: () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    localStorage.removeItem("access");
    return Promise.resolve();
  },

  // Called when the app needs to check if the user is authenticated
  checkAuth: () => {
    return localStorage.getItem("access")
      ? Promise.resolve()
      : Promise.reject();
  },

  // Called when the dataProvider returns an error, to check if it's an authentication error
  checkError: (error: { status: number }) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem("access");
      return Promise.reject();
    }
    return Promise.resolve();
  },

  // Called to retrieve the user's identity (e.g., for displaying in the UI)
  getIdentity: () => {
    const username = localStorage.getItem("username");
    return Promise.resolve({ id: username, fullName: username });
  },

  // (Optional) Called to check if the user has permission for a specific action or resource
  // canAccess: ({ resource, action }:{resource:string, action:string}) => {
  //   // Implement your authorization logic here based on user roles/permissions
  //   // For a basic example, you might grant access to all resources if authenticated
  //   return Promise.resolve(true); // Or implement more granular logic
  // },
};

export default authProvider;
