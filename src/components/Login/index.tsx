import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid';
import { ChangeEvent, useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { LoginData, LoginFields } from 'types';

export const Login = () => {
  const [formValues, setFormValues] = useState<LoginData>({
    [LoginFields.NAME]: '',
    [LoginFields.ROOM]: '',
  });

  const navigate = useNavigate();

  const isDisabled =
    !formValues[LoginFields.NAME] || !formValues[LoginFields.ROOM];

  const navigateToChat = () => {
    navigate({
      pathname: '/chat',
      search: `?${createSearchParams(formValues)}`,
    });
  };

  const onChangeForm = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <ChatBubbleLeftRightIcon className="fill-indigo-600 w-16 h-16 mx-auto" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Live Chat
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Username
            </label>
            <div className="mt-2">
              <input
                id="username"
                name={LoginFields.NAME}
                type="text"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                autoComplete="off"
                required
                value={formValues[LoginFields.NAME]}
                onChange={onChangeForm}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="room"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Room
              </label>
            </div>
            <div className="mt-2">
              <input
                id="room"
                name={LoginFields.ROOM}
                value={formValues[LoginFields.ROOM]}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                type="text"
                autoComplete="off"
                required
                onChange={onChangeForm}
              />
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={navigateToChat}
              disabled={isDisabled}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Join Room
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
