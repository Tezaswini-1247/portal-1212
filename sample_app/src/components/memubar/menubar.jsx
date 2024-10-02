import { ChatBubbleLeftEllipsisIcon, ChartBarIcon, CogIcon, ExclamationCircleIcon, HomeIcon, UsersIcon } from '@heroicons/react/20/solid';

export default function Sidebar() {
  return (
    <div className="h-screen w-64 bg-blue-600 text-white">
      {/* Logo and Title */}
      <div className="flex items-center justify-center h-16 space-x-2">
        {/* Placeholder for logo */}
        <div className="w-8 h-8 bg-white rounded-full"></div>
        <h1 className="text-lg font-bold">Integration</h1>
      </div>

      {/* Active Team Section */}
      <div className="px-4 py-3">
        <div className="flex items-center space-x-3 bg-blue-500 p-3 rounded-md">
          <div className="w-10 h-10 bg-white rounded-full"></div>
          <div>
            <p className="text-sm font-medium">Saleshouse</p>
            <p className="text-xs">general team</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="mt-5 space-y-1">
        {/* Dashboard Section */}
        <div className="px-4">
          <h2 className="text-sm text-gray-300">Dashboard</h2>
          <ul className="mt-2 space-y-2">
            <li>
              <a href="#" className="flex items-center space-x-2 py-2 px-3 rounded-md hover:bg-blue-500">
                <HomeIcon className="w-5 h-5" />
                <span className="text-sm">Overview</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center space-x-2 py-2 px-3 rounded-md hover:bg-blue-500">
                <ChatBubbleLeftEllipsisIcon className="w-5 h-5" />
                <span className="text-sm">Chat</span>
                <span className="ml-auto text-xs bg-red-500 rounded-full px-2 py-1">5</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center space-x-2 py-2 px-3 rounded-md hover:bg-blue-500">
                <UsersIcon className="w-5 h-5" />
                <span className="text-sm">Team</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Shortcuts Section */}
        <div className="px-4">
          <h2 className="text-sm text-gray-300">Shortcuts</h2>
          <ul className="mt-2 space-y-2">
            <li>
              <a href="#" className="flex items-center space-x-2 py-2 px-3 rounded-md hover:bg-blue-500">
                <ChartBarIcon className="w-5 h-5" />
                <span className="text-sm">Tasks</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center space-x-2 py-2 px-3 rounded-md hover:bg-blue-500">
                <ExclamationCircleIcon className="w-5 h-5" />
                <span className="text-sm">Reports</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center space-x-2 py-2 px-3 rounded-md hover:bg-blue-500">
                <CogIcon className="w-5 h-5" />
                <span className="text-sm">Settings</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Used Space Section */}
      <div className="px-4 py-4 mt-auto">
        <div className="bg-blue-500 p-4 rounded-md">
          <p className="text-sm">Used space</p>
          <p className="text-xs">Admin updated 09:12 am, November 08, 2020</p>
          <div className="mt-2 h-2 w-full bg-blue-400 rounded-full">
            <div className="w-3/4 h-full bg-white rounded-full"></div>
          </div>
          <p className="mt-1 text-xs">71%</p>
        </div>
      </div>
    </div>
  );
}
