interface TooltipProps {
	text: string | number;
}

const Tooltip: React.FC<TooltipProps> = ({ text }) => {
	return (
		<div
			role='tooltip'
			className='relative max-w-xs break-words rounded-lg hidden group-hover:inline-block bg-slate-900 px-4 py-2 text-center
       text-xs font-medium text-white outline-none'>
			<svg
				className='absolute fill-slate-900'
				width='10'
				height='10'
				viewBox='0 0 10 10'
				style={{
					transform: 'translate3d(30px,24px,0)',
				}}
				preserveAspectRatio='none'>
				<polygon points='0,0 10,0 5,5'></polygon>
			</svg>
			<span>{text}</span>
		</div>
	);
};
export default Tooltip;
