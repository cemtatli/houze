import Link from "next/link";

interface LogoProps {
	size: number;
	label_color?: string;
	label?: string;
	color?: string;
}

const Logo: React.FC<LogoProps> = ({
	size = 32,
	color = "#fe5829",
	label = "Houze",
	label_color = "text-brand-500",
}) => {
	return (
		<Link title={label} aria-label={label} href={'/'} className={'flex items-center gap-x-1'}>
			<svg
				className='transition -rotate-45'
				width={size}
				height={size}
				viewBox='0 0 500 500'
				fill='none'
				preserveAspectRatio='none'
				xmlns='http://www.w3.org/2000/svg'>
				<defs>
					<mask id='globeOuterOnly'>
						<path
							d='M60.0667 239.687C60.0667 187.238 102.585 144.719 155.034 144.719C207.509 144.719 250.032 187.277 250.06 239.752C250.062 243.164 250.064 246.577 250.067 249.99C186.733 249.99 123.4 249.99 60.0667 249.99C60.0667 246.555 60.0667 243.121 60.0667 239.687Z'
							fill={color}
							stroke={color}
							strokeWidth='0'></path>
						<path
							d='M250.067 249.99C313.4 249.99 376.733 249.99 440.067 249.99C440.064 253.402 440.062 256.815 440.06 260.228C440.032 312.702 397.509 355.26 345.034 355.26C292.585 355.26 250.067 312.742 250.067 260.292C250.067 256.858 250.067 253.424 250.067 249.99Z'
							fill={color}
							stroke={color}
							strokeWidth='0'></path>
						<path
							d='M312.702 429.664C264.184 449.586 208.702 426.404 188.78 377.885C168.849 329.343 192.066 273.842 240.596 253.884C243.752 252.586 246.911 251.288 250.067 249.99C274.123 308.577 298.177 367.164 322.232 425.751C319.056 427.055 315.879 428.36 312.702 429.664Z'
							fill={color}
							stroke={color}
							strokeWidth='0'></path>
						<path
							d='M250.063 249.989C226.007 191.403 201.951 132.816 177.896 74.2286C181.053 72.9346 184.211 71.6403 187.368 70.3458C235.921 50.441 291.441 73.6122 311.373 122.154C331.294 170.673 308.112 226.154 259.594 246.076C256.417 247.381 253.24 248.685 250.063 249.989Z'
							fill={color}
							stroke={color}
							strokeWidth='0'></path>
					</mask>
				</defs>
				<path
					d='M60.0667 239.687C60.0667 187.238 102.585 144.719 155.034 144.719C207.509 144.719 250.032 187.277 250.06 239.752C250.062 243.164 250.064 246.577 250.067 249.99C186.733 249.99 123.4 249.99 60.0667 249.99C60.0667 246.555 60.0667 243.121 60.0667 239.687Z'
					fill={color}
					stroke={color}
					strokeWidth='0'></path>
				<path
					d='M250.067 249.99C313.4 249.99 376.733 249.99 440.067 249.99C440.064 253.402 440.062 256.815 440.06 260.228C440.032 312.702 397.509 355.26 345.034 355.26C292.585 355.26 250.067 312.742 250.067 260.292C250.067 256.858 250.067 253.424 250.067 249.99Z'
					fill={color}
					stroke={color}
					strokeWidth='0'></path>
				<path
					d='M312.702 429.664C264.184 449.586 208.702 426.404 188.78 377.885C168.849 329.343 192.066 273.842 240.596 253.884C243.752 252.586 246.911 251.288 250.067 249.99C274.123 308.577 298.177 367.164 322.232 425.751C319.056 427.055 315.879 428.36 312.702 429.664Z'
					fill={color}
					stroke={color}
					strokeWidth='0'></path>
				<path
					d='M250.063 249.989C226.007 191.403 201.951 132.816 177.896 74.2286C181.053 72.9346 184.211 71.6403 187.368 70.3458C235.921 50.441 291.441 73.6122 311.373 122.154C331.294 170.673 308.112 226.154 259.594 246.076C256.417 247.381 253.24 248.685 250.063 249.989Z'
					fill={color}
					stroke={color}
					strokeWidth='0'></path>
			</svg>
			<span className={`hidden text-xl mt-1 uppercase font-bold md:block ${label_color}`}>
				{label}
			</span>
		</Link>
	);
};

export default Logo;
