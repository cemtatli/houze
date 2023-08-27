import { LoaderIcon } from "react-hot-toast";

const Loading = () => {
	return (
		<div className='h-fit-screen grid place-items-center'>
			<LoaderIcon className='animate-spin text-gray-500' />
		</div>
	);
};

export default Loading;


