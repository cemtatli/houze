'use client';

import { useCallback, useEffect, useState } from 'react';
import Button from '@/components/shared/Button';

import { IoMdClose } from 'react-icons/io';

interface ModalProps {
	isOpen?: boolean;
	onClose: () => void;
	onSubmit: () => void;
	title?: string;
	body?: React.ReactElement;
	footer?: React.ReactElement;
	actionLabel: string;
	disabled?: boolean;
	secondaryAction?: () => void;
	secondaryActionLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
	isOpen,
	onClose,
	onSubmit,
	title,
	body,
	actionLabel,
	footer,
	disabled,
	secondaryAction,
	secondaryActionLabel,
}) => {
	const [showModal, setShowModal] = useState(isOpen);

	useEffect(() => {
		setShowModal(isOpen);
	}, [isOpen]);

	const handleClose = useCallback(() => {
		if (disabled) {
			return;
		}
		setShowModal(false);
		setTimeout(() => {
			onClose();
		}, 300);
	}, [onClose, disabled]);

	const handleSubmit = useCallback(() => {
		if (disabled) {
			return;
		}

		onSubmit();
	}, [onSubmit, disabled]);

	const handleSecondaryAction = useCallback(() => {
		if (disabled || !secondaryAction) {
			return;
		}

		secondaryAction();
	}, [secondaryAction, disabled]);

	if (!isOpen) {
		return null;
	}

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black/5 outline-none backdrop-blur-sm focus:outline-none'>
			<div className='relative mx-auto h-full w-full md:h-auto md:w-4/6 lg:h-auto lg:w-3/6 xl:w-1/3'>
				{/* Content Section */}
				<div
					className={`translate h-full duration-300
            ${showModal ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}
          `}>
					<div className='translate p-2 relative flex h-full w-full flex-col border-0 bg-white ring-gray-100/50 shadow-sm transition duration-200 ring-2 outline-none focus:outline-none md:h-auto md:rounded-lg'>
						{/* Header Section */}
						<div className='relative flex items-center justify-center rounded-t-lg border-b p-5'>
							<button
								className='absolute right-4 rounded-full p-2 transition hover:text-gray-950'
								onClick={handleClose}>
								<IoMdClose size={20} />
							</button>
							<h3 className='mr-auto text-xl font-semibold'>{title}</h3>
						</div>
						{/* Body Content */}
						<div className='relative flex-auto p-5'>{body}</div>
						{/* Action Content & Footer */}
						<div className='flex flex-col gap-2 p-5'>
							<div className='flex w-full flex-row items-center gap-5'>
								{secondaryAction && secondaryActionLabel && (
									<Button
										outline
										disabled={disabled}
										label={secondaryActionLabel}
										onClick={handleSecondaryAction}
									/>
								)}
								<Button disabled={disabled} label={actionLabel} onClick={handleSubmit} />
							</div>
							{footer}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Modal;
