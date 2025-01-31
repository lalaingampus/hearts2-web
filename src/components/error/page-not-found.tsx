import { NavLink } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className="h-screen flex items-center justify-center flex-col text-center">
      <h1 className="mb-4 text-8xl font-semibold text-gray-300">404</h1>
      <p className="mb-4 text-lg text-gray-600">Oops! Looks like you`re lost.</p>

      <p className="mt-4 text-gray-600">
        Let`s go
        <NavLink to="/" className="font-bold">
          {' '}
          back
        </NavLink>
      </p>
    </div>
  );
};

export default PageNotFound;
