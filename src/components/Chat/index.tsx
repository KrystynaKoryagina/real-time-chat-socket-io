import { FaceSmileIcon } from '@heroicons/react/24/solid';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { LoginFields, Message, User, UserRole } from 'types';
import { Messages } from './Messages';

const url = 'https://socket-io-chat-server.onrender.com';
const socket = io(url);

export const Chat = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [messages, setMessage] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isOpen, setOpen] = useState(false);

  const userName = searchParams.get(LoginFields.NAME) || '';
  const userRoom = searchParams.get(LoginFields.ROOM) || '';

  const userData = useMemo<User>(() => {
    return {
      [LoginFields.NAME]: userName,
      [LoginFields.ROOM]: userRoom,
      userId: socket.id,
      role: UserRole.USER,
    };
  }, [userName, userRoom]);

  useEffect(() => {
    socket.emit('join', userData);
  }, [searchParams, userData, userName, userRoom]);

  useEffect(() => {
    socket.on('message', ({ data }) => {
      setMessage((prev) => [...prev, data]);
    });
  }, []);

  useEffect(() => {
    socket.on('room', ({ data }) => {
      setUsers(data);
    });
  }, []);

  const onEmojiClick = ({ emoji }: EmojiClickData) => {
    setInputValue((prev) => `${prev} ${emoji}`);
  };

  const onChangeHandler = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setInputValue(value);
  };

  const onSendMessage = () => {
    const message: Omit<Message, 'id'> = {
      message: inputValue,
      user: userData,
    };

    socket.emit('sendMessage', message);
    setInputValue('');
  };

  const onLeaveRoom = () => {
    socket.emit('leaveRoom', userData);
    navigate('/');
  };

  return (
    <div className="flex flex-col bg-indigo-600 text-white h-full rounded-lg text-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
      <div className="flex items-center justify-between border-b-2 border-neutral-100 px-6 py-3 dark:border-neutral-600">
        <h2 className="text-xl">{userRoom}</h2>
        <p>{`${users.length} users in this room`}</p>
        <button
          type="button"
          className="inline-block rounded bg-red-700 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] hover:bg-red-700/80"
          onClick={onLeaveRoom}
        >
          Leave room
        </button>
      </div>

      <div className="p-6 grow overflow-y-auto">
        <Messages messages={messages} currentUser={userData} />
      </div>

      <div className="flex items-center gap-3 border-t-2 border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-50">
        <input
          id="room"
          name={LoginFields.ROOM}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          type="text"
          autoComplete="off"
          required
          value={inputValue}
          onChange={onChangeHandler}
        />

        <div className="relative">
          <FaceSmileIcon
            className="fill-yellow-400 w-10 h-10"
            onClick={() => setOpen(!isOpen)}
          />

          {isOpen && (
            <div className="absolute bottom-full right-0">
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </div>
          )}
        </div>

        <button
          type="button"
          className="inline-block rounded bg-indigo-900 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white hover:bg-indigo-900/80"
          onClick={onSendMessage}
          disabled={!inputValue}
        >
          Send
        </button>
      </div>
    </div>
  );
};
