import 'tailwindcss/tailwind.css';
import logout from '../../../../assets/icons/logout.svg';

export const LoginBtn = () => {
  const loginbtn = `w-6/12 h-11 1.75xl:text-lg bg-login-green rounded-lg text-white font-montserrat font-bold hover:shadow-lg hover:bg-login-green-hover`;

  return (
    <>
      <button className={loginbtn} type="button">
        Log In
      </button>
    </>
  );
};

export const LogoutBtn = () => {
  const textClass = `w-1/6 h-14 text-sm hover:bg-red-hover rounded-lg justify-items-center bg-red`;
  return (
    <>
      <button className={textClass} type="button">
        <img
          className="pb-1 grow-0 inline-flex"
          width="30px"
          height="30px"
          alt="icon"
          src={logout}
        />
        <p className="p-2 ml-3 grow-0 inline-flex text-white">Log out</p>
      </button>
    </>
  );
};
