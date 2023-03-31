import { Oval } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <Oval
      height={150}
      width={150}
      color="#3f51b5"
      wrapperStyle={{ display: 'flex', justifyContent: 'center' }}
      wrapperClass=""
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="#3f51b5"
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
  );
};
