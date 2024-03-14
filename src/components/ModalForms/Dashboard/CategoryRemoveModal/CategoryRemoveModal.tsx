'use client'

import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { deleteCategory } from '@/app/lib/actionsCategories';
import classes from './CategoryRemoveModal.module.scss';

interface ICategoryRemoveModalProps {
    categoryId: number;
    isOpen: boolean;
    onClose: (value: boolean) => void;
}

const CategoryRemoveModal: React.FC<ICategoryRemoveModalProps> = (props) => {
    const { isOpen, onClose, categoryId } = props;

    const cancelButtonRef = React.useRef(null);

    return (
        <Transition.Root show={ isOpen } as={ React.Fragment }>
            <Dialog 
            as="div" 
            className={ classes.root } 
            initialFocus={ cancelButtonRef } 
            onClose={ onClose }>
				<Transition.Child
				as={ React.Fragment }
				enter="ease-out duration-300"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="ease-in duration-200"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
				>
					<div className={ classes.background } />
				</Transition.Child>
				<div className={ classes.wrapper }>
					<div className={ classes.container }>
						<Transition.Child
						as={ React.Fragment }
						enter="ease-out duration-300"
						enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						enterTo="opacity-100 translate-y-0 sm:scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 translate-y-0 sm:scale-100"
						leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<Dialog.Panel className={ classes.panel }>
								<form action={ () => deleteCategory(categoryId) }>
									<div className={ classes.content }>
										<div className={ classes.contentWrapper }>
											<Dialog.Title as="h3" className={ classes.heading }>
												Удалить категорию?
											</Dialog.Title>
										</div>
									</div>
									<div className={ classes.actions }>
										<button
											type="submit"
											className={ classes.button }
											onClick={() => onClose(false)}
										>
											<span></span>
											Удалить
										</button>
										<button
											type="button"
											className={ classes.button }
											onClick={() => onClose(false)}
											ref={ cancelButtonRef }
										>
											<span></span>
											Отменить
										</button>
									</div>
								</form>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
            </Dialog>
		</Transition.Root>
  	)
}

export default CategoryRemoveModal;