import { useState } from "react";

const Settings = () => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [notifications, setNotifications] = useState(true);

  const handleSaveSettings = () => {
    // Replace this with your logic to save settings
    console.log('Settings saved:', { username, email, notifications });
  };
  return <div>
    <div className="bg-white p-4 rounded-md shadow-md">
      <h2 className="text-lg font-bold mb-4">Settings</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-semibold text-gray-600">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-semibold text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="notifications" className="flex items-center">
            <input
              type="checkbox"
              id="notifications"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
              className="mr-2"
            />
            <span className="text-sm font-semibold text-gray-600">Receive notifications</span>
          </label>
        </div>
        <button
          type="button"
          onClick={handleSaveSettings}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
        >
          Save Settings
        </button>
      </form>
    </div>
  </div>;
};

export default Settings;
