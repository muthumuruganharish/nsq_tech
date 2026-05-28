import { useEffect, useState } from "react";
import api from "../Service/api";


function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    username: "",
    role: "General User",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addUser = async () => {
    try {
      const res = await api.post("/users", newUser);

      setUsers([...users, res.data]);

      setNewUser({
        username: "",
        role: "General User",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const deleteUser = async (id) => {
    try {
      await api.delete(`/users/${id}`);

      setUsers(users.filter((user) => user.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Admin Panel</h1>

      <h3>Add User</h3>

      <input
        type="text"
        placeholder="Username"
        value={newUser.username}
        onChange={(e) =>
          setNewUser({
            ...newUser,
            username: e.target.value,
          })
        }
      />

      <select
        value={newUser.role}
        onChange={(e) =>
          setNewUser({
            ...newUser,
            role: e.target.value,
          })
        }
      >
        <option>General User</option>
        <option>Admin</option>
      </select>

      <button onClick={addUser}>
        Add User
      </button>

      <hr />

      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>
                <button
                  onClick={() =>
                    deleteUser(user.id)
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPanel;