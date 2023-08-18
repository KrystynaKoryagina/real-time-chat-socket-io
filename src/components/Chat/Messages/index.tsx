import classNames from 'classnames';
import { memo } from 'react';
import { Message, User, UserRole } from 'types';

export interface MessagesProps {
  messages: Message[];
  currentUser: User;
}

export const Messages = memo(({ messages, currentUser }: MessagesProps) => {
  const renderMessage = (msg: Message) => {
    if (msg.user.role === UserRole.ADMIN) {
      return (
        <div key={msg.id} className="text-xs text-gray-300">
          {msg.message}
        </div>
      );
    }

    const myMsg = msg.user.userId === currentUser.userId;

    return (
      <div
        key={msg.id}
        className={classNames({
          'text-right': myMsg,
          'text-left': !myMsg,
        })}
      >
        <div className="inline-block">
          <div className="text-left mb-0.5 text-sm text-slate-400">
            {msg.user.name}
          </div>
          <div
            className={classNames(
              'block rounded-lg p-4 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]',
              {
                'bg-indigo-900': myMsg,
                'bg-white': !myMsg,
              }
            )}
          >
            <p
              className={classNames('text-base', {
                'text-white': myMsg,
                'text-neutral-800': !myMsg,
              })}
            >
              {msg.message}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return <>{messages?.map(renderMessage)}</>;
});
