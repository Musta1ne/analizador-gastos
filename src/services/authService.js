const AUTH_KEY = 'auth_user';
const USERS_KEY = 'users';

export const authService = {
  // Registrar un nuevo usuario
  register: (userData) => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    
    // Verificar si el usuario ya existe
    if (users.find(user => user.email === userData.email)) {
      throw new Error('El usuario ya existe');
    }

    // Crear nuevo usuario
    const newUser = {
      ...userData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };

    // Guardar usuario
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    
    // Autenticar automáticamente
    localStorage.setItem(AUTH_KEY, JSON.stringify(newUser));
    
    return newUser;
  },

  // Iniciar sesión
  login: (credentials) => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    
    const user = users.find(
      u => u.email === credentials.email && u.password === credentials.password
    );

    if (!user) {
      throw new Error('Credenciales inválidas');
    }

    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    return user;
  },

  // Cerrar sesión
  logout: () => {
    localStorage.removeItem(AUTH_KEY);
  },

  // Obtener usuario actual
  getCurrentUser: () => {
    const user = localStorage.getItem(AUTH_KEY);
    return user ? JSON.parse(user) : null;
  },

  // Verificar si está autenticado
  isAuthenticated: () => {
    return !!localStorage.getItem(AUTH_KEY);
  }
};