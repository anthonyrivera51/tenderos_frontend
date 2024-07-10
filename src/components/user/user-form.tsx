import React, { useState, useEffect } from 'react';

interface Role {
  name: string;
  modules: {
    name: string;
    permissions: { name: string; granted: boolean }[];
  }[];
}

interface User {
  name: string;
  password: string;
  role: string;
  modules: {
    name: string;
    permissions: { name: string; granted: boolean }[];
  }[];
}

interface Props {
  roles: Role[];
  selectedUser: string;
  accounts: any; // Ajusta este tipo según sea necesario
  onUserSelect: (userName: string) => void;
}

const UserForm: React.FC<Props> = ({
  roles,
  selectedUser,
  accounts,
  onUserSelect,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUserName, setNewUserName] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [selectedRole, setSelectedRole] = useState<string>('');

  useEffect(() => {
    const storedUsersJson = localStorage.getItem('users');
    if (storedUsersJson) {
      const storedUsers: User[] = JSON.parse(storedUsersJson);
      setUsers(storedUsers);
      console.log('Usuarios cargados desde localStorage:', storedUsers);
    }
  }, []);

  const saveUsersToLocalStorage = (updatedUsers: User[]) => {
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    console.log('Usuarios guardados en localStorage:', updatedUsers);
  };

  const handleAddUser = () => {
    if (newUserName && newPassword && selectedRole) {
      const roleDetails = roles.find((role) => role.name === selectedRole);
      const newUser: User = {
        name: newUserName,
        password: newPassword,
        role: selectedRole,
        modules: roleDetails ? roleDetails.modules : [],
      };
      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
      saveUsersToLocalStorage(updatedUsers);
      setNewUserName('');
      setSelectedRole('');
      setNewPassword('');
      alert('Usuario creado con exito');
    } else {
      alert('Por favor, ingrese un nombre de usuario y seleccione un rol.');
    }
  };

  const handleDeleteUser = (userName: string) => {
    const updatedUsers = users.filter((user) => user.name !== userName);
    setUsers(updatedUsers);
    saveUsersToLocalStorage(updatedUsers);
  };

  useEffect(() => {
    const user = users.find((user) => user.name === selectedUser);
    if (user) {
      setSelectedRole(user.role);
    }
  }, [selectedUser, users]);

  return (
    <>
      <form className="space-y-6" action="#">
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">
          Crear Usuario
        </h5>
        <div className="flex space-x-4">
          <div className="flex-1">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="name@company.com"
              required
            />
          </div>
          <div className="flex-1">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>
          <div className="flex-1">
            <label
              htmlFor="role"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Rol
            </label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            >
              <option value="">Seleccionar rol</option>
              {roles.map((role, index) => (
                <option key={index} value={role.name}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          type="submit"
          onClick={handleAddUser}
          className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Crear usuario
        </button>
      </form>
    </>
  );
};

export default UserForm;
