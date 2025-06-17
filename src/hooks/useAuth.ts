export const useAuth = () => {
  const login = (username: string) => {
    const token = btoa(JSON.stringify({ user: username }));
    localStorage.setItem('token', token);
  };

  const logout = () => localStorage.removeItem('token');

  const getUser = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
      const decoded = atob(token);
      return JSON.parse(decoded).user;
    } catch {
      return null;
    }
  };

  return { login, logout, getUser };
};
